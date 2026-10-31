/* ===== CONFIGURAÇÃO =====
   WHATSAPP: DDI + DDD + número, só dígitos (ex.: 5585999999999)
   GOOGLE ADS: ID/rótulo da conversão para rastrear cliques no WhatsApp */
var CONFIG = {
  whatsapp: "5500000000000",
  adsConversion: "" // ex.: "AW-XXXXXXXXX/AbCdEfGhIjk"
};

(function () {
  function waUrl(msg) {
    return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg);
  }
  function track(msg) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "whatsapp_click", wa_message: msg, lp_version: "v3" });
    if (CONFIG.adsConversion && typeof window.gtag === "function") {
      window.gtag("event", "conversion", { send_to: CONFIG.adsConversion });
    }
  }

  document.querySelectorAll(".js-wa").forEach(function (a) {
    var msg = a.getAttribute("data-msg") || "Olá! Vim pelo site.";
    a.href = waUrl(msg);
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", function () { track(msg); });
  });

  // Guia de 2 perguntas
  var box = document.querySelector(".guide__box");
  var answers = {};
  var steps = { 1: document.getElementById("step1"), 2: document.getElementById("step2"), 3: document.getElementById("step3") };
  var msgEl = document.getElementById("msg");
  var send = document.getElementById("send");

  function go(n) {
    Object.keys(steps).forEach(function (k) { steps[k].hidden = String(k) !== String(n); });
    box.setAttribute("data-step", n);
    var first = steps[n].querySelector("button, a");
    if (n === 3) steps[3].focus(); else if (first && n !== 1) first.focus();
  }

  box.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.back) { answers = {}; go(1); return; }
    if (b.dataset.q === "b") { answers.b = b.textContent.trim(); go(2); }
    else if (b.dataset.q === "s") {
      answers.s = b.textContent.trim();
      var text = "Olá! Vim pelo site e gostaria de uma orientação.\n\nBenefício: " + answers.b + "\nSituação: " + answers.s;
      msgEl.textContent = text;
      send.href = waUrl(text);
      send.onclick = function () { track(text); };
      go(3);
    }
  });

  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
