$(function() {
    $("#sub").on("click", function() {
        $.ajax({
                url: '/tour/add',
                type: 'POST',
                data: {
                    tourName: $('#name').val(),
                    tourDescription: $('#mota').val(),
                    tourDuration: $('#time').val(),
                    tourDeparture: $('#address').val(),
                    tourTransportation: $('#pt').val(),
                    price: $('#price').val(),
                    tourDetail: $('#td').val()
                }
            })
            .then(Data => {
                if (Data.msg == 'success') {
                    $('#name').val("");
                    $('#mota').val("");
                    $('#time').val("");
                    $('#address').val("");
                    $('#pt').val("");
                    $('#price').val("");
                    $('#td').val("");
                    alert("Thêm thành công");
                }
            })
            .catch(error => {
                alert("Lỗi không xác định, vui lòng thử lại");
                console.log(error);
            })
    });
    $(document).on("click", "button.del", function() {
        var id = $(this).parent().find("button.del").val();
        $.ajax({
            url: "/tour/delete",
            method: "delete",
            dataType: "json",
            data: { id: id },
            success: function(response) {
                if (response.msg == "success") {
                    alert("data deleted");
                    window.location.href = '/tour/add';
                } else {
                    alert("data not get deleted");
                    window.location.href = '/tour/add';
                }
            },
            error: function(response) {
                alert("server error");
            },
        });
    });
    $(document).on("click", "button.update", function() {
        var id = $(this).parent().find("button.update").val();
        $.ajax({
            url: "/tour/update",
            method: "put",
            dataType: "json",
            data: {
                id: id,
                tourName: $('#name').val(),
                tourDescription: $('#mota').val(),
                tourDuration: $('#time').val(),
                tourDeparture: $('#address').val(),
                tourTransportation: $('#pt').val(),
                price: $('#price').val(),
                tourDetail: $('#td').val()
            },
            success: function(response) {
                if (response.msg == "success") {
                    alert("data updated");
                    window.location.href = '/tour/add';
                } else {
                    alert("data not updated");
                    window.location.href = '/tour/add';
                }
            },
            error: function(response) {
                alert("server error");
            },
        });
    });

});