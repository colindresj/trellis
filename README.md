#Trellis
[![Build Status](https://travis-ci.org/colindresj/trellis.svg?branch=master)](https://travis-ci.org/colindresj/trellis)
[![Bower version](https://badge.fury.io/bo/trellis.svg)](http://badge.fury.io/bo/trellis)

Lightweight masonry layouts.

##Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/colindresj/trellis/master/dist/trellis.min.js
[max]: https://raw.github.com/colindresj/trellis/master/dist/trellis.js

Create a container somewhere on your page with columns:

```html
<div id="trellis">
  <div class="trellis-col"></div>
  <div class="trellis-col"></div>
  <div class="trellis-col"></div>
  <div class="trellis-col"></div>
</div>
```

Add the following styles to your columns:

```scss
.trellis-col {
  position: absolute;
  width: 300px; /* Width can be anything you want, but 300px seems to work nicely */
  -webkit-transition: all 0.75s ease-in-out;
    transition: all 0.75s ease-in-out;
}
```

Include the script and call Trellis.

```html
<script src="trellis.min.js"></script>
<script>
  window.onload = function() {
    var trellis = Trellis( document.getElementById('trellis'), [options] );
  };
</script>
```

####CSS Selector
If you're happy with the default way of calling Trellis, that's all there is to it. However, as a convenience, Trellis will accept both an HTML element or a css selector as the first parameter when invoking the function. So, the following will accomplish the exact same thing as above:

```js
var trellis = Trellis('#trellis');
```

##Options
Trellis can take an optional config object as a second parameter with the following options:

Name          | Type       | Default        | Description
--------------|------------| ---------------|---------------------------
colSelector   | string     | '.trellis-col' | Selector for your columns
gutter        | number     | 10             | Thee spacing between each column in pixels
keepCentered  | boolean    | true           | Keeps the columns centered inside the container
afterInit     | function   | function(el){} | After init callback with the container as a parameter

##jQuery and Zepto

Although it's written in vanilla Javascript, Trellis also comes packaged as a jQuery/Zepto plugin. If you'd like to use it that way, simply do so in the common jQuery collection plugin syntax. Like any good jQuery plugin, jQuery.trellis is chainable.

```html
<script src="jquery.js"></script>
<script src="trellis.min.js"></script>
<script>
  $(function(){
    $('#trellis').trellis();
  });
</script>
```

##Example
A basic example is available on [JSFiddle](http://jsfiddle.net/VVsLt/1/)

