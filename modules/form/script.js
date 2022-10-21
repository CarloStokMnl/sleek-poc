function loadScript(src) {
  return new Promise((resolve) => {
    const existingScript = document.querySelector(`script[src="${src}"]`);

    if (existingScript) {
      // eslint-disable-next-line no-undef
      if (typeof hbspt === 'undefined' || typeof hbspt.forms === 'undefined') {
        existingScript.addEventListener('load', () => resolve(existingScript));
      } else {
        resolve(existingScript);
      }
    } else {
      const script = document.createElement('script');

      script.src = src;

      document.body.appendChild(script);
      script.addEventListener('load', () => resolve(script));
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);

        loadScript('https://js.hsforms.net/forms/v2.js').then(() => {
          const config = {
            portalId: entry.target.dataset.hsFormPortalId,
            formId: entry.target.dataset.hsFormFormId,
            target: `#${entry.target.id}`,
          };

          if (
            entry.target.dataset.hsFormRedirectUrl &&
            entry.target.dataset.hsFormRedirectUrl.length
          ) {
            config.redirectUrl = entry.target.dataset.hsFormRedirectUrl;
          }

          // eslint-disable-next-line no-undef
          hbspt.forms.create(config);
        });
      }
    });
  },
  { rootMargin: '0% 0% 25% 0%' },
);

let i = 0;

document.querySelectorAll('[data-hs-form]').forEach((el) => {
  if (!el.id) {
    // eslint-disable-next-line no-param-reassign, no-plusplus
    el.id = `sleek-hs-form-${i++}`;
  }

  observer.observe(el);
});
