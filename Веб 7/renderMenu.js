// renderMenu.js
// Рендер карточек из переданного массива dishes (или window.DISHES)

function renderMenu(dishes = window.DISHES) {
  if (!Array.isArray(dishes)) {
    console.error("renderMenu: массив dishes не передан");
    return;
  }

  const grids = {
    soup: document.getElementById("soups-grid"),
    main: document.getElementById("mains-grid"),
    salad: document.getElementById("salads-grid"),
    drink: document.getElementById("drinks-grid"),
    dessert: document.getElementById("desserts-grid"),
  };

  const categories = Object.keys(grids);

  const grouped = {};
  categories.forEach((cat) => (grouped[cat] = []));

  dishes.forEach((dish) => {
    if (grouped[dish.category]) grouped[dish.category].push(dish);
  });

  categories.forEach((cat) => {
    grouped[cat].sort((a, b) =>
      String(a.name).localeCompare(String(b.name), "ru", { sensitivity: "base" })
    );
  });

  categories.forEach((cat) => {
    const grid = grids[cat];
    if (grid) grid.innerHTML = "";
  });

  function createCard(dish) {
    const card = document.createElement("div");
    card.className = "dish-item";
    card.dataset.dish = dish.keyword;
    card.dataset.category = dish.category;
    if (dish.kind) card.dataset.kind = dish.kind;

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

  categories.forEach((cat) => {
    const grid = grids[cat];
    if (!grid) return;

    grouped[cat].forEach((dish) => grid.appendChild(createCard(dish)));
  });
}
