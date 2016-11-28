# Luke Scroll
scrolling like starwars would do


### How to use in HTML

```HTML
<div class="container">
  <div class="perspective">
    <div class="scroller">
    	<!-- all content goes here --> 
    </div>
    <div class="edge"></div>
  </div>
</div>
```

### how to start

```JavaScript
window.onload = function()
{
  lukescroll(
  {
    ...config object
  } );
};
```

### how to css

```CSS
.container
{
    width: 100%;
    height: 100%;
    position: absolute;
    ...
}
.perspective
{
    position         : fixed;
    top              : 0px;
    overflow         : hidden;
}



/* the scrolling element */
.scroller
{
    padding-top : 100px;
    position    : relative;
    text-align  : justify;
}
```
