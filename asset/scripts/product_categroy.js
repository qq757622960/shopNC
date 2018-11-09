
const app = new Vue({
    el: '#app',
    data: {
        goodsClass: null,
        recommendList: null
    },
    methods: {
        getGoodsClass() {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    type: "get",
                    url: "http://b2b2c.shopnctest.com/dema/mo_bile/index.php?act=goods_class",
                    dataType: "json",
                    success: function (response) {
                        resolve(response);
                    },
                    error: function(xhr, error, errorText) {
                        reject(error);
                    }
                });
            });
        },
        getRecommendList() {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    type: "get",
                    url: "http://b2b2c.shopnctest.com/dema/mo_bile/index.php?act=brand&op=recommend_list",
                    dataType: "json",
                    success: function (response) {
                        resolve(response);
                    },
                    error: function(xhr, error, errorText) {
                        reject(error);
                    }
                });
            });
        }
    },
    mounted() {
        this.getGoodsClass()
            .then(function(response) {
            })
            .catch(function(error) {
            });
        
        this.getRecommendList()
            .then(function(response) {
            })
            .catch(function(error) {
            })
    }
});