// orders.js
// История заказов + модалки: Подробнее / Редактировать / Удалить
// Требует modal.js (showModal умеет html + кнопки)

(function () {
  const API_KEY = "355f1d4b-e5af-4a83-8bdb-d21b0b788788"; 
  const BASE = "https://edu.std-900.ist.mospolytech.ru/labs/api";

  const tbody = document.getElementById("orders-body");
  if (!tbody) return;

  let DISHES = [];
  let DISH_BY_ID = new Map();

  // ---------- helpers ----------
  async function fetchJSON(url, options) {
    const res = await fetch(url, options);
    const text = await res.text();

    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!res.ok) {
      const msg = (data && data.error) ? data.error : (typeof data === "string" ? data : `HTTP ${res.status}`);
      throw new Error(msg);
    }
    return data;
  }

  function fmtDateTime(iso) {
    try {
      return new Date(iso).toLocaleString("ru-RU");
    } catch {
      return iso;
    }
  }

  function fmtDelivery(order) {
    if (order.delivery_type === "by_time") return order.delivery_time || "";
    return "Как можно скорее (с 7:00 до 23:00)";
  }

  function dishName(id) {
    const d = DISH_BY_ID.get(Number(id));
    return d ? d.name : `Блюдо #${id}`;
  }

  function dishPrice(id) {
    const d = DISH_BY_ID.get(Number(id));
    return d ? Number(d.price) || 0 : 0;
  }

  function compositionList(order) {
    const ids = [
      order.soup_id,
      order.main_course_id,
      order.salad_id,
      order.drink_id,
      order.dessert_id,
    ].filter(Boolean);

    return ids.map(dishName);
  }

  function calcSum(order) {
    const ids = [
      order.soup_id,
      order.main_course_id,
      order.salad_id,
      order.drink_id,
      order.dessert_id,
    ].filter(Boolean);

    return ids.reduce((acc, id) => acc + dishPrice(id), 0);
  }

  // ---------- API ----------
  async function loadDishes() {
    const url = `${BASE}/dishes`;
    const dishes = await fetchJSON(url);
    DISHES = Array.isArray(dishes) ? dishes : [];
    DISH_BY_ID = new Map(DISHES.map((d) => [Number(d.id), d]));
  }

  async function loadOrders() {
    const url = `${BASE}/orders?api_key=${encodeURIComponent(API_KEY)}`;
    const orders = await fetchJSON(url);
    return Array.isArray(orders) ? orders : [];
  }

  async function apiDeleteOrder(id) {
    const url = `${BASE}/orders/${id}?api_key=${encodeURIComponent(API_KEY)}`;
    return await fetchJSON(url, { method: "DELETE" });
  }

  async function apiUpdateOrder(id, payload) {
    const url = `${BASE}/orders/${id}?api_key=${encodeURIComponent(API_KEY)}`;
    return await fetchJSON(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  // ---------- render ----------
  function renderOrders(orders) {
    tbody.innerHTML = "";

    orders
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .forEach((order, index) => {
        const tr = document.createElement("tr");

        const items = compositionList(order).join(", ");
        const sum = calcSum(order);

        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${fmtDateTime(order.created_at)}</td>
          <td>${items || "—"}</td>
          <td>${sum}₽</td>
          <td>${fmtDelivery(order)}</td>
          <td>
            <button type="button" data-action="view" data-id="${order.id}" title="Подробнее">👁</button>
            <button type="button" data-action="edit" data-id="${order.id}" title="Редактировать">✏</button>
            <button type="button" data-action="delete" data-id="${order.id}" title="Удалить">🗑</button>
          </td>
        `;

        tbody.appendChild(tr);
      });
  }

  // ---------- modals ----------
  function openViewModal(order) {
    const items = compositionList(order);

    const html = `
      <div><b>Дата оформления</b>: ${fmtDateTime(order.created_at)}</div>
      <div class="fc-modal__hr"></div>

      <div><b>Доставка</b>: ${order.delivery_type === "by_time" ? "К указанному времени" : "Как можно скорее"}</div>
      <div><b>Время доставки</b>: ${fmtDelivery(order)}</div>

      <div class="fc-modal__hr"></div>

      <div><b>Имя получателя</b>: ${order.full_name || "—"}</div>
      <div><b>Адрес доставки</b>: ${order.delivery_address || "—"}</div>
      <div><b>Телефон</b>: ${order.phone || "—"}</div>
      <div><b>Email</b>: ${order.email || "—"}</div>

      <div class="fc-modal__hr"></div>

      <div><b>Комментарий</b>: ${order.comment ? order.comment : "—"}</div>

      <div class="fc-modal__hr"></div>

      <div><b>Состав заказа</b>:</div>
      <div style="margin-top:8px">
        ${items.length ? items.map((t) => `• ${t}`).join("<br>") : "—"}
      </div>

      <div class="fc-modal__hr"></div>

      <div><b>Стоимость</b>: ${calcSum(order)}₽</div>
    `;

    showModal({
      title: "Просмотр заказа",
      html,
      buttons: [{ text: "Ок" }],
    });
  }

  function openDeleteModal(order) {
    showModal({
      title: "Удаление заказа",
      text: "Вы уверены, что хотите удалить заказ?",
      buttons: [
        { text: "Отмена" },
        {
          text: "Да",
          variant: "danger",
          onClick: async () => {
            await apiDeleteOrder(order.id);
            showModal("Заказ удалён");
            await refresh();
          },
        },
      ],
    });
  }

  function openEditModal(order) {
    const html = `
      <div><b>Дата оформления</b>: ${fmtDateTime(order.created_at)}</div>
      <div class="fc-modal__hr"></div>

      <div class="fc-modal__row">
        <div>
          <label>Имя получателя</label>
          <input id="edit_full_name" value="${escapeAttr(order.full_name || "")}" />
        </div>
        <div>
          <label>Телефон</label>
          <input id="edit_phone" value="${escapeAttr(order.phone || "")}" />
        </div>
      </div>

      <div class="fc-modal__row">
        <div>
          <label>Email</label>
          <input id="edit_email" value="${escapeAttr(order.email || "")}" />
        </div>
        <div>
          <label>Адрес доставки</label>
          <input id="edit_address" value="${escapeAttr(order.delivery_address || "")}" />
        </div>
      </div>

      <div class="fc-modal__row">
        <div>
          <label>Тип доставки</label>
          <select id="edit_delivery_type">
            <option value="now" ${order.delivery_type === "now" ? "selected" : ""}>Как можно скорее</option>
            <option value="by_time" ${order.delivery_type === "by_time" ? "selected" : ""}>К указанному времени</option>
          </select>
        </div>
        <div>
          <label>Время доставки (HH:MM)</label>
          <input id="edit_delivery_time" placeholder="например 17:00" value="${escapeAttr(order.delivery_time || "")}" />
        </div>
      </div>

      <label>Комментарий</label>
      <textarea id="edit_comment" placeholder="Комментарий...">${escapeHtml(order.comment || "")}</textarea>

      <div class="fc-modal__hr"></div>
      <div><b>Состав заказа</b>: ${compositionList(order).join(", ") || "—"}</div>
      <div><b>Стоимость</b>: ${calcSum(order)}₽</div>
    `;

    showModal({
      title: "Редактирование заказа",
      html,
      buttons: [
        { text: "Отмена" },
        {
          text: "Сохранить",
          variant: "primary",
          onClick: async () => {
            const full_name = document.getElementById("edit_full_name")?.value.trim() || "";
            const phone = document.getElementById("edit_phone")?.value.trim() || "";
            const email = document.getElementById("edit_email")?.value.trim() || "";
            const delivery_address = document.getElementById("edit_address")?.value.trim() || "";
            const delivery_type = document.getElementById("edit_delivery_type")?.value || "now";
            const delivery_time = document.getElementById("edit_delivery_time")?.value.trim() || "";
            const comment = document.getElementById("edit_comment")?.value.trim() || "";

            if (!full_name || !phone || !email || !delivery_address) {
              showModal("Заполни обязательные поля: имя, телефон, email, адрес.");
              return false; // не закрываем модалку редактирования
            }

            if (delivery_type === "by_time" && !delivery_time) {
              showModal("Для доставки ко времени нужно указать delivery_time (HH:MM).");
              return false;
            }

            // отправляем только редактируемые поля (как в задании)
            const payload = {
              full_name,
              email,
              phone,
              delivery_address,
              delivery_type,
              comment,
            };
            if (delivery_type === "by_time") payload.delivery_time = delivery_time;

            await apiUpdateOrder(order.id, payload);
            showModal("Заказ успешно изменён!");
            await refresh();
          },
        },
      ],
    });
  }

  // защита для вставки в атрибут value=""
  function escapeAttr(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }
  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  // ---------- controller ----------
  let ORDERS_CACHE = [];

  async function refresh() {
    const orders = await loadOrders();
    ORDERS_CACHE = orders;
    renderOrders(orders);
  }

  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const action = btn.dataset.action;

    const order = ORDERS_CACHE.find((o) => Number(o.id) === id);
    if (!order) return;

    if (action === "view") openViewModal(order);
    if (action === "edit") openEditModal(order);
    if (action === "delete") openDeleteModal(order);
  });

  // ---------- init ----------
  (async function init() {
    try {
      await loadDishes();   // нужно, чтобы показывать названия блюд и цену
      await refresh();
    } catch (err) {
      showModal("Ошибка: " + err.message);
      console.error(err);
    }
  })();
})();
