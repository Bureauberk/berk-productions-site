// Cookie banner plus Microsoft Clarity. js/consent.js loads Clarity only after the visitor accepts,
// and then only once the page has loaded and the browser is idle.
export const clarityTag = (id) => `<script src="/js/consent.js" defer${id ? ` data-clarity="${id}"` : ''}></script>`;
