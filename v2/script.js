/* ===== CONFIGURAÇÃO =====
   WHATSAPP: DDI + DDD + número, só dígitos (ex.: 5585999999999)
   GOOGLE ADS: ID/rótulo da conversão para rastrear cliques no WhatsApp */
var CONFIG = {
  whatsapp: "5500000000000",
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

  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
