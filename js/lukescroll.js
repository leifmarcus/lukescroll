/**
 *  Luke Scroll
 *
 *  Version: 1.0
 *  Licence: MIT
 *  Author : Leif Marcus
 */
( function( name, definition )
{

    if ( typeof define === 'function' )
    {
        // define for AMD:
        define( definition );
    }
    else if ( typeof module !== 'undefined' && module.exports )
    {

        // exports for Node.js
        module.exports = definition();

    }
    else
    {

        // using the module in the browser:
        var curModule = definition();
        var self = this;

        var originalModule = self[ name ];

        curModule.noConflict = function()
        {
            self[ name ] = originalModule;

            return curModule;
        };

        self[ name ] = curModule;

    }

}( 'lukescroll', function()
{
    /**
     *  Class Lukescroll
     *
     *  @param  {Object} config - main config object
     *
     *  @return {object} - luke scroll object
     */
    function Lukescroll( config )
    {
        var self = this;

        /* Default configuration of the slider: */
        var defaults =
            {
                container      : '.container',    // selector for container
                perspective    : '.perspective',  // selector for perspective
                scroller       : '.scroller',     // selector for scroll element
                edge           : '.edge',         // selector for edge overlay
                edgeHeight     : 400,             // selector for edge height
                cssRotate      : 30,              // rotation value
                cssPerspective : 300,             // perspective value in px
                origin         : '50% 80%',      // cass transform origin
                bgColor        : 'rgba(0,0,0,1)', // background color
                color          : '#FF0'           // text color
            };

        /* merge defaults and custom config */
        self.config = Object.assign( defaults, config );

        /**
         *  Lukescroll constructor
         *
         *  @return {Undefined} - no return value
         */
        self.construct = function()
        {
            this.setElements();
            this.buildEdge();
            this.setStyles();

            window.addEventListener( 'load', self.onLoad.call( self ) );
            window.addEventListener( 'resize', self.onResize.call( self ) );
            window.addEventListener( 'scroll', self.onScroll.call( self ), false );
        };

        /**
         *  Lukescroll destroy
         *
         *  remove events from window
         *
         *  @return {Undefined} - no return value
         */
        self.destroy = function()
        {
            window.removeEventListener( 'resize' );
            window.removeEventListener( 'load' );
            window.removeEventListener( 'scroll' );
        };

        self.construct();

        return self;
    }

    Lukescroll.prototype =
    {
        /**
         *  set Styles
         *
         *  sets initial state of the styles for the scroller
         *
         *  @returns {Undefined} - no return
         */
        setStyles : function()
        {
            this.container.style.cssText =
                'background-color:' + this.config.bgColor + ';' +
                'color:' + this.config.color + ';';

            this.perspective.style.cssText =
                'transform-origin:' + this.config.origin + ';' +
                'transform: perspective(' + this.config.cssPerspective + 'px) ' +
                'rotateX(' + this.config.cssRotate + 'deg);';

            this.scroller.style.paddingTop = this.config.edgeHeight + 'px';
        },

        /**
         *  setElements
         *
         *  sets a reference to the used elements
         *
         *  @returns {Undefined} - no return
         */
        setElements : function()
        {
            this.container   = document.querySelector( this.config.container );
            this.perspective = document.querySelector( this.config.perspective );
            this.scroller    = document.querySelector( this.config.scroller );
            this.edge        = document.querySelector( this.config.edge );
        },
        /**
         *  build edge overlay:
         *
         *  builds the upper edge overlay to fadeout text
         *
         *  @returns {Undefined} - no return
         */
        buildEdge : function()
        {
            this.edge.style.cssText =
                'position: absolute;' +
                'content: \' \';' +
                'left: 0;' +
                'right: 0;' +
                'top: 0;' +
                'height: ' + this.config.edgeHeight + 'px;' +
                'background-image: linear-gradient(top, ' +
                this.config.bgColor + '0%, transparent 100%);' +
                'background-image: -webkit-linear-gradient(top, ' +
                this.config.bgColor + ' 0%, rgba(0,0,0,0) 100%);' +
                'pointer-events: none;';
        },
        /**
         *  set container height
         *
         *  set the height of the container to have
         *  enough space to scroll
         *
         *  @returns {Undefined} - no return
         */
        setContainerHeight : function()
        {
            var height = Math.ceil( this.scroller.offsetHeight +
                                   this.top + this.config.edgeHeight );
            this.container.style.height     = height + 'px';
        },

        /**
         *  resize handler wrapper for binding this
         *
         *  @return {Function} resize handler function
         */
        onResize : function()
        {
            var self = this;

            return function()
            {
                self.setContainerHeight();
            };
        },

        /**
         *  load handler wrapper for binding this
         *
         *  @return {Function} load handler function
         */
        onLoad : function()
        {
            var self = this;

            return function loadHandler()
            {
                self.top = self.container.getBoundingClientRect().top;

                self.setContainerHeight();

                self.container.style.visibility = 'visible';
            };
        },
        /**
         *  scroll handler wrapper for binding this
         *
         *  @return {Function} scroll handler function
         */
        onScroll : function()
        {
            var self = this;

            return function scrollHandler()
            {
                var top = window.scrollY;
                // self.perspective.style.top = top + 'px';
                //     ' translateY(' + top + 'px)';
                self.scroller.style.top = -top + 'px';
            };
        }
    };

    /**
     *  lukescroll start function
     *
     *  @param {Object} config - scroller configuration
     *  @return {Object} lukescroll object
     */
    return function( config )
    {
        return new Lukescroll( config );
    };

} ) );
