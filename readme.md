# MiniReactive ⚡️

A tiny, zero-dependency, 2-way data binding library for simple projects.

MiniReactive provides a straightforward way to create reactive state in your vanilla JavaScript projects. It uses a `Proxy` object to automatically update the DOM when your data changes and listens for input events to update your state, achieving simple two-way data binding without the complexity of a large framework.

## Features

-   **Proxy-based Reactivity:** Modern, efficient, and clean.
-   **Two-Way Data Binding:** Use `v-model` on form inputs to keep state and UI in sync.
-   **One-Way Data Binding:** Use `data-bind` to display state values in any element.
-   **Zero Dependencies:** Just one function in a single file.
-   **Extremely Lightweight:** The entire library is less than 40 lines of code.
-   **Easy to Integrate:** Drop it into any existing or new project.

## Getting Started

### 1. Save the File

Save the library code into a file in your project, for example, `./mini-reactive.js`.

### 2. Set up your HTML

Create an HTML file and add the custom attributes `data-bind` and `v-model` to your elements. Link your JavaScript file as a module.

**`index.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MiniReactive Example</title>
    <style>
      body { font-family: sans-serif; padding: 2em; }
      input { font-size: 1em; padding: 0.5em; margin-top: 0.5em; }
      h1, p { margin: 0; }
    </style>
</head>
<body>

    <h1>
      Hello, <span data-bind="name"></span>!
    </h1>
    <p>
      Type a new name below to see the magic.
    </p>

    <input v-model="name" placeholder="Enter your name" />

    <script type="module" src="./app.js"></script>
</body>
</html>
```

### 3. Initialize in JavaScript

In your main application script, import `createReactive` and initialize your state.

**`app.js`**
```javascript
import { createReactive } from './mini-reactive.js';

// 1. Define the initial state of your application.
const initialState = {
  name: 'World',
};

// 2. Create the reactive state object.
const state = createReactive(initialState);

// You can now interact with the `state` object.
// The DOM will update automatically!
window.setTimeout(() => {
  state.name = 'Developer';
}, 2000);
```

That's it! When you open `index.html`, you will see "Hello, World!". After 2 seconds, it will change to "Hello, Developer!". If you type in the input box, the greeting will update instantly.

## API Reference

### `createReactive(initialData)`

This is the only function exported by the library.

-   **`initialData`**: An object containing the initial key-value pairs for your reactive state.
-   **Returns**: A `Proxy` object that you interact with to read and update your state. Any changes made to this object will be reflected in the DOM.

### Directives

Directives are special attributes you add to your HTML to link them to your reactive state.

#### `data-bind="propertyName"`

Creates a **one-way binding** from your state to the element's content.

-   **Usage:** Binds the `textContent` of the element to the specified `propertyName`.
-   **Example:** `<span data-bind="name"></span>` will display the value of `state.name`.

#### `v-model="propertyName"`

Creates a **two-way binding** between your state and a form input element.

-   **Usage:** Works on `<input>`, `<textarea>`, etc.
    1.  It binds the `value` of the input to the specified `propertyName`.
    2.  It listens for the `input` event on the element to update `state.propertyName` whenever the user types.
-   **Example:** `<input v-model="name">` will display `state.name` and update it on user input.

## How It Works

1.  **Initialization:** When `createReactive` is called, it first scans the entire document for elements with `data-bind` and `v-model` attributes. It builds an internal map (`bindings`) where each key is a property name (e.g., `"name"`) and the value is an array of DOM elements associated with that property.
2.  **Event Listeners:** For each `v-model` element, it attaches an `input` event listener. This listener updates the reactive state when the user changes the input's value.
3.  **Proxy Magic:** The `initialData` object you provide is wrapped in a `Proxy`. A proxy allows us to intercept operations on an object, such as setting a property.
4.  **State → View:** When you update a property (e.g., `state.name = 'Bob'`), the proxy's `set` trap is triggered. Inside the trap, it updates the original data object and then calls the `updateView` function.
5.  **Updating the View:** The `updateView` function looks up all the elements bound to the changed property and updates their `textContent` or `value` accordingly.

## Limitations

MiniReactive is designed for simplicity and educational purposes. It does not include features found in larger frameworks:

-   No support for nested objects (e.g., `data-bind="user.name"`).
-   No support for array mutations.
-   DOM elements must exist on the page *before* `createReactive` is called. It does not watch for dynamically added elements.
-   Bindings are simple and do not support expressions or modifiers.

## License

[MIT](LICENSE.md)