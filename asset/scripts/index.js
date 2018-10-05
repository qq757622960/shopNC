

$(function() {

    // 轮播图
    $('.home_swiper').each(function(item) {
        // 如果轮播图的数量小于2, 则退出
        if ($(this).find('div').length < 2) { return; }

        // 轮播开始
        Swipe(this, {
            startSlide: 2,
            speed: 400,
            auto: 3000,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
            callback: function (index, elem) { },
            transitionEnd: function (index, elem) { }
        });
    });

    // 克隆头部
    var headerClone = $('#header').clone();
    // 滚动页面
    $(window).scroll(function () {
        // 如果滚动条的高度 < 轮播图的高度
        if ($(window).scrollTop() <= $('.home_swiper').height()) {
            // 克隆一下header
            headerClone = $('#header').clone();
            // 把当前 header 删除
            $('#header').remove();
            // 克隆的头部, 改变成透明颜色
            headerClone.addClass('transparent').removeClass('');
            // 把 header 插入到 home_top 里面的最前面
            headerClone.prependTo('.home_top');
        } else {
            // 如果滚动条高度 > 轮播图的高度
            // 克隆 header
            headerClone = $('#header').clone();
            // 把头部移除
            $('#header').remove();
            // 移除透明头部
            headerClone.addClass('').removeClass('transparent');
            // 把他添加到最前面
            headerClone.prependTo('body');
        }
    });
});