/* ===== CONFIGURAÇÃO =====
   WHATSAPP: DDI + DDD + número, só dígitos (ex.: 5585999999999)
   GOOGLE ADS: preencha o ID e o rótulo da conversão para rastrear cliques no WhatsApp */
var CONFIG = {
  whatsapp: "5500000000000",
  adsConversion: "" // ex.: "AW-XXXXXXXXX/AbCdEfGhIjk"
};

(function () {
  // Monta os links do WhatsApp com a mensagem de cada botão
  var links = document.querySelectorAll(".js-wa");
  links.forEach(function (a) {
    var msg = a.getAttribute("data-msg") || "Olá! Vim pelo site.";
    a.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg);
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", function () {
      // Evento para Google Ads / GA4 / GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "whatsapp_click", wa_message: msg });
      if (CONFIG.adsConversion && typeof window.gtag === "function") {
        window.gtag("event", "conversion", { send_to: CONFIG.adsConversion });
      }
    });
  });

  // Barra fixa do WhatsApp aparece depois que o topo sai da tela
  var sticky = document.querySelector(".sticky-wa");
  var hero = document.querySelector(".hero");
  if (sticky && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      sticky.classList.toggle("is-visible", !entries[0].isIntersecting);
    }).observe(hero);
  } else if (sticky) {
    sticky.classList.add("is-visible");
  }

  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
