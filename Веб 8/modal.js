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
      }
      .fc-modal{
        width: min(720px, 92vw);
        background: #2b2c2f;
        color: #fff;
        border-radius: 22px;
        padding: 28px 32px;
        box-shadow: 0 20px 60px rgba(0,0,0,.35);
      }
      .fc-modal__title{ font-size: 28px; font-weight: 700; margin: 0 0 12px; }
      .fc-modal__text{ font-size: 18px; line-height: 1.35; margin: 0; opacity: .95; }
      .fc-modal__actions{ display:flex; justify-content:flex-end; margin-top: 18px; }
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
    `;
    document.head.appendChild(style);
  }

  window.showModal = function (text, title = "Уведомление") {
    ensureStyles();

    // удалить старое, если было
    document.querySelector(".fc-modal-overlay")?.remove();

    const overlay = document.createElement("div");
    overlay.className = "fc-modal-overlay";

    const box = document.createElement("div");
    box.className = "fc-modal";

    const h = document.createElement("h3");
    h.className = "fc-modal__title";
    h.textContent = title;

    const p = document.createElement("p");
    p.className = "fc-modal__text";
    p.textContent = text;

    const actions = document.createElement("div");
    actions.className = "fc-modal__actions";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "fc-modal__btn";
    btn.textContent = "Закрыть";

    btn.addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });

    actions.appendChild(btn);
    box.append(h, p, actions);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  };
})();
