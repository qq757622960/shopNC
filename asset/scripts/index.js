
const app = new Vue({
    el: '#app',
    data: {
        datas: [],
        advList: [],
        home1: '',
        home2: '',
        home3: '',
        l2r1: null,
        l1r2: null,
        homePic: [],
        goods: [],
        hotGoods: []
    },
    methods: {
        getHomeData() {
            return fetch('http://b2b2c.shopnctest.com/dema/mo_bile/index.php?act=index')
                .then(response => response.json())
                .then(json => {
                    this.advList = json.datas[0].adv_list.item;
                    this.home1 = json.datas[1].home1;
                    this.home2 = json.datas[4].home1;
                    this.home3 = json.datas[6].home1;
                    this.l2r1 = json.datas[2].home4;
                    this.l1r2 = json.datas[3].home2;
                    this.homePic = json.datas[5].home3.item;
                    this.goods = json.datas[7].goods.item;
                    this.hotGoods = json.datas[8].goods.item;
                });
        },
        jQSwiper() {
            $('.home_swiper').each(function (item) {
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
        }
    },
    created() {
        this.getHomeData()
            .then(() => { this.jQSwiper(); });
    }
});


$(function() {

    // // 轮播图
    // $('.home_swiper').each(function(item) {
    //     // 如果轮播图的数量小于2, 则退出
    //     if ($(this).find('div').length < 2) { return; }

    //     // 轮播开始
    //     Swipe(this, {
    //         startSlide: 2,
    //         speed: 400,
    //         auto: 3000,
    //         continuous: true,
    //         disableScroll: false,
    //         stopPropagation: false,
    //         callback: function (index, elem) { },
    //         transitionEnd: function (index, elem) { }
    //     });
    // });

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


