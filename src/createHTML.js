var createHTML = (function () {
  function displayHTML(arg) {
    if (Array.isArray(arg)) {
      return createElementFromArray(arg)
    }
    if (typeof arg === 'string') {
      return createElementFromString(arg)
    }
  }
  function createElementFromString(s) {
    var div = document.createElement('div');
    div.innerHTML = s.trim();
    return div.firstChild;
  }
  function createElementFromArray(arr) {
    const d = document;
    if (typeof arr === "string") {
      return d.createTextNode(arr);
    }
    var tag = arr[0];
    var maybeAttrs = arr[1];
    var rest = Array.prototype.slice.call(arr, 2);
    var attrs = {};
    var children = rest;
    if (maybeAttrs && typeof maybeAttrs === "object" && !Array.isArray(maybeAttrs)) {
      attrs = maybeAttrs;
    } else if (maybeAttrs !== undefined) {
      children = [maybeAttrs].concat(rest);
    }
    if (attrs.style && (attrs.id || attrs.class)) {
      var selector = "";
      if (attrs.id) {
        selector = "#" + attrs.id;
      } else if (attrs.class) {
        selector = "." + attrs.class;
      }
      var styleContent = selector + " { " + attrs.style + " }";
      var styleEl = d.createElement("style");
      styleEl.textContent = styleContent;
      d.head.appendChild(styleEl);
    }
    var el = d.createElement(tag);
    var attrEntries = Object.keys(attrs);
    for (var i = 0; i < attrEntries.length; i++) {
      var key = attrEntries[i];
      var value = attrs[key];
      el.setAttribute(key, value);
    }
    for (var j = 0; j < children.length; j++) {
      var child = children[j];
      el.appendChild(createElementFromArray(child));
    }
    return el;
  }
  return displayHTML;
})();
