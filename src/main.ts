// get all elements with class ticking-ui
const tickingElements = document.getElementsByClassName("ticking-ui");

function primaryColor() {
  return "#ff0000ff";
}

function time() {
  return new Date().getTime();
}

function screenWidth() {
  return window.innerWidth;
}

function screenHeight() {
  return window.innerHeight;
}

function isTablet() {
  return window.innerWidth > 600;
}

function htmlDecode(value: string) {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#47;/g, "/")
    .replace(/&#40;/g, "(")
    .replace(/&#41;/g, ")")
    .replace(/&#123;/g, "{")
    .replace(/&#125;/g, "}")
    .replace(/&#91;/g, "[")
    .replace(/&#93;/g, "]")
    .replace(/&#35;/g, "#")
    .replace(/&#37;/g, "%")
    .replace(/&#59;/g, ";")
    .replace(/&#43;/g, "+")
    .replace(/&#45;/g, "-")
    .replace(/&#42;/g, "*")
    .replace(/&#64;/g, "@")
    .replace(/&#36;/g, "$")
    .replace(/&#95;/g, "_");
  // 添加更多实体字符的解码规则
}

// loop through all elements
function build(parent: HTMLElement) {
  if (parent.tagName != "DIV") {
    // get all attributes
    const attributes = parent.attributes;

    const attributesMap = {} as any;
    for (const attribute of attributes) {
      attributesMap[attribute.name] = attribute.value;
    }

    for (const attribute of attributes) {
      if (attribute.name.startsWith(":")) {
        const name = attribute.name.slice(1);

        let value = "";
        console.log(`eval(${htmlDecode(attribute.value)})`);
        try {
          // @ts-ignore
          function width() {
            return window.innerWidth;
          }
          // @ts-ignore
          function height() {
            return window.innerHeight;
          }

          value = eval(htmlDecode(attribute.value));
          console.log(`eval(${htmlDecode(attribute.value)}) = ${value}`);
        } catch (e) {
          console.log(e);
        }
        attributesMap[name] = value;
        parent.setAttribute(name, value);
      }
    }

    if (attributesMap["if"] == false) {
      parent.style.setProperty("display", "none");
      return;
    }

    const value = attributesMap["value"];
    const all = attributesMap["all"];
    const shape = attributesMap["shape"];
    let color = attributesMap["color"];
    color = ARGBStringToRGBA(color);
    const shadows = attributesMap["shadows"];
    let width = attributesMap["width"];
    let height = attributesMap["height"];
    const top = attributesMap["top"];
    const right = attributesMap["right"];
    const bottom = attributesMap["bottom"];
    const left = attributesMap["left"];
    const x = attributesMap["x"];
    const y = attributesMap["y"];
    const scale = attributesMap["scale"];
    const originx = attributesMap["originx"];
    const originy = attributesMap["originy"];
    const alignment = attributesMap["alignment"];
    const direction = attributesMap["direction"];
    const content = attributesMap["content"];
    const borderradius = attributesMap["borderradius"];

    const mainaxisalignment = attributesMap["mainaxisalignment"];

    const crossaxisalignment = attributesMap["crossaxisalignment"];

    switch (mainaxisalignment) {
      case "start":
        parent.style.setProperty("justify-content", "flex-start");
        break;
      case "end":
        parent.style.setProperty("justify-content", "flex-end");
        break;
      case "center":
        parent.style.setProperty("justify-content", "center");
        break;
      case "spaceBetween":
        parent.style.setProperty("justify-content", "space-between");
        break;
      case "spaceAround":
        parent.style.setProperty("justify-content", "space-around");
        break;
      case "spaceEvenly":
        parent.style.setProperty("justify-content", "space-evenly");
        break;
    }

    switch (parent.tagName.toLowerCase()) {
      case "padding":
        if (all) {
          parent.style.setProperty("padding", all);
          break;
        }
        if (top) {
          parent.style.setProperty("padding-top", top);
        }
        if (right) {
          parent.style.setProperty("padding-right", right);
        }
        if (bottom) {
          parent.style.setProperty("padding-bottom", bottom);
        }
        if (left) {
          parent.style.setProperty("padding-left", left);
        }

        break;
      case "color":
        let c = content ?? value ?? parent.innerHTML;
        // 转换为rgba
        c = ARGBStringToRGBA(c);
        parent.style.setProperty("background-color", c);
        parent.innerHTML = "";
        break;
      case "spacer":
        parent.style.setProperty("flex", "1");
        break;
      case "arcclipper":
        const start = attributesMap["start"];
        const sweep = attributesMap["sweep"];

        const startAngle = ((start ?? 0) / 180) * Math.PI;
        const sweepAngle = ((sweep ?? 0) / 180) * Math.PI;

        // 描绘出100个点，然后连接起来，使用clip-path，polygon

        const points = ["50% 50%"];
        const step = sweepAngle / 100;
        for (let i = 0; i <= 100; i++) {
          const angle = startAngle + step * i;
          const x = Math.cos(angle) * 50 + 50;
          const y = Math.sin(angle) * 50 + 50;
          points.push(`${x}% ${y}%`);
        }

        parent.style.setProperty("clip-path", `polygon(${points.join(",")})`);

        break;
      case "scale":
        if (originx || originy) {
          parent.style.setProperty(
            "transform-origin",
            `${originx ?? "0"} ${originy ?? "0"}`
          );
        }
        if (x || y) {
          parent.style.setProperty(
            "transform",
            `scale(${x ?? "1"}, ${y ?? "1"})`
          );
        } else {
          parent.style.setProperty("transform", `scale(${scale ?? "1"})`);
        }

        if (alignment) {
          parent.style.setProperty("align-self", alignment);
        }

        break;

      case "rotate":
        if (x || y) {
          parent.style.setProperty(
            "transform-origin",
            `${x ?? "0"} ${y ?? "0"}`
          );
        }
        if (alignment) {
          switch (alignment) {
            case "center":
              parent.style.setProperty("transform-origin", "50% 50%");
              break;
          }
        }
        const angle = attributesMap["angle"];
        parent.style.setProperty("transform", `rotate(${angle}deg)`);

        break;
      case "align":
        switch (alignment) {
          case "topLeft":
            parent.style.setProperty("align-self", "flex-start");
            parent.style.setProperty("justify-self", "flex-start");
            break;
          case "topCenter":
            parent.style.setProperty("align-self", "flex-start");
            parent.style.setProperty("justify-self", "center");
            break;
          case "topRight":
            parent.style.setProperty("align-self", "flex-start");
            parent.style.setProperty("justify-self", "flex-end");
            break;
          case "centerLeft":
            parent.style.setProperty("align-self", "center");
            parent.style.setProperty("justify-self", "flex-start");
            break;
          case "center":
            parent.style.setProperty("align-self", "center");
            parent.style.setProperty("justify-self", "center");
            break;
          case "centerRight":
            parent.style.setProperty("align-self", "center");
            parent.style.setProperty("justify-self", "flex-end");
            break;
          case "bottomLeft":
            parent.style.setProperty("align-self", "flex-end");
            parent.style.setProperty("justify-self", "flex-start");
            break;
          case "bottomCenter":
            parent.style.setProperty("align-self", "flex-end");
            parent.style.setProperty("justify-self", "center");
            break;
          case "bottomRight":
            parent.style.setProperty("align-self", "flex-end");
            parent.style.setProperty("justify-self", "flex-end");
            break;

          default:
            parent.style.setProperty("align-self", alignment);
            parent.style.setProperty("justify-self", alignment);
            break;
        }
        break;
      case "square":
        const size = attributesMap["size"] ?? attributesMap["dimension"];
        parent.style.setProperty("width", size);
        parent.style.setProperty("height", size);
        break;
      case "flex":
        // return Flex(
        //   direction: attributes['direction'] ?? Axis.horizontal,
        //   mainAxisAlignment:
        //       attributes['mainaxisalignment'] ?? MainAxisAlignment.center,
        //   crossAxisAlignment:
        //       attributes['crossaxisalignment'] ?? CrossAxisAlignment.center,
        //   mainAxisSize: attributes['mainaxissize'] ?? MainAxisSize.max,
        //   clipBehavior: attributes['clipbehavior'] ?? Clip.none,
        //   children: children,
        // );
        // parent.style.setProperty(
        //   "flex-direction",
        //   direction == "horizontal" ? "row" : "column" ?? "row"
        // );
        break;
      case "border":
        parent.style.setProperty("border-width", width ?? "0");
        parent.style.setProperty("border-color", color ?? "black");
        parent.style.setProperty("border-style", "solid");
        if (shape === "circle") {
          parent.style.setProperty("border-radius", "50%");
          break;
        }
        if (shadows) {
          parent.style.setProperty("box-shadow", shadows);
        }

        break;
      case "box":
      case "container":
        if (shape === "circle") {
          parent.style.setProperty("border-radius", "50%");
        }
        if (borderradius) {
          parent.style.setProperty("border-radius", borderradius);
        }
        if (color) {
          parent.style.setProperty("background-color", color);
        }
        if (shadows) {
          parent.style.setProperty("box-shadow", shadows);
        }
        if (width) {
          parent.style.setProperty("width", width);
        }
        if (height) {
          parent.style.setProperty("height", height);
        }
        break;
      case "sizedbox":
      case "size":
        if (width) {
          parent.style.setProperty("width", width);
        }
        if (height) {
          parent.style.setProperty("height", height);
        }
        break;
      default:
        for (const attribute of attributes) {
          switch (attribute.name) {
            case "content":
              parent.innerHTML = attribute.value;
              break;
            case "alignment":
              switch (parent.tagName.toLowerCase()) {
                case "stack":
                  parent.style.setProperty("align-items", attribute.value);
                  break;
              }
              break;
          }
          attributesMap[attribute.name] = attribute.value;
          parent.style.setProperty(attribute.name, attribute.value);
        }
    }
  }
  // get all children
  const children = parent.children;
  // loop through all children
  for (const child of children) {
    build(child as HTMLElement);
  }
  // changeTagName(parent, "div");
}

function changeTagName(element: HTMLElement, newTagName: string) {
  // 创建新的元素
  var newElement = document.createElement(newTagName);

  // 复制旧元素的属性
  for (var i = 0; i < element.attributes.length; i++) {
    newElement.setAttribute(
      element.attributes[i].name,
      element.attributes[i].value
    );
  }

  // 复制旧元素的子节点
  while (element.firstChild) {
    newElement.appendChild(element.firstChild);
  }

  // 替换旧元素
  element.parentNode?.replaceChild(newElement, element);
}

for (const parent of tickingElements) {
  const children = parent.children;
  // loop through all children
  for (const child of children) {
    build(child as HTMLElement);
  }
}

function ARGBStringToRGBA(argb: string) {
  if (argb == undefined) return undefined;
  if (argb.length == 9) {
    const a = parseInt(argb.slice(1, 3), 16) / 255;
    const r = parseInt(argb.slice(3, 5), 16);
    const g = parseInt(argb.slice(5, 7), 16);
    const b = parseInt(argb.slice(7, 9), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  } else {
    return argb;
  }
}
