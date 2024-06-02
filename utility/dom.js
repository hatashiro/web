import * as string from './string.js';

export function select(selectors, $parent=document) {
  return $parent.querySelector(selectors);
}

export function selectAll(selectors, $parent=document) {
  return $parent.querySelectorAll(selectors);
}

export function setAttribute($el, key, value) {
  if (key === 'classList' && Array.isArray(value)) {
    $el.className = '';  // Empty.
    value.forEach(className => $el.classList.add(className));
  } else if (key === 'style' && value instanceof Object) {
    for (const [k, v] of Object.entries(value)) {
      $el.style[k] = Number.isFinite(v) ? `${v}px` : v;
    }
  } else if (key.startsWith('on') && value instanceof Function) {
    $el.addEventListener(key.substr(2), value);
  } else {
    $el[key] = value;
  }
}

export function create(tagName, attributes={}, children=[]) {
  const $el = document.createElement(tagName);

  for (const [k, v] of Object.entries(attributes)) {
    setAttribute($el, k, v);
  }

  if (!Array.isArray(children)) {
    children = [children];
  }

  for (const child of children) {
    const childNode = string.isString(child) ? new Text(child) : child;
    $el.appendChild(childNode);
  }

  return $el;
}

// A utility proxy.
export const $ = new Proxy(select, {
  get(target, prop, receiver) {
    switch (prop) {
      case 'all':
        return selectAll;
      default:
        return create.bind(receiver, prop);
    }
  },
});
