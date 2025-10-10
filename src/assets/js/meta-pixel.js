document.addEventListener('DOMContentLoaded', function () {
  const consentBanner = document.getElementById('consent');
  const consentKey = 'marketing_consent_v1';
  const userConsent = localStorage.getItem(consentKey);

  // Csak akkor mutatjuk, ha nincs döntés elmentve
  if (!userConsent) {
    consentBanner.style.display = 'block';
  } else {
    consentBanner.style.display = 'none';
    if (userConsent === 'accepted') {
      loadMetaPixel();
    }
  }

  // Elfogadás kezelése
  window.acceptMarketing = function () {
    localStorage.setItem(consentKey, 'accepted');
    consentBanner.style.display = 'none';
    loadMetaPixel();
  };

  // Elutasítás kezelése
  window.declineMarketing = function () {
    localStorage.setItem(consentKey, 'declined');
    consentBanner.style.display = 'none';
  };

  // Meta Pixel dinamikus betöltése
  function loadMetaPixel() {
    if (window.fbq) return; // ne töltsd be duplán
    !(function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)n._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1551020492933025');
    fbq('track', 'PageView');
  }
});
