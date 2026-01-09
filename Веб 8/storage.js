// storage.js
const ORDER_KEY = "order_v1";

// структура: { soup_id, main_course_id, salad_id, drink_id, dessert_id }
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

function hasAnyInOrder(order = getOrder()) {
  return !!(
    order.soup_id ||
    order.main_course_id ||
    order.salad_id ||
    order.drink_id ||
    order.dessert_id
  );
}

// 5 комбо из ЛР6 (десерт не влияет)
function isComboValid(order = getOrder()) {
  const hasSoup = !!order.soup_id;
  const hasMain = !!order.main_course_id;
  const hasSalad = !!order.salad_id;
  const hasDrink = !!order.drink_id;

  // 1) суп + главное + салат + напиток
  if (hasSoup && hasMain && hasSalad && hasDrink) return true;
  // 2) суп + главное + напиток
  if (hasSoup && hasMain && hasDrink && !hasSalad) return true;
  // 3) суп + салат + напиток
  if (hasSoup && hasSalad && hasDrink && !hasMain) return true;
  // 4) главное + салат + напиток
  if (hasMain && hasSalad && hasDrink && !hasSoup) return true;
  // 5) главное + напиток
  if (hasMain && hasDrink && !hasSoup && !hasSalad) return true;

  return false;
}
