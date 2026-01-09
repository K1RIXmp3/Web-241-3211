function calcSumFromStorage(dishes) {
  const order = getOrder();
  const ids = [order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id].filter(Boolean);
  return ids.reduce((acc, id) => {
    const dish = dishes.find(d => d.id === id);
    return acc + (dish?.price || 0);
  }, 0);
}

function isComboValid(order) {
  const hasSoup = !!order.soup_id;
  const hasMain = !!order.main_course_id;
  const hasSalad = !!order.salad_id;
  const hasDrink = !!order.drink_id;
  // dessert не влияет

  // 1: soup+main+salad+drink
  if (hasSoup && hasMain && hasSalad && hasDrink) return true;
  // 2: soup+main+drink
  if (hasSoup && hasMain && hasDrink && !hasSalad) return true;
  // 3: soup+salad+drink
  if (hasSoup && hasSalad && hasDrink && !hasMain) return true;
  // 4: main+salad+drink
  if (hasMain && hasSalad && hasDrink && !hasSoup) return true;
  // 5: main+drink
  if (hasMain && hasDrink && !hasSoup && !hasSalad) return true;

  return false;
}

function updateCheckoutPanel(dishes) {
  const panel = document.getElementById("checkout-panel");
  const sumEl = document.getElementById("checkout-sum");
  const link = document.getElementById("checkout-link");

  if (!panel || !sumEl || !link) return;

  const order = getOrder();
  const hasAny = !!(order.soup_id || order.main_course_id || order.salad_id || order.drink_id || order.dessert_id);

  panel.classList.toggle("hidden", !hasAny);

  const sum = calcSumFromStorage(dishes);
  sumEl.textContent = `${sum}₽`;

  const ok = isComboValid(order);
  link.classList.toggle("disabled", !ok);
}