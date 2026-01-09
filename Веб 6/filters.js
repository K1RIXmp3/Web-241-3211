// filters.js
// Фильтрация карточек в каждой категории по кнопкам data-kind
// Поддерживает "toggle": повторный клик снимает фильтр

(function () {
  const filtersBlocks = document.querySelectorAll(".filters");
  if (!filtersBlocks.length) return;

  filtersBlocks.forEach((block) => {
    const category = block.dataset.category; // soup/main/salad/drink/dessert
    if (!category) return;

    // Какой grid соответствует категории
    const gridByCategory = {
      soup: "soups-grid",
      main: "mains-grid",
      salad: "salads-grid",
      drink: "drinks-grid",
      dessert: "desserts-grid",
    };

    const grid = document.getElementById(gridByCategory[category]);
    if (!grid) return;

    const buttons = block.querySelectorAll(".filter-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const kind = btn.dataset.kind;

        // если кликнули по уже активной — снимаем фильтр
        const isActive = btn.classList.contains("active");

        // снять active со всех
        buttons.forEach((b) => b.classList.remove("active"));

        if (isActive) {
          // показать все карточки
          showAll(grid);
          return;
        }

        // иначе активируем и фильтруем
        btn.classList.add("active");
        filterGrid(grid, kind);
      });
    });
  });

  function showAll(grid) {
    const cards = grid.querySelectorAll(".dish-item");
    cards.forEach((card) => {
      card.classList.remove("hidden");
    });
  }

  function filterGrid(grid, kind) {
    const cards = grid.querySelectorAll(".dish-item");
    cards.forEach((card) => {
      const cardKind = card.dataset.kind; // берётся из data-kind карточки
      if (cardKind === kind) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  }
})();
