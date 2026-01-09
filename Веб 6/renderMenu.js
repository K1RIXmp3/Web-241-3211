// renderMenu.js
// Рендер карточек из массива DISHES в 5 сеток (soup/main/salad/drink/dessert)
// + сортировка по алфавиту
// + проставляем data-атрибуты: data-dish, data-category, data-kind

(function () {
  if (!Array.isArray(window.DISHES)) {
    console.error("DISHES не найден. Подключи data.js перед renderMenu.js");
    return;
  }

  // Куда рендерим карточки
  const grids = {
    soup: document.getElementById("soups-grid"),
    main: document.getElementById("mains-grid"),
    salad: document.getElementById("salads-grid"),
    drink: document.getElementById("drinks-grid"),
    dessert: document.getElementById("desserts-grid"),
  };

  // Поддерживаемые категории
  const categories = Object.keys(grids);

  // Группировка блюд по категориям
  const grouped = {};
  categories.forEach((cat) => (grouped[cat] = []));

  window.DISHES.forEach((dish) => {
    if (grouped[dish.category]) grouped[dish.category].push(dish);
  });

  // Сортировка по названию (рус)
  categories.forEach((cat) => {
    grouped[cat].sort((a, b) =>
      String(a.name).localeCompare(String(b.name), "ru", { sensitivity: "base" })
    );
  });

  // Очистка сеток (чтобы при перерисовке не дублировалось)
  categories.forEach((cat) => {
    const grid = grids[cat];
    if (grid) grid.innerHTML = "";
  });

  // Создание карточки блюда
  function createCard(dish) {
    const card = document.createElement("div");
    card.className = "dish-item";
    card.dataset.dish = dish.keyword;          // ключ блюда (для поиска в массиве)
    card.dataset.category = dish.category;     // категория
    if (dish.kind) card.dataset.kind = dish.kind; // kind (для фильтрации)

    // чтобы можно было кликать по карточке целиком
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Добавить: ${dish.name}`);

    const img = document.createElement("img");
    img.src = dish.image;
    img.alt = dish.name;
    card.appendChild(img);

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = `${dish.price}₽`;
    card.appendChild(price);

    const name = document.createElement("p");
    name.className = "name";
    name.textContent = dish.name;
    card.appendChild(name);

    const count = document.createElement("p");
    count.className = "weight";
    count.textContent = dish.count;
    card.appendChild(count);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "add-btn";
    btn.textContent = "Добавить";
    card.appendChild(btn);

    return card;
  }

  // Рендер всех категорий
  categories.forEach((cat) => {
    const grid = grids[cat];
    if (!grid) return;

    grouped[cat].forEach((dish) => {
      grid.appendChild(createCard(dish));
    });
  });
})();
