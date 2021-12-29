  $(function() {
      function setCookie(cname, cvalue, exdays) {
          const d = new Date();
          d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
          let expires = "expires=" + d.toUTCString();
          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

      function getCookie(cname) {
          let name = cname + "=";
          let decodedCookie = decodeURIComponent(document.cookie);
          let ca = decodedCookie.split(';');
          for (let i = 0; i < ca.length; i++) {
              let c = ca[i];
              while (c.charAt(0) == ' ') {
                  c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                  return c.substring(name.length, c.length);
              }
          }
          return "";
      }

      $("#login").on("click", function() {
          $.ajax({
                  url: '/admin/login',
                  type: 'POST',
                  data: {
                      username: $('#username').val(),
                      password: $('#password').val()
                  }
              }).then(data => {
                  if (data.message == 'Valid password') {
                      alert("đăng nhập thành công");
                      setCookie('token', data.token, 1);
                      window.location.href = '/admin/adminpage';
                      return false;
                  }
              })
              .catch(error => {
                  alert("Sai tài khoản hoặc mật khẩu, hãy thử lại");
                  console.log(error);
              })
      })

      $('#home').on("click", function() {
          window.location.href = '/admin';
          return false;
      })
  })