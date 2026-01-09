// api.js
(async function () {
  const API_URL = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";

  // Приводим category из API к тем, что ждёт твой проект
  const CATEGORY_MAP = {
    soup: "soup",
    drink: "drink",
    salad: "salad",
    dessert: "dessert",
    "main-course": "main",   // ВОТ ОНО!
  };

  async function loadDishes() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("API error: " + res.status);

    const data = await res.json();

    // Нормализация категорий + страховка по полям
    const normalized = data
      .map((d) => ({
        ...d,
        category: CATEGORY_MAP[d.category] || d.category, // если вдруг новое значение
      }))
      // оставляем только те, что реально поддерживаем
      .filter((d) => ["soup", "main", "salad", "drink", "dessert"].includes(d.category));

    // теперь твои старые скрипты будут работать как раньше
    window.DISHES = normalized;

    // ВАЖНО: renderMenu.js и cart.js у тебя сейчас IIFE,
    // они сами запускаются при загрузке файла и уже могли отработать раньше.
    // Поэтому тут надо просто перезагрузить страницу после правки api.js,
    // либо (лучше) перевести их на функции renderMenu()/initCart().
    // Если у тебя уже есть renderMenu(...) и initCart(...), то:

    if (typeof renderMenu === "function") renderMenu(window.DISHES);
    if (typeof initCart === "function") initCart(window.DISHES);
    if (typeof initFilters === "function") initFilters();
    if (typeof initLunchCheck === "function") initLunchCheck(); // если у тебя так называется проверка
  }

  loadDishes().catch(console.error);
})();


