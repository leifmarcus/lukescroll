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
     *  @param  {HTMLElement} container - the main scroller element
     *
     *  @return {object} - luke scroll object
     */
    function Lukescroll( container )
    {
        var self = this;

        self.construct = function()
        {
            self.container   = container;
            self.perspective = container.querySelector( '.perspective' );
            self.scroller    = container.querySelector( '.scroller' );

            self.top = self.container.getBoundingClientRect().top;
            var height = Math.ceil( self.scroller.offsetHeight + self.top + 200 );

            self.container.style.cssText = 'height:' + height + 'px';

            window.addEventListener( 'scroll', self.onScroll.call( self ), false );
        };

        self.construct();

        return self;
    }

    Lukescroll.prototype = {
        onScroll : function()
        {
            var self = this;

            return function scrollHandler()
            {
                var top = window.scrollY;
                self.perspective.style.cssText =
                     'top: ' + top + 'px';
                //     ' translateY(' + top + 'px)';
                self.scroller.style.cssText =
                    'top: ' + -top + 'px';
            };
        }
    };

    /**
     *  lukescroll start function
     *
     *  @param {HTMLElement} container - html container
     *  @return {Object} lukescroll object
     */
    return function( container )
    {
        return new Lukescroll( container );
    };

} ) );
