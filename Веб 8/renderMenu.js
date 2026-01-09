// renderMenu.js
// renderMenu(dishes): рендер карточек в 5 сеток + data-id/data-kind

function renderMenu(dishes) {
  if (!Array.isArray(dishes)) {
    console.error("renderMenu: dishes не массив");
    return;
  }

  const grids = {
    soup: document.getElementById("soups-grid"),
    main: document.getElementById("mains-grid"),
    salad: document.getElementById("salads-grid"),
    drink: document.getElementById("drinks-grid"),
    dessert: document.getElementById("desserts-grid"),
  };

  function normalizeCategory(cat) {
    // API отдаёт main-course, а в HTML grid у тебя mains-grid (ключ main)
    if (cat === "main-course") return "main";
    return cat; // soup, salad, drink, dessert
  }

  const grouped = { soup: [], main: [], salad: [], drink: [], dessert: [] };

  dishes.forEach((dish) => {
    const key = normalizeCategory(dish.category);
    if (grouped[key]) grouped[key].push(dish);
  });

  Object.keys(grouped).forEach((cat) => {
    grouped[cat].sort((a, b) =>
      String(a.name).localeCompare(String(b.name), "ru", { sensitivity: "base" })
    );
  });

  Object.keys(grids).forEach((cat) => {
    if (grids[cat]) grids[cat].innerHTML = "";
  });

  function createCard(dish) {
    const card = document.createElement("div");
    card.className = "dish-item";

    card.dataset.dish = dish.keyword;
    card.dataset.id = dish.id;                // ВАЖНО для ЛР8
    card.dataset.category = dish.category;    // оригинальная category из API
    if (dish.kind) card.dataset.kind = dish.kind;

    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

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

  Object.keys(grouped).forEach((cat) => {
    const grid = grids[cat];
    if (!grid) return;
    grouped[cat].forEach((dish) => grid.appendChild(createCard(dish)));
  });
}
