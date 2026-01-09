// lunchCart.js
// 1) клики по карточкам/кнопке -> сохраняем dish.id в localStorage
// 2) подсветка выбранных карточек
// 3) sticky панель "Перейти к оформлению" + сумма + блокировка по комбо

function initLunchCart(dishes) {
  if (!Array.isArray(dishes)) return;

  const panel = document.getElementById("checkout-panel");
  const sumEl = document.getElementById("checkout-sum");
  const link = document.getElementById("checkout-link");

  function findDishByKeyword(keyword) {
    return dishes.find((d) => d.keyword === keyword) || null;
  }

  function calcSum(order) {
    const ids = [
      order.soup_id,
      order.main_course_id,
      order.salad_id,
      order.drink_id,
      order.dessert_id,
    ].filter(Boolean);

    return ids.reduce((acc, id) => {
      const dish = dishes.find((d) => d.id === id);
      return acc + (dish?.price || 0);
    }, 0);
  }

  function markSelected(order) {
    const selectedIds = new Set(
      [order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id]
        .filter(Boolean)
        .map(Number)
    );

    document.querySelectorAll(".dish-item").forEach((card) => {
      const id = Number(card.dataset.id);
      card.classList.toggle("selected", selectedIds.has(id));
    });
  }

  function updatePanel(order) {
    if (!panel || !sumEl || !link) return;

    const any = hasAnyInOrder(order);
    panel.classList.toggle("hidden", !any);

    const sum = calcSum(order);
    sumEl.textContent = `${sum}₽`;

    const ok = isComboValid(order);
    link.classList.toggle("disabled", !ok);
  }

  // Маппинг category -> поле в localStorage
  function categoryToField(category) {
    if (category === "soup") return "soup_id";
    if (category === "main-course") return "main_course_id";
    if (category === "salad") return "salad_id";
    if (category === "drink") return "drink_id";
    if (category === "dessert") return "dessert_id";
    return null;
  }

  function refresh() {
    const order = getOrder();
    markSelected(order);
    updatePanel(order);
  }

  // Делегирование кликов по карточкам
  document.addEventListener("click", (e) => {
    if (e.target.closest(".filter-btn")) return;

    const card = e.target.closest(".dish-item");
    if (!card) return;

    const keyword = card.dataset.dish;
    if (!keyword) return;

    const dish = findDishByKeyword(keyword);
    if (!dish) return;

    const field = categoryToField(dish.category);
    if (!field) return;

    const order = getOrder();
    order[field] = dish.id;
    setOrder(order);

    refresh();
  });

  // старт
  refresh();
}
