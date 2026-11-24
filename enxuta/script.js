/* ===== CONFIGURAÇÃO =====
   WHATSAPP: DDI + DDD + número, só dígitos (ex.: 5585999999999)
   GOOGLE ADS: ID/rótulo da conversão para rastrear cliques no WhatsApp */
var CONFIG = {
  whatsapp: "5544991655847",
  adsConversion: "" // ex.: "AW-XXXXXXXXX/AbCdEfGhIjk"
};

(function () {
  document.querySelectorAll(".js-wa").forEach(function (a) {
    var msg = a.getAttribute("data-msg") || "Olá! Vim pelo site.";
    a.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg);
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", function () {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "whatsapp_click", wa_message: msg, lp_version: "v2" });
      if (CONFIG.adsConversion && typeof window.gtag === "function") {
        window.gtag("event", "conversion", { send_to: CONFIG.adsConversion });
      }
    });
  });

  // Abas "Qual é o seu momento?"
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    tab.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { select(t); });
    t.addEventListener("keydown", function (e) {
      var n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (n) { e.preventDefault(); var nt = tabs[(i + n + tabs.length) % tabs.length]; select(nt); nt.focus(); }
    });
  });

  // Carrossel de avaliações
  var car = document.querySelector(".car");
  var btns = document.querySelectorAll(".car__btn");
  if (car && btns.length) {
    var update = function () {
      var max = car.scrollWidth - car.clientWidth - 2;
      btns[0].disabled = car.scrollLeft <= 2;
      btns[1].disabled = car.scrollLeft >= max;
    };
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var slide = car.querySelector(".slide");
        var step = slide ? slide.getBoundingClientRect().width + 16 : car.clientWidth;
        car.scrollBy({ left: step * Number(b.dataset.dir), behavior: "smooth" });
      });
    });
    car.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
