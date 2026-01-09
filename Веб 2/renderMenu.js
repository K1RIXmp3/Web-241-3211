// js/renderMenu.js
// Рендер карточек из массива DISHES в три сетки

(function () {
  if (!Array.isArray(window.DISHES)) {
    console.error("DISHES не найден. Подключи data/dishes.js перед renderMenu.js");
    return;
  }

  const grids = {
    soup: document.getElementById("soups-grid"),
    main: document.getElementById("mains-grid"),
    drink: document.getElementById("drinks-grid"),
  };

  // Группировка по категориям
  const grouped = {
    soup: [],
    main: [],
    drink: [],
  };
  window.DISHES.forEach(d => {
    if (grouped[d.category]) grouped[d.category].push(d);
  });

  // Сортировка по алфавиту (русский)
  Object.keys(grouped).forEach(cat => {
    grouped[cat].sort((a, b) => a.name.localeCompare(b.name, "ru", { sensitivity: "base" }));
  });

  // Генерация карточки блюда
  function createCard(dish) {
    const card = document.createElement("div");
    card.className = "dish-item card";
    card.dataset.dish = dish.keyword;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Добавить: ${dish.name}`);

    const img = document.createElement("img");
    img.src = dish.image;
    img.alt = dish.name;
    img.className = "card__img";
    card.appendChild(img);

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = `${dish.price}₽`;
    card.appendChild(price);

    const name = document.createElement("p");
    name.className = "name";
    name.textContent = dish.name;
    card.appendChild(name);

    const weight = document.createElement("p");
    weight.className = "weight";
    weight.textContent = dish.count;
    card.appendChild(weight);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "add-btn card__btn";
    btn.textContent = "Добавить";
    card.appendChild(btn);

    return card;
  }

  // Вставка карточек
  ["soup", "main", "drink"].forEach(cat => {
    const grid = grids[cat];
    if (!grid) return;

    grouped[cat].forEach(dish => {
      grid.appendChild(createCard(dish));
    });
  });
})();
