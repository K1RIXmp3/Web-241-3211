// modal.js
(function () {
  function ensureStyles() {
    if (document.getElementById("fc-modal-styles")) return;

    const style = document.createElement("style");
    style.id = "fc-modal-styles";
    style.textContent = `
      .fc-modal-overlay{
        position: fixed; inset: 0;
        background: rgba(0,0,0,.35);
        display: flex; align-items: center; justify-content: center;
        z-index: 9999;
        padding: 20px;
      }
      .fc-modal{
        width: min(820px, 94vw);
        background: #2b2c2f;
        color: #fff;
        border-radius: 22px;
        padding: 22px 26px 18px;
        box-shadow: 0 20px 60px rgba(0,0,0,.35);
        position: relative;
      }
      .fc-modal__head{
        display:flex;
        align-items:flex-start;
        justify-content:space-between;
        gap: 12px;
        margin-bottom: 10px;
      }
      .fc-modal__title{
        font-size: 28px;
        font-weight: 700;
        margin: 0;
      }
      .fc-modal__close{
        width: 42px;
        height: 42px;
        border-radius: 12px;
        border: 2px solid rgba(255,255,255,.85);
        background: transparent;
        color: #fff;
        cursor: pointer;
        font-size: 22px;
        line-height: 1;
        display:flex;
        align-items:center;
        justify-content:center;
        transition: .2s;
      }
      .fc-modal__close:hover{
        background: rgba(255,255,255,.08);
      }

      .fc-modal__content{
        margin-top: 6px;
        color: rgba(255,255,255,.95);
        font-size: 18px;
        line-height: 1.35;
      }
      .fc-modal__text{ margin: 0; }

      .fc-modal__actions{
        display:flex;
        justify-content:flex-end;
        gap: 12px;
        margin-top: 18px;
        flex-wrap: wrap;
      }

      .fc-modal__btn{
        border: 2px solid #fff;
        background: #f2f2f2;
        color: #111;
        border-radius: 12px;
        padding: 10px 22px;
        font-weight: 700;
        cursor: pointer;
        transition: .2s;
      }
      .fc-modal__btn:hover{ background:#111; color:#fff; }

      .fc-modal__btn--primary{
        background: #2ea44f;
        border-color: #2ea44f;
        color: #fff;
      }
      .fc-modal__btn--primary:hover{
        background: #238636;
        border-color: #238636;
        color: #fff;
      }

      .fc-modal__btn--danger{
        background: #d1242f;
        border-color: #d1242f;
        color: #fff;
      }
      .fc-modal__btn--danger:hover{
        background: #b31f28;
        border-color: #b31f28;
        color: #fff;
      }

      /* аккуратная база для форм внутри модалки */
      .fc-modal__content label{ display:block; margin: 10px 0 6px; font-weight: 700; }
      .fc-modal__content input,
      .fc-modal__content textarea,
      .fc-modal__content select{
        width: 100%;
        box-sizing: border-box;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,.25);
        background: rgba(255,255,255,.08);
        color: #fff;
        outline: none;
      }
      .fc-modal__content input::placeholder,
      .fc-modal__content textarea::placeholder{
        color: rgba(255,255,255,.6);
      }
      .fc-modal__content textarea{ min-height: 88px; resize: vertical; }
      .fc-modal__row{
        display:grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      @media (max-width: 640px){
        .fc-modal__row{ grid-template-columns: 1fr; }
      }
      .fc-modal__hr{
        height: 1px;
        background: rgba(255,255,255,.15);
        margin: 14px 0;
      }
    `;
    document.head.appendChild(style);
  }

  function closeModal() {
    document.querySelector(".fc-modal-overlay")?.remove();
  }

  // Новый универсальный вариант: showModal({ title, text, html, buttons, closeOnOverlay })
  function showModalAdvanced(options) {
    ensureStyles();
    closeModal();

    const {
      title = "Уведомление",
      text = "",
      html = "",
      buttons = null,
      closeOnOverlay = true,
    } = options || {};

    const overlay = document.createElement("div");
    overlay.className = "fc-modal-overlay";

    const box = document.createElement("div");
    box.className = "fc-modal";

    const head = document.createElement("div");
    head.className = "fc-modal__head";

    const h = document.createElement("h3");
    h.className = "fc-modal__title";
    h.textContent = title;

    const x = document.createElement("button");
    x.type = "button";
    x.className = "fc-modal__close";
    x.setAttribute("aria-label", "Закрыть");
    x.textContent = "×";
    x.addEventListener("click", closeModal);

    head.append(h, x);

    const content = document.createElement("div");
    content.className = "fc-modal__content";

    // либо text, либо html
    if (html) {
      content.innerHTML = html;
    } else {
      const p = document.createElement("p");
      p.className = "fc-modal__text";
      p.textContent = text;
      content.appendChild(p);
    }

    const actions = document.createElement("div");
    actions.className = "fc-modal__actions";

    // кнопки
    const btns = Array.isArray(buttons) && buttons.length
      ? buttons
      : [{ text: "Закрыть", variant: "default", onClick: closeModal }];

    btns.forEach((b) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fc-modal__btn";

      if (b.variant === "primary") btn.classList.add("fc-modal__btn--primary");
      if (b.variant === "danger") btn.classList.add("fc-modal__btn--danger");

      btn.textContent = b.text || "Ок";

      btn.addEventListener("click", async () => {
        // если обработчик вернёт false — модалку НЕ закрываем
        if (typeof b.onClick === "function") {
          const r = await b.onClick();
          if (r === false) return;
        }
        if (!b.keepOpen) closeModal();
      });

      actions.appendChild(btn);
    });

    if (closeOnOverlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
      });
    }

    box.append(head, content, actions);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    return { close: closeModal, overlay, box };
  }

  // ===== ПУБЛИЧНЫЕ ФУНКЦИИ =====

  // 1) backward-compatible: showModal("текст", "Заголовок")
  // 2) advanced: showModal({ ...options... })
  window.showModal = function (arg1, arg2) {
    // advanced
    if (arg1 && typeof arg1 === "object") {
      return showModalAdvanced(arg1);
    }
    // simple
    const text = String(arg1 ?? "");
    const title = arg2 || "Уведомление";
    return showModalAdvanced({ title, text });
  };

  // отдельное имя (если хочешь использовать явно)
  window.openModal = showModalAdvanced;
  window.closeModal = closeModal;
})();
