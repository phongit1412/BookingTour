$(function() {
    alert("dd")
    $("#btn_cl").on("click", function() {
        var myBookId = $(this).data('id');
        alert('ok')
        document.getElementById("id_tours").innerHTML = myBookId;

        $.ajax({
                url: '/admin/adminpage/cus',
                type: 'POST',
                data: {
                    tour_id: myBookId,
                }
            })
            .then(data => {
                if (data.msg == 'done') {
                    alert("Đặt tour thành công");
                    return false;
                }
            })
            .catch(error => {
                alert("Lỗi không xác định, vui lòng thử lại");
                console.log(error);
            })



    });

    $('#home').on("click", function() {
        window.location.href = '/admin';
        return false;
    })
})