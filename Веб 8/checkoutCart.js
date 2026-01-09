// checkoutCart.js
// 1) берём ids из localStorage
// 2) грузим данные блюд (dishes) уже есть (передаём в initCheckoutCart)
// 3) рисуем карточки с кнопкой "Удалить"
// 4) обновляем левую часть формы + сумму
// 5) перед submit: проверка комбо (из storage.js) + отправка на API (ЛР8)

function initCheckoutCart(dishes) {
  if (!Array.isArray(dishes)) return;

  const grid = document.getElementById("checkout-grid");
  const emptyText = document.getElementById("checkout-empty");

  const elSoup = document.getElementById("order-soup");
  const elMain = document.getElementById("order-main");
  const elSalad = document.getElementById("order-salad");
  const elDrink = document.getElementById("order-drink");
  const elDessert = document.getElementById("order-dessert");
  const elSum = document.getElementById("order-sum");

  const form = document.querySelector("form.order-form");

  function dishById(id) {
    return dishes.find((d) => d.id === id) || null;
  }

  function calcSum(order) {
    const ids = [
      order.soup_id,
      order.main_course_id,
      order.salad_id,
      order.drink_id,
      order.dessert_id,
    ].filter(Boolean);

    return ids.reduce((acc, id) => acc + (dishById(id)?.price || 0), 0);
  }

  function renderFormSummary(order) {
    const soup = order.soup_id ? dishById(order.soup_id) : null;
    const main = order.main_course_id ? dishById(order.main_course_id) : null;
    const salad = order.salad_id ? dishById(order.salad_id) : null;
    const drink = order.drink_id ? dishById(order.drink_id) : null;
    const dessert = order.dessert_id ? dishById(order.dessert_id) : null;

    if (elSoup) elSoup.textContent = soup ? `${soup.name} ${soup.price}₽` : "Не выбран";
    if (elMain) elMain.textContent = main ? `${main.name} ${main.price}₽` : "Не выбрано";
    if (elSalad) elSalad.textContent = salad ? `${salad.name} ${salad.price}₽` : "Не выбран";
    if (elDrink) elDrink.textContent = drink ? `${drink.name} ${drink.price}₽` : "Не выбран";
    if (elDessert) elDessert.textContent = dessert ? `${dessert.name} ${dessert.price}₽` : "Не выбран";

    if (elSum) elSum.textContent = `${calcSum(order)}₽`;
  }

  function createCheckoutCard(dish) {
    const card = document.createElement("div");
    card.className = "dish-item";
    card.dataset.id = dish.id;

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
    btn.className = "remove-btn";
    btn.textContent = "Удалить";
    card.appendChild(btn);

    return card;
  }

  function renderCheckoutList(order) {
    if (!grid || !emptyText) return;

    grid.innerHTML = "";

    const ids = [
      order.soup_id,
      order.main_course_id,
      order.salad_id,
      order.drink_id,
      order.dessert_id,
    ].filter(Boolean);

    if (ids.length === 0) {
      emptyText.classList.remove("hidden");
      return;
    }

    emptyText.classList.add("hidden");

    ids.forEach((id) => {
      const dish = dishById(id);
      if (!dish) return;
      grid.appendChild(createCheckoutCard(dish));
    });
  }

  function removeById(id) {
    const order = getOrder();

    if (order.soup_id === id) delete order.soup_id;
    if (order.main_course_id === id) delete order.main_course_id;
    if (order.salad_id === id) delete order.salad_id;
    if (order.drink_id === id) delete order.drink_id;
    if (order.dessert_id === id) delete order.dessert_id;

    setOrder(order);
    refresh();
  }

  function refresh() {
    const order = getOrder();
    renderCheckoutList(order);
    renderFormSummary(order);
  }

  // клики по "Удалить"
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-btn");
    if (!btn) return;

    const card = e.target.closest(".dish-item");
    if (!card) return;

    const id = Number(card.dataset.id);
    if (!id) return;

    removeById(id);
  });

  // ===== Отправка заказа на API (ЛР8) =====
  // ВСТАВЬ СЮДА СВОЙ api_key:
  const API_KEY = "355f1d4b-e5af-4a83-8bdb-d21b0b788788";

  async function sendOrder() {
    const order = getOrder();

    // проверка комбо (ЛР6)
   if (!isComboValid(order)) {
  showModal("Состав заказа не соответствует доступным комбо. Проверьте выбранные блюда.");
  throw new Error("INVALID_COMBO");
    }

    // сбор данных формы (подставь свои id полей, если отличаются)
    const full_name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const delivery_address = document.getElementById("address")?.value.trim();
    const subscribe = document.getElementById("newsletter")?.checked ? 1 : 0;

    const delivery_type =
      document.getElementById("time_asap")?.checked ? "now" : "by_time";

    const delivery_time_value = document.getElementById("delivery_time_value")?.value || "";
    const comment = document.getElementById("comments")?.value.trim() || "";

    if (delivery_type === "by_time" && !delivery_time_value) {
      alert("Укажите время доставки");
      return;
    }

    const payload = {
      full_name,
      email,
      phone,
      delivery_address,
      subscribe,
      delivery_type,
      comment,

      soup_id: order.soup_id || null,
      main_course_id: order.main_course_id || null,
      salad_id: order.salad_id || null,
      drink_id: order.drink_id || null,
      dessert_id: order.dessert_id || null,
    };

    if (delivery_type === "by_time") payload.delivery_time = delivery_time_value;

    const url = `https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${encodeURIComponent(API_KEY)}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `HTTP ${res.status}`);
    }

    return await res.json();
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const result = await sendOrder();
        // успех: чистим localStorage
        clearOrder();

        alert("Заказ успешно оформлен!");
        // можно редиректнуть обратно:
        // location.href = "lunch.html";
        refresh();
      } catch (err) {
        alert("Ошибка при оформлении заказа: " + err.message);
      }
    });
  }

  // старт
  refresh();
}
