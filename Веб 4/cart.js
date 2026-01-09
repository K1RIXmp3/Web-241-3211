// js/cart.js
(function () {
  const dishes = window.DISHES;
  if (!Array.isArray(dishes)) {
    console.error("DISHES не найден. Подключи data.js перед cart.js");
    return;
  }

  // DOM
  const orderEmpty = document.getElementById("order-empty");
  const orderLines = document.getElementById("order-lines");
  const orderTotal = document.getElementById("order-total");

  const outSoup = document.getElementById("order-soup");
  const outMain = document.getElementById("order-main");
  const outDrink = document.getElementById("order-drink");
  const outSum = document.getElementById("order-sum");

  const hiddenSoup = document.getElementById("chosen_soup");
  const hiddenMain = document.getElementById("chosen_main");
  const hiddenDrink = document.getElementById("chosen_drink");

  if (!orderEmpty || !orderLines || !orderTotal || !outSoup || !outMain || !outDrink || !outSum) {
    console.error("Не найдены элементы блока 'Ваш заказ' — проверь id в HTML");
    return;
  }

  // Состояние выбора
  const selected = {
    soup: null,
    main: null,
    drink: null,
  };

  function formatDish(dish) {
    return `${dish.name} ${dish.price}₽`;
  }

  function renderOrder() {
    const anySelected = !!(selected.soup || selected.main || selected.drink);

    if (!anySelected) {
      orderEmpty.classList.remove("hidden");
      orderLines.classList.add("hidden");
      orderTotal.classList.add("hidden");

      outSoup.textContent = "Блюдо не выбрано";
      outMain.textContent = "Блюдо не выбрано";
      outDrink.textContent = "Напиток не выбран";
      outSum.textContent = "0₽";

      if (hiddenSoup) hiddenSoup.value = "";
      if (hiddenMain) hiddenMain.value = "";
      if (hiddenDrink) hiddenDrink.value = "";
      return;
    }

    // Есть выбор
    orderEmpty.classList.add("hidden");
    orderLines.classList.remove("hidden");

    outSoup.textContent = selected.soup ? formatDish(selected.soup) : "Блюдо не выбрано";
    outMain.textContent = selected.main ? formatDish(selected.main) : "Блюдо не выбрано";
    outDrink.textContent = selected.drink ? formatDish(selected.drink) : "Напиток не выбран";

    // Сумма
    const sum =
      (selected.soup?.price || 0) +
      (selected.main?.price || 0) +
      (selected.drink?.price || 0);

    if (sum > 0) {
      orderTotal.classList.remove("hidden");
      outSum.textContent = `${sum}₽`;
    } else {
      orderTotal.classList.add("hidden");
      outSum.textContent = "0₽";
    }

    // hidden inputs для отправки на httpbin
    if (hiddenSoup) hiddenSoup.value = selected.soup ? selected.soup.keyword : "";
    if (hiddenMain) hiddenMain.value = selected.main ? selected.main.keyword : "";
    if (hiddenDrink) hiddenDrink.value = selected.drink ? selected.drink.keyword : "";
  }

  // Обработка кликов по карточкам (делегирование)
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".dish-item");
    if (!card) return;

    const key = card.dataset.dish;
    if (!key) return;

    const dish = dishes.find((d) => d.keyword === key);
    if (!dish) return;

    selected[dish.category] = dish;
    renderOrder();
  });

  // На старте
  renderOrder();
})();
