// cart.js
const ORDER_KEY = "order";

function getOrder() {
  try {
    return JSON.parse(localStorage.getItem(ORDER_KEY)) || {};
  } catch {
    return {};
  }
}

function setOrder(order) {
  localStorage.setItem(ORDER_KEY, JSON.stringify(order));
}

function clearOrder() {
  localStorage.removeItem(ORDER_KEY);
}


function initCart(dishes = window.DISHES) {
  if (!Array.isArray(dishes)) {
    console.error("initCart: DISHES не загружен");
    return;
  }

  const chosen = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null,
  };

  const elEmpty = document.getElementById("order-empty");
  const elLines = document.getElementById("order-lines");
  const elTotal = document.getElementById("order-total");
  const elSum = document.getElementById("order-sum");

  const elSoup = document.getElementById("order-soup");
  const elMain = document.getElementById("order-main");
  const elSalad = document.getElementById("order-salad");
  const elDrink = document.getElementById("order-drink");
  const elDessert = document.getElementById("order-dessert");

  const inSoup = document.getElementById("chosen_soup");
  const inMain = document.getElementById("chosen_main");
  const inSalad = document.getElementById("chosen_salad");
  const inDrink = document.getElementById("chosen_drink");
  const inDessert = document.getElementById("chosen_dessert");

  function renderOrder() {
    const anyChosen =
      chosen.soup || chosen.main || chosen.salad || chosen.drink || chosen.dessert;

    if (elEmpty) elEmpty.classList.toggle("hidden", !!anyChosen);
    if (elLines) elLines.classList.toggle("hidden", !anyChosen);
    if (elTotal) elTotal.classList.toggle("hidden", !anyChosen);

    if (elSoup) elSoup.textContent = chosen.soup ? `${chosen.soup.name} — ${chosen.soup.price}₽` : "Блюдо не выбрано";
    if (elMain) elMain.textContent = chosen.main ? `${chosen.main.name} — ${chosen.main.price}₽` : "Блюдо не выбрано";
    if (elSalad) elSalad.textContent = chosen.salad ? `${chosen.salad.name} — ${chosen.salad.price}₽` : "Блюдо не выбрано";
    if (elDrink) elDrink.textContent = chosen.drink ? `${chosen.drink.name} — ${chosen.drink.price}₽` : "Напиток не выбран";
    if (elDessert) elDessert.textContent = chosen.dessert ? `${chosen.dessert.name} — ${chosen.dessert.price}₽` : "Блюдо не выбрано";

    const sum =
      (chosen.soup?.price || 0) +
      (chosen.main?.price || 0) +
      (chosen.salad?.price || 0) +
      (chosen.drink?.price || 0) +
      (chosen.dessert?.price || 0);

    if (elSum) elSum.textContent = `${sum}₽`;

    if (inSoup) inSoup.value = chosen.soup ? chosen.soup.keyword : "";
    if (inMain) inMain.value = chosen.main ? chosen.main.keyword : "";
    if (inSalad) inSalad.value = chosen.salad ? chosen.salad.keyword : "";
    if (inDrink) inDrink.value = chosen.drink ? chosen.drink.keyword : "";
    if (inDessert) inDessert.value = chosen.dessert ? chosen.dessert.keyword : "";
  }

  function findDish(keyword) {
    return dishes.find((d) => d.keyword === keyword) || null;
  }

  // Чтобы не повесить 2 раза, можно запомнить флажок
  if (!document.body.dataset.cartInited) {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".filter-btn")) return;

      const card = e.target.closest(".dish-item");
      if (!card) return;

      const keyword = card.dataset.dish;
      if (!keyword) return;

      const dish = findDish(keyword);
      if (!dish) return;

      if (Object.prototype.hasOwnProperty.call(chosen, dish.category)) {
        chosen[dish.category] = dish;
        renderOrder();
      }
      const mapCategoryToIdField = {
  soup: "soup_id",
  "main-course": "main_course_id",   // ВАЖНО: у API категория main-course
  salad: "salad_id",
  drink: "drink_id",
  dessert: "dessert_id",
};

// ... внутри клика, после того как dish найден:
const order = getOrder();
const idField = mapCategoryToIdField[dish.category];
if (idField) {
  order[idField] = dish.id;     // сохраняем ID
  setOrder(order);
}
    });

    document.body.dataset.cartInited = "1";
  }

  renderOrder();
}
