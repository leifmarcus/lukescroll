# Luke Scroll
scrolling like starwars would do


### How to use in HTML

```HTML
<div class="container">
  <div class="perspective">
    <div class="scroller">
    	<!-- all content goes here --> 
    </div>
  </div>
</div>
```

### how to start

```JavaScript
window.onload = function()
{
  lukescroll( document.querySelector( '.container' ) );
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
    position         : relative;
    top              : 0px;
    transform-origin : 50% 0%;
    transform        : perspective(270px) rotateX(40deg);
    overflow         : hidden;
}

/* gradient to hide the upper edge */
.perspective:after
{
    position: absolute;
    content: ' ';
    left: 0;
    right: 0;
    top: 0;
    height: 200px;
    background-image: linear-gradient(top, rgba(255,255,255,1) 0%, transparent 100%);
    background-image: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%, transparent 100%);
    pointer-events: none;
}

/* the scrolling element */
.scroller
{
    padding-top : 100px;
    position    : relative;
    text-align  : justify;
}
```
