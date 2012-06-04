(function(window){
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    window.requestTimeout = function(fn, delay) {
        if( !window.requestAnimationFrame       && 
            !window.webkitRequestAnimationFrame && 
            !window.mozRequestAnimationFrame    && 
            !window.oRequestAnimationFrame      && 
            !window.msRequestAnimationFrame)
                return window.setTimeout(fn, delay);

        var start = new Date().getTime(),
            handle = new Object();

        function loop(){
            var current = new Date().getTime(),
            delta = current - start;

            delta >= delay ? fn.call() : handle.value = window.requestAnimFrame(loop);
        };

        handle.value = window.requestAnimFrame(loop);
        return handle;
    };

    window.clearRequestTimeout = function(handle) {
        window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
        window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value)   :
        window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
        window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
        window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
        clearTimeout(handle);
    };

    window.requestInterval = function(fn, delay) {
        if( !window.requestAnimationFrame       && 
            !window.webkitRequestAnimationFrame && 
            !window.mozRequestAnimationFrame    && 
            !window.oRequestAnimationFrame      && 
            !window.msRequestAnimationFrame)
                return window.setInterval(fn, delay + 1000 / 60);

        var start = new Date().getTime(),
        handle = new Object();

        function loop() {
            var current = new Date().getTime(),
            delta = current - start;

            handle.value = window.requestAnimFrame(loop);

            if(delta >= delay) {
                fn.call();
                start = new Date().getTime();
            }
            
        };

        handle.value = window.requestAnimFrame(loop);
        return handle;
    }

    window.clearRequestInterval = function(handle) {
        if(!handle) return false;
        window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
        window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) :
        window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
        window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
        window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
        clearInterval(handle);
    };
})(window);