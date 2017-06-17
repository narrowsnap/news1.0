$(document).ready(function () {
    //绑定enter键
    $(document).keydown(function(event){
        if(event.keyCode==13){
            $("#login").click();
        }
    });
    $('#login').click(function () {
        if($('#username').val() == null) {
            $('#username').attr('placeholder', '请输入用户名');
            $('#username').focus();
        } else if($('#password').val() == null) {
            $('#password').attr('placeholder', '请输入用户名');
            $('#password').focus();
        } else {
            $.ajax({
                url: '/login',
                type: 'POST',
                data: {
                    username: $('#username').val(),
                    password: $('#password').val()
                },
                /*async: false,
                cache: false,
                contentType: false,
                processData: false,*/
                success: function(data){
                    if(data.success) {
                        localStorage.setItem('admin', $('#username').val());
                        location.href = 'index.html';
                    } else {
                        $('#message').text(data.message);
                    }
                },
                error: function(){
                    $('#message').text(data.message);
                }
            });
        }
    })
})