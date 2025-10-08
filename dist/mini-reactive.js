(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MiniReactive = {}));
})(this, (function (exports) { 'use strict';

  /**
   * MiniReactive — A tiny 2-way data binding library
   * ------------------------------------------------
   * Usage Example:
   *   import { createReactive } from './mini-reactive/index.js';
   *
   *   const state = createReactive({ name: 'Alice' });
   *   state.name = 'Bob'; // instantly updates DOM
   *
   *   In HTML:
   *     <input v-model="name" />
   *     <span data-bind="name"></span>
   */

  function createReactive(data = {}) {
    const bindings = {};

    document.querySelectorAll("[data-bind]").forEach((el) => {
      const prop = el.getAttribute("data-bind");
      (bindings[prop] ||= []).push(el);
    });

    document.querySelectorAll("[v-model]").forEach((input) => {
      const prop = input.getAttribute("v-model");
      (bindings[prop] ||= []).push(input);

      input.addEventListener("input", (e) => {
        reactiveData[prop] = e.target.value;
      });
    });

    function updateView(prop, value) {
      if (!bindings[prop]) return;
      bindings[prop].forEach((el) => {
        if (el.hasAttribute("v-model")) {
          if (el.value !== value) el.value = value;
        } else {
          el.textContent = value ?? "";
        }
      });
    }

    const reactiveData = new Proxy(data, {
      set(target, prop, value) {
        target[prop] = value;
        updateView(prop, value);
        return true;
      },
    });

    Object.keys(data).forEach((key) => updateView(key, data[key]));

    return reactiveData;
  }

  var index = { createReactive };

  exports.createReactive = createReactive;
  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
