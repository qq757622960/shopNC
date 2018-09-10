
$(function() {

    // 显示删除按钮
    $('.mod_input').on('input', function(e) {
        var inputVal = $(this).val().trim();
        $(this).siblings('.mod_del')[inputVal ? 'show' : 'hide']();

        // 激活登录按钮
        var isOK = false;
        $('.mod_input').each(function (index, item) {
            if (!$(this).val().trim()) {
                isOK = true;
                return false;
            }
        });

        $('.form_btn').attr('disabled', isOK);
    });

    // 点击删除按钮删除输入框的值
    $('.mod_del').on('click', function(e) {
        var input = $(this).siblings('.mod_input'),
            inputVal = input.val().trim();
        
        if (inputVal) {
            input.val('');
        }

        $(this).hide();
        // 触发 input 事件
        $('.mod_input').trigger('input');
    });

    // 登录
    var isLogin = 0;
    $('.form_btn').on('click', function(e) {
        var usermobile = $('#usermobile').val().trim(),
            password = $('#password').val().trim();
        
        if (isLogin) {
            alert('请勿重复提交');
            return false;
        }

        isLogin = 1;
        $.ajax({
            type: "post",
            url: "http://b2b2c.shopnctest.com/dema/mo_bile/index.php?act=login",
            data: { username: usermobile, password: password, client: 'wap' },
            dataType: "json",
            success: function (response) {
                if (response.code == 200) {
                    console.log('登录成功!');
                } else {
                    isLogin = 0;
                    console.log(response);
                }
            }
        });

    });
    
});