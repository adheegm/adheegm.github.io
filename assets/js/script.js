var g = (function(){
    return {
        attachEvent: function(dom, name, handler) {
            dom.addEventListener(name, handler);
        }
    }
})();

var page = (function(window) {
    var handler = {
        scrollHandler: function(e) {
            //logic
        }
    }
    return {
        init: function() {            
            g.attachEvent(window, 'scroll', handler.scrollHandler);
        }
    }
})(this);

page.init();