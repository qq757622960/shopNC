/** 
 * @Author: YISHI 
 * @Date: 2018-09-09 15:33:39 
 * @Desc: JQuery 通用插件 
 */

;(function($) {

    $.extend({
        // 滚动header固定到顶部
        scrollTransparent: function(options) {
            var defaults = {
                value: '.mod_header',
                scrollHeight: 50
            };

            var options = $.extend({}, defaults, options);

            function _init() {
                $(window).scroll(function() {
                    if ($(window).scrollTop() <= options.scrollHeight) {
                        $(options.value).addClass('trans').removeClass('fixed');
                    } else {
                        $(options.value).addClass('fixed').removeClass('trans');
                    }
                });
            }

            return this.each(function() {
                _init();
            })();
        }

    });

})(jQuery);