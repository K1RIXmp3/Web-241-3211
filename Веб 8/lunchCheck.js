// lunchCheck.js

(function () {
  const form = document.querySelector("form.order-form");
  if (!form) return;

  // читаем значения из hidden inputs (они у тебя уже есть в HTML)
  function getChosen() {
    const soup = document.getElementById("chosen_soup")?.value?.trim();
    const main = document.getElementById("chosen_main")?.value?.trim();
    const salad = document.getElementById("chosen_salad")?.value?.trim();   // если у тебя салат/стартер так называется
    const drink = document.getElementById("chosen_drink")?.value?.trim();
    const dessert = document.getElementById("chosen_dessert")?.value?.trim(); // если десерт добавлял в cart.js

    return {
      soup: !!soup,
      main: !!main,
      salad: !!salad,
      drink: !!drink,
      dessert: !!dessert,
    };
  }

  // 5 допустимых комбо (десерт НЕ обязателен)
  function isValidCombo(s) {
    const { soup, main, salad, drink } = s;

    // во всех комбо напиток обязателен
    if (!drink) return false;

    // 1) soup + main + salad + drink
    if (soup && main && salad) return true;

    // 2) soup + main + drink
    if (soup && main && !salad) return true;

    // 3) soup + salad + drink
    if (soup && !main && salad) return true;

    // 4) main + salad + drink
    if (!soup && main && salad) return true;

    // 5) main + drink
    if (!soup && main && !salad) return true;

    return false;
  }

  function pickMessage(state) {
    const { soup, main, salad, drink, dessert } = state;
    const any = soup || main || salad || drink || dessert;

    // 1) ничего не выбрано
    if (!any) return "Ничего не выбрано. Выберите блюда для заказа";

    // 3) выбран суп, но нет главное/салат
    if (soup && !main && !salad) return "Выберите главное блюдо/салат/стартер";

    // 4) выбран салат, но нет суп/главное
    if (salad && !soup && !main) return "Выберите суп или главное блюдо";

    // 5) выбран напиток/десерт, но нет главного
    if ((drink || dessert) && !main && !soup && !salad) return "Выберите главное блюдо";

    // 2) не хватает напитка (в остальных случаях)
    if (!drink) return "Выберите напиток";

    // если напиток есть, но комбо всё равно не сходится — чаще всего не хватает главного/салата/супа
    // (дадим самое понятное)
    if (!main && !soup && salad) return "Выберите суп или главное блюдо";
    if (!main && soup && !salad) return "Выберите главное блюдо/салат/стартер";
    if (!main) return "Выберите главное блюдо";

    return "Проверьте состав ланча";
  }

  function ensureModalStyles() {
    if (document.getElementById("lr6-modal-styles")) return;

    const st = document.createElement("style");
    st.id = "lr6-modal-styles";
    st.textContent = `
      .lr6-modal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
      .lr6-modal__box {
        width: min(560px, calc(100% - 40px));
        background: #fff;
        border: 2px solid #111;
        padding: 40px 30px;
        text-align: center;
      }
      .lr6-modal__text {
        font-size: 28px;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 30px;
      }
      .lr6-modal__btn {
        padding: 14px 34px;
        font-size: 20px;
        border: 2px solid #111;
        border-radius: 18px;
        background: #fff;
        cursor: pointer;
        transition: 0.2s ease;
      }
      .lr6-modal__btn:hover {
        background: #111;
        color: #fff;
      }
    `;
    document.head.appendChild(st);
  }

  function showModal(message) {
    ensureModalStyles();

    // если уже есть — удалим старое (каждый раз создаём динамически)
    document.querySelector(".lr6-modal")?.remove();

    const overlay = document.createElement("div");
    overlay.className = "lr6-modal";

    const box = document.createElement("div");
    box.className = "lr6-modal__box";

    const text = document.createElement("div");
    text.className = "lr6-modal__text";
    text.innerHTML = message.replace(/\n/g, "<br>");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lr6-modal__btn";
    btn.textContent = "Окей 👌";

    btn.addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.remove();
    });

    box.appendChild(text);
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  form.addEventListener("submit", (e) => {
    const state = getChosen();

    if (!isValidCombo(state)) {
      e.preventDefault();
      showModal(pickMessage(state));
    }
  });
})();
