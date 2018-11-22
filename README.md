# Snowflakes ❄️

https://schneeflocken.netlify.com

## Installation

`npm install snow.js`

## Usage

snow.js is a module that exports a `snow()` function, which you can pass the number of snowflakes you'd like and an HTML element where they should be drawn. You can for example bundle it using [Parcel]().

```html
<!-- index.html -->
<style>
    #stage {
        width: 1280px;
        height: 720px;
        background: black;
    }
</style>
<div id="stage"></div>
<script src="./index.js"></script>
```

```js
// index.js
import snow from '@lorti/snow.js';
const stage = document.getElementById('stage');
snow(10, stage);
```

```bash
parcel index.html
```
