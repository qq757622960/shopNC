
$(function() {

    // 显示隐藏删除按钮
    $('.mod_input').each(function(index, item) {
        var that = $(this),
            nextElem = that.next();

        that.on('input', function(e) {
            nextElem[(this.value).trim() ? 'show' : 'hide']();
            activeRegister();
        });
    });

    // 给每一个删除按钮绑定点击事件, 点击并删除输入框的值
    $('.mod_del').each(function(index, item) {
        var that = $(this),
            prevElem = that.prev();

        that.on('click', function() {
            prevElem.val('');
            if (!prevElem.val()) { that.hide(); }

            activeRegister();
        });
    });

    // 同意按钮状态
    $('#agree').on('change', function() {
        activeRegister();
    });

    // 激活注册按钮
    function activeRegister() {
        var is_null = false;
        var register_btn = $('.register_btn button');
        var agree = $('#agree');

        // 每输入一次值, 要检测这几个输入框是否有值, 判断是否要激活提交按钮
        $('.mod_input').each(function (index, item) {
            if (!this.value.trim()) {
                is_null = false;
                return false;
            }
            is_null = true;
        });

        // disabled: true  是禁用状态
        // disabled: false 是激活状态
        // checkbox: true 是选中状态
    // checkbox: false 是未选中
        register_btn.prop('disabled', !(is_null && agree.prop('checked')));
    }

    // 打开弹窗
    function openLayer(msg) {
        layer.open({
            content: msg,
            skin: 'msg',
            time: 2
        });
    }

    // 注册
    $('.register_btn button').on('click', function() {
        var username = $('.mod_input[name="username"]').val().trim(),
            pwd = $('.mod_input[name="pwd"]').val().trim(),
            confirmPwd = $('.mod_input[name="confirmPwd"]').val().trim(),
            email = $('.mod_input[name="email"]').val().trim(),
            client = 'wap';
        
        var word_re = /\w{6,20}/g,
            num_re = /\d{6,20}/g,
            email_re = /(\w+\.)*\w+@(\w+\.)+[A-Za-z]/g;
        
        // if (!word_re.test(username)) {
        //     openLayer('请输入6-20位字符');
        //     return;
        // }
        // if (!num_re.test(username)) {
        //     openLayer('用户名不能为纯数字');
        // }
        if (!word_re.test(pwd)) {
            openLayer('请输入6-20位密码');
            return;
        }
        if (confirmPwd != pwd) {
            openLayer('两次密码输入不一致');
            return;
        }
        if (!email_re.test(email)) {
            openLayer('请输入正确的电子邮箱');
            return;
        }
        
        $.ajax({
            type: "post",
            url: "http://b2b2c.shopnctest.com/dema/mo_bile/index.php?act=login&op=register",
            data: { username: username, password: pwd, password_confirm: confirmPwd, email: email, client: client },
            dataType: "json",
            success: function (response) {
                if (response.code == 200) {
                    openLayer('注册成功');
                } else if (response.code == 400) {
                    openLayer(response.datas.error);
                }
            }
        });
    });
});

