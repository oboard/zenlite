const zenliter = document.getElementById("zenlite");
class ZenLiter {
  pages = {};
  debug = !1;
  constructor(r) {
    this.pages = r;
    const { debug: i } = this;
    window.addEventListener("load", async function(l) {
      let a = window.location.pathname;
      a == "/" && (a = "/index");
      let n = r[`./pages${a}.zlt`];
      n || (a += a.endsWith("/") ? "index" : "/index", n = r[`./pages${a}.zlt`]), i && console.debug(`ZenRoute -> ${a}`), zenliter && (zenliter.innerHTML = n, build(zenliter));
    });
  }
}
function htmlDecode(t) {
  return String(t).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#47;/g, "/").replace(/&#40;/g, "(").replace(/&#41;/g, ")").replace(/&#123;/g, "{").replace(/&#125;/g, "}").replace(/&#91;/g, "[").replace(/&#93;/g, "]").replace(/&#35;/g, "#").replace(/&#37;/g, "%").replace(/&#59;/g, ";").replace(/&#43;/g, "+").replace(/&#45;/g, "-").replace(/&#42;/g, "*").replace(/&#64;/g, "@").replace(/&#36;/g, "$").replace(/&#95;/g, "_");
}
function build(parent) {
  if (typeof parent == "string" && (parent = document.querySelector(parent)), parent.tagName == "SCRIPT") {
    eval(parent.innerHTML);
    return;
  }
  const attributes = parent.attributes, attributesMap = {};
  for (const t of attributes)
    attributesMap[t.name] = t.value;
  for (const attribute of attributes)
    if (attribute.name.startsWith(":")) {
      const name = attribute.name.slice(1);
      let value = "";
      try {
        function width() {
          return window.innerWidth;
        }
        function height() {
          return window.innerHeight;
        }
        value = eval(htmlDecode(attribute.value));
      } catch (t) {
        console.log(t);
      }
      attributesMap[name] = value, parent.setAttribute(name, value);
    } else if (attribute.name.startsWith("@")) {
      attribute.name == "@click" && parent.style.setProperty("cursor", "pointer");
      const name = attribute.name.slice(1), value = attribute.value;
      parent.addEventListener(name, (e) => {
        try {
          eval(value)(e);
        } catch (t) {
          console.log(t);
        }
      }), parent.removeAttribute(attribute.name);
    }
  if (attributesMap.if == !1) {
    parent.style.setProperty("display", "none");
    return;
  }
  for (const t of attributes) {
    switch (t.name) {
      case "content":
        parent.innerHTML = t.value;
        break;
    }
    attributesMap[t.name] = t.value, parent.style.setProperty(t.name, t.value);
  }
  const children = parent.children;
  for (const t of children)
    build(t);
}
export {
  ZenLiter,
  build
};
