// Mobile navigation toggle
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();

// Footer year
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Gallery lightbox
(function () {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const box = document.querySelector(".lightbox");
  if (!items.length || !box) return;

  const img = box.querySelector("img");
  const cap = box.querySelector("figcaption");
  let index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    const item = items[index];
    img.src = item.dataset.full;
    img.alt = item.querySelector("img").alt;
    cap.innerHTML =
      "<strong>" + item.dataset.title + "</strong> &middot; <span>" + item.dataset.type + "</span>";
  }

  function open(i) {
    show(i);
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
    box.querySelector(".lb-close").focus();
  }

  function close() {
    box.classList.remove("is-open");
    document.body.style.overflow = "";
    items[index].focus();
  }

  items.forEach(function (item, i) {
    item.addEventListener("click", function () {
      open(i);
    });
  });

  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", function () {
    show(index - 1);
  });
  box.querySelector(".lb-next").addEventListener("click", function () {
    show(index + 1);
  });
  box.addEventListener("click", function (e) {
    if (e.target === box) close();
  });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
})();

// Demo contact form — nothing is sent anywhere
(function () {
  const form = document.querySelector("#estimate-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const note = document.querySelector(".form-success");
    note.classList.add("is-visible");
    form.reset();
    note.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
