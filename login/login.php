<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login</title>
</head>

<body id="form-page">

<div id="form">
<form action="" id="login" class="hidden">

    <h2>Login</h2>
    <input type="email" placeholder="Email" required>
    <input type="password" placeholder="Password" required>
    <button type="submit" class="submit-button">Login</button>
    <button class="switch-button" onclick="switchLogin('login')">I don't have an Account</button>
</form>
<form id="register" hidden class="hidden">
    <h2>Register</h2>
    <input type="text" placeholder="First Name" required>
    <input type="text" placeholder="Last Name" required>
    <input type="email" placeholder="Email" required>
    <input type="password" placeholder="Password" required>
    <input type="password" placeholder="Confirm Password" required>
    <button type="submit" class="submit-button">Register</button>
    <button class="switch-button" onclick="switchLogin('register')">I already have an account</button>
</form>
</div>
</body>
</html>