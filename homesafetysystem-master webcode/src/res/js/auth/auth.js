$(document).ready(() => {
    $('#loginForm').submit(e => {
        e.preventDefault();
        const username = $('input[name=username]').val();
        const password = $('input[name=password]').val();
        const FormData = {
            username,
            password
        }
        $.ajax({
            url:'/src/controllers/auth/loginController.php',
            method:'POST',
            data:FormData,
            success: data => {
                if(!data.success) {
                    console.log(data);
                    alert('Error occcured please try again');
                }else {
                   window.location = 'index.php';
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    });
})