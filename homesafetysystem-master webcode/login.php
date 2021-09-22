<?php if (isset($_SESSION['id'])) {
    header('Location: index.php'); 
} ?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/src/res/css/style.css">
    <title>Home Security System</title>
</head>
<body>
    <div class="auth-form-div">
        <div class="auth-form-control">
            <form id="loginForm" action="">
                <h1>Sign In</h1>
                <div class="input_div">
                <label for="input">Username</label>
                <input autocomplete="off" name="username" required type="text" class="input" />
                </div>
                <div  class="input_div">
                <label for="input">Password</label>
                <input required name="password"  type="password" class="input" />
                </div>
                <button class="btn" type="submit">Sign In</button>
            </form>
        </div>
    </div>
</body>
   <script src="/src/res/js/jquery.js"></script>
   <script src="src/res/js/auth/auth.js"></script>
</html>
