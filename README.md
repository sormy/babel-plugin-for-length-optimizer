# babel-plugin-for-length-optimizer

This is example plugin that brings a small "for length" optimization.

It converts code below:

```js
for (let i = 0; i < array.length; i++) {
  ...
}
```

to:

```js
for (let i = 0, _len = array.length; i < _len; i++) {
  ...
}
```

Tested and is working properly with Babel 7.x
