$(function() {
    alert("welcome admin")
    $("#submit").on("click", function() {

        $.ajax({
                url: '/admin/registerAdmin',
                type: 'POST',
                data: {
                    username: $('#username').val(),
                    password: $('#password').val(),
                    full_name: $('#full_name').val()
                }
            })
            .then(data => {
                if (data.msg == 'Success') {
                    alert("Tạo tài khoản thành công");
                    window.location.href = '/admin/loginAdmin';
                    return false;
                }
                if (data.msg == 'User exist') {
                    alert("Tạo tài khoản không thành công, tài khoản này đã tồn tại");
                }
            })
            .catch(error => {
                alert("Lỗi không xác định, vui lòng thử lại");
                console.log(error);
            })
    })
})