// cart.js
// Добавление выбранных блюд в "Ваш заказ" + итоговая стоимость
// Поддержка 5 категорий: soup, main, salad, drink, dessert
// Работает с динамическими карточками (event delegation)

(function () {
  if (!Array.isArray(window.DISHES)) {
    console.error("DISHES не найден. Подключи data.js перед cart.js");
    return;
  }

  // Состояние выбора
  const chosen = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null,
  };

  // Элементы вывода
  const elEmpty = document.getElementById("order-empty");      // если используешь
  const elLines = document.getElementById("order-lines");
  const elTotal = document.getElementById("order-total");
  const elSum = document.getElementById("order-sum");

  const elSoup = document.getElementById("order-soup");
  const elMain = document.getElementById("order-main");
  const elSalad = document.getElementById("order-salad");
  const elDrink = document.getElementById("order-drink");
  const elDessert = document.getElementById("order-dessert");

  // hidden inputs для отправки
  const inSoup = document.getElementById("chosen_soup");
  const inMain = document.getElementById("chosen_main");
  const inSalad = document.getElementById("chosen_salad");
  const inDrink = document.getElementById("chosen_drink");
  const inDessert = document.getElementById("chosen_dessert");

  // Обновление UI заказа
  function renderOrder() {
    const anyChosen =
      chosen.soup || chosen.main || chosen.salad || chosen.drink || chosen.dessert;

    // "Ничего не выбрано" (если ты его оставляешь)
    if (elEmpty) elEmpty.classList.toggle("hidden", !!anyChosen);

    // строки + сумма
    if (elLines) elLines.classList.toggle("hidden", !anyChosen);
    if (elTotal) elTotal.classList.toggle("hidden", !anyChosen);

    // текст по категориям
    if (elSoup) elSoup.textContent = chosen.soup ? `${chosen.soup.name} — ${chosen.soup.price}₽` : "Блюдо не выбрано";
    if (elMain) elMain.textContent = chosen.main ? `${chosen.main.name} — ${chosen.main.price}₽` : "Блюдо не выбрано";
    if (elSalad) elSalad.textContent = chosen.salad ? `${chosen.salad.name} — ${chosen.salad.price}₽` : "Блюдо не выбрано";
    if (elDrink) elDrink.textContent = chosen.drink ? `${chosen.drink.name} — ${chosen.drink.price}₽` : "Напиток не выбран";
    if (elDessert) elDessert.textContent = chosen.dessert ? `${chosen.dessert.name} — ${chosen.dessert.price}₽` : "Блюдо не выбрано";

    // сумма
    const sum =
      (chosen.soup?.price || 0) +
      (chosen.main?.price || 0) +
      (chosen.salad?.price || 0) +
      (chosen.drink?.price || 0) +
      (chosen.dessert?.price || 0);

    if (elSum) elSum.textContent = `${sum}₽`;

    // hidden inputs
    if (inSoup) inSoup.value = chosen.soup ? chosen.soup.keyword : "";
    if (inMain) inMain.value = chosen.main ? chosen.main.keyword : "";
    if (inSalad) inSalad.value = chosen.salad ? chosen.salad.keyword : "";
    if (inDrink) inDrink.value = chosen.drink ? chosen.drink.keyword : "";
    if (inDessert) inDessert.value = chosen.dessert ? chosen.dessert.keyword : "";
  }

  // Найти блюдо по keyword
  function findDish(keyword) {
    return window.DISHES.find((d) => d.keyword === keyword) || null;
  }

  // Делегирование клика: ловим клик по карточке или кнопке
  document.addEventListener("click", (e) => {
    // Если нажали на кнопку "фильтр" — выходим (на всякий случай)
    if (e.target.closest(".filter-btn")) return;

    // Ищем карточку блюда
    const card = e.target.closest(".dish-item");
    if (!card) return;

    const keyword = card.dataset.dish;
    if (!keyword) return;

    const dish = findDish(keyword);
    if (!dish) return;

    // записываем в выбранное по категории
    if (chosen.hasOwnProperty(dish.category)) {
      chosen[dish.category] = dish;
      renderOrder();
    }
  });

  // Инициализация состояния на старте
  renderOrder();
})();

// === Синхронизация hidden inputs (ЛР6) ===

// сюда cart.js должен складывать выбранные блюда (keyword)
const selected = {
  soup: "",
  main: "",
  salad: "",
  drink: "",
  dessert: "",
};

function syncHiddenInputs() {
  if (inSoup) inSoup.value = selected.soup || "";
  if (inMain) inMain.value = selected.main || "";
  if (inSalad) inSalad.value = selected.salad || "";
  if (inDrink) inDrink.value = selected.drink || "";
  if (inDessert) inDessert.value = selected.dessert || "";
}

// вызывать после любого изменения выбора
function setSelected(category, keyword) {
  // десерт можно добавлять/заменять отдельно
  selected[category] = keyword || "";
  syncHiddenInputs();
  // если у тебя есть функция перерисовки заказа — вызови её тут:
  // renderOrder();
}

// при сбросе формы чистим выбор
const form = document.querySelector("form.order-form");
if (form) {
  form.addEventListener("reset", () => {
    selected.soup = "";
    selected.main = "";
    selected.salad = "";
    selected.drink = "";
    selected.dessert = "";
    syncHiddenInputs();

    // если ты показываешь "ничего не выбрано"/сумму — тоже обнови:
    // renderOrder();
  });
}
