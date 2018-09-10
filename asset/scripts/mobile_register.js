
$(function() {

    var handler = {
        // 点击切换验证码
        refreshcode: function(e) {
            loadSeccode()
                .then(function (response) {
                    setCodekey(response.datas.codekey);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        // 发送验证码
        // type: 1, phone: mobile, sec_val: sec_val, sec_key: sec_key
        // { 手机号, 验证码, 验证码key }
        again: function(e) {
            var codekey = $('#codekey').val(),
                captcha = $('#captcha').val(),       // 验证码
                send_code = $('.send_code'),         // 发送验证码
                count_down = $('.count_down'),       // 倒计时
                usermobile = $('#usermobile').val(); // 手机号

            if (!/1\d{10}/.test(usermobile)) {
                alert('请输入正确的手机号');
                return;
            }
            if (!captcha) {
                alert('请输入验证码');
                return;
            }

            $.ajax({
                type: "get",
                url: ApiUrl +'/index.php?act=connect&op=get_sms_captcha',
                data: { type: 1, phone: usermobile, sec_val: captcha, sec_key: codekey},
                dataType: "json",
                success: function (response) {
                    // 如果发送成功, 则提示, 否则, 则提示错误信息
                    if (response.code == 200) {
                        alert('发送成功');
                        // 发送验证码成功之后, 要开始倒计时了
                        send_code.hide();
                        count_down.show();

                        var countdown = response.datas.sms_time;
                        var timer = setInterval(function() {
                            $('.count_down').find('em').html(--countdown);
                            if (countdown == 0) {
                                clearInterval(timer);
                                send_code.show();
                                count_down.hide();
                            }
                        }, 1000);
                    } else {
                        alert(response.datas.error);
                    }
                }
            });
        },
        // 显示密码
        showPassword: function(e) {
            var target = e.target;
            var input = $(target).siblings('.mod_input');

            input.attr('type', 
                $(target).hasClass('active') 
                    ? 'password' 
                    : 'text'
            );
            $(target).toggleClass('active');
        },
        // 注册
        // { phone:mobile, captcha:m_captcha, password:passwd, client:'wap' }
        register: function(e) {
            var usermobile = $('#usermobile'),
                captcha = $('#captcha'),
                shortcode = $('#shortcode'),
                password = $('#password');
            
            $.ajax({
                type: "post",
                url: `${ApiUrl}/index.php?act=connect&op=sms_register`,
                data: { phone: usermobile, captcha: captcha, password: password, client: 'wap'},
                dataType: "json",
                success: function (response) {
                    console.log(response);
                }
            });
        }
    };


    // 点击切换验证码
    $('#refreshcode').on('click', function (e) { handler.refreshcode(e); });
    // 发送验证码
    $('#again').on('click', function (e) { handler.again(e); });
    // 显示后面的删除按钮
    $('.mod_input').each(function(index, item) {
        $(this).on('input', function(e) {
            $(this).next('.mod_del')[$(this).val() ? 'show' : 'hide'](); 
        });
    });
    // 清空输入框
    $('.mod_del').each(function(index, item) {
        $(this).on('click', function(e) {
            $(this).prev('.mod_input').val('');
            $(this).hide();
        });
    });
    // 密码框和文本框切换
    $('.icon_chakan1').on('click', function (e) { handler.showPassword(e); });
    // 注册
    $('.mod_form_btn').on('click', function(e) { handler.register(e); })
    // 监听手机号码
    // var isOK = false;
    // // 用户名输入
    // $('#usermobile').on('input', function(e) {
    //     // 判断手机号是否为空
    //     if (!$(this).val()) {
    //         isOK = true;
    //     }
    //     // 判断验证码是否为空
    //     if (!$('#captcha').val()) {
    //         isOK = true;
    //     }
    //     // 判断短信验证码是否为空
    //     if (!$('#shortcode').val()) {
    //         isOK = true;
    //     }
    //     // 判断密码是否为空
    //     if (!$('#password').val()) {
    //         isOK = true;
    //     }


    // });


});