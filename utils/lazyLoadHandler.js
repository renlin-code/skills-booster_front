const LAZY_LOAD_OFFSET = 200;

export function lazyLoadHandler(callback) {
  let inside = false;
  window.addEventListener("scroll", function () {
    const insideLastValue = inside;
    inside = window.innerHeight + window.scrollY + LAZY_LOAD_OFFSET >= document.body.offsetHeight;
    if (!inside || inside === insideLastValue) return;
    callback();
  });
}
