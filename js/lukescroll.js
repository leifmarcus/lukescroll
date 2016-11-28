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


        var defaults =
            {
                container      : '.container',
                perspective    : '.perspective',
                scroller       : '.scroller',
                edge           : '.edge',
                edgeHeight     : 200,
                cssRotate      : 30,
                cssPerspective : 250,
                origin         : '50% 20%',
                bgColor        : 'rgba(0,0,0,1)',
                color          : '#FF0'
            };

        self.config = Object.assign( defaults, config );

        /**
         *  Lukescroll constructor
         *
         *  @return {Undefined} - no return value
         */
        self.construct = function()
        {
            self.container   = document.querySelector( self.config.container );
            self.perspective = document.querySelector( self.config.perspective );
            self.scroller    = document.querySelector( self.config.scroller );
            self.edge        = document.querySelector( self.config.edge );

            this.buildEdge();

            self.container.style.cssText =
                'background-color:' + self.config.bgColor + ';' +
                'color:' + self.config.color + ';';

            self.perspective.style.cssText =
                'transform: perspective(' + self.config.cssPerspective + 'px) ' +
                'rotateX(' + self.config.cssRotate + 'deg);' +
                'transform-origin:' + self.config.origin + ';';

            window.addEventListener( 'load', self.onLoad.call( self ) );
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
            window.removeEventListener( 'load' );
            window.removeEventListener( 'scroll' );
        };

        self.construct();

        return self;
    }

    Lukescroll.prototype =
    {
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
        onLoad : function()
        {
            var self = this;

            return function loadHandler()
            {
                self.top = self.container.getBoundingClientRect().top;
                var height = Math.ceil( self.scroller.offsetHeight +
                                       self.top + self.config.edgeHeight );

                self.container.style.height     = height + 'px';
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
                self.perspective.style.top = top + 'px';
                //     ' translateY(' + top + 'px)';
                self.scroller.style.cssText =
                    'top: ' + -top + 'px';
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
