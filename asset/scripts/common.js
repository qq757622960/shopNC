/** 
 * @Author: YISHI 
 * @Date: 2018-09-03 15:50:01 
 * @Desc: 通用JAVASCRIPT 
 */

// 加载验证码
function loadSeccode(params) {
    return new Promise(function(resolve, reject) {
        // 加载验证码
        $.ajax({
            type: "get",
            url: ApiUrl + '/index.php?act=seccode&op=makecodekey',
            dataType: "json",
            async: false,
            success: function (response) {
                resolve(response);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

// 设置验证码的值
function setCodekey(codekey) {
    // 重置隐藏域中的 value
    if ($('#codekey').val()) {
        $('#codekey').val('');
    }

    $('#codekey').val(codekey);
    $('#codeimage').attr('src', `${ApiUrl}/index.php?act=seccode&op=makecode&k=${$("#codekey").val()}&t=${Math.random()}`);
}

// 加载验证码
loadSeccode()
    .then(function(response) {
        setCodekey(response.datas.codekey);
    })
    .catch(function(error) {
        console.log(error);
    });

// 回到顶部
$('.gotop').on('click', function (e) {
    var that = this;
    that.timer = setInterval(function () {
        $(window).scrollTop(Math.floor($(window).scrollTop() * 0.8));
        if ($(window).scrollTop() == 0) { clearInterval(that.timer); }
    }, 10);
});

// 右上侧小导航控件
$('.mod_header').on('click', '.icon-gengduo', function() {
    $('.mod_nav_menu').toggleClass('show');
});

$('.mod_nav_menu').on('click', 'li', function() {
    $('.mod_nav_menu').removeClass('show');
});

$(document).scroll(function() {
    $('.mod_nav_menu').removeClass('show');
});


// radio 样式
$('body').on('click', 'label', function() {
    if ($(this).has("input[type='checkbox']")) {
        if ($(this).find('input[type="checkbox"]').prop('checked')) {
            $(this).addClass('checked');
        } else {
            $(this).removeClass('checked');
        }
    }
});



