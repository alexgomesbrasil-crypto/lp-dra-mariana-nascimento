/* WhatsApp do escritório: DDI + DDD + número, só dígitos */
var CONFIG = {
  whatsapp: "5544991655847",
  mensagem: "Olá! Te encontrei no Google, tenho algumas dúvidas. Poderia me ajudar?"
};

(function () {
  var url = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.mensagem);

  document.querySelectorAll(".js-wa").forEach(function (a) {
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", function () {
      // Evento usado pelo Google Tag Manager para registrar a conversão
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "whatsapp_click", wa_message: CONFIG.mensagem, cta_local: a.getAttribute("data-cta") || "", lp_version: "direta" });
    });
  });

  // Barra fixa aparece depois que o botão do topo sai da tela
  var sticky = document.querySelector(".sticky");
  var heroBtn = document.querySelector(".hero .btn");
  if (sticky && heroBtn && "IntersectionObserver" in window) {
    new IntersectionObserver(function (e) {
      sticky.classList.toggle("is-on", !e[0].isIntersecting);
    }).observe(heroBtn);
  } else if (sticky) {
    sticky.classList.add("is-on");
  }
})();
