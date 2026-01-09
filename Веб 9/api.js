// api.js
(async function () {
  const PAGE = document.body?.dataset?.page || ""; // lunch | checkout | home
  const DISHES_URL = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";

  function normalizeForRender(dishes) {
    // renderMenu у тебя работает с категориями: soup/main/salad/drink/dessert
    // API отдаёт main-course -> на странице это mains-grid, filters data-category="main"
    return dishes.map((d) => ({
      ...d,
      category: d.category === "main-course" ? "main" : d.category,
    }));
  }

  try {
    const res = await fetch(DISHES_URL);
    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const dishes = await res.json();
    if (!Array.isArray(dishes)) throw new Error("API вернул не массив");

    // сохраняем как есть (важно для storage/отправки/маппинга main_course_id)
    window.DISHES = dishes;

    // ===== lunch.html =====
    if (PAGE === "lunch") {
      // 1) рендер меню
      if (typeof window.renderMenu === "function") {
        const forRender = normalizeForRender(dishes);
        window.renderMenu(forRender);
      } else {
        console.warn("renderMenu не найден (не подключён renderMenu.js?)");
      }

      // 2) фильтры после рендера
      if (typeof window.initFilters === "function") {
        window.initFilters();
      }

      // 3) корзина/панель
      if (typeof window.initLunchCart === "function") {
        window.initLunchCart(dishes); // важно: dishes НЕ нормализуем
      } else {
        console.warn("initLunchCart не найден (не подключён lunchCart.js?)");
      }
    }

    // ===== checkout.html =====
    if (PAGE === "checkout") {
      if (typeof window.initCheckoutCart === "function") {
        window.initCheckoutCart(dishes);
      } else {
        console.warn("initCheckoutCart не найден (не подключён checkoutCart.js?)");
      }
    }

    // ===== home/index =====
    // ничего не запускаем

  } catch (err) {
    console.error("loadDishes failed:", err);
    // alert("Не удалось загрузить блюда. Проверь интернет или API.");
  }
})();
