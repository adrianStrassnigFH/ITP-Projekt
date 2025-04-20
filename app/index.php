<?php
require_once ('../api/dbaccess.php');
require('../api/auth/dbconnect.php');
?>
<!doctype html>
<html lang="en">
<head>
    <title>FH Spielewelt</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="../favicon/favicon.ico">
</head>
<body>
<nav id="navbar" class="navbar navbar-dark fixed-top navbar-expand-lg">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">FH SPIELWELT</a>

        <!-- Toggler Button (Appears on small screens) -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Links (Collapsible) -->
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="loadPage('homepage')">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#leaderboard" onclick="loadPage('homepage')" >Leaderboard</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="loadPage('faq')">FAQ</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="loadPage('impressum')">Impressum</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="loadPage('login')">Login</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div id="content">
    loading..
</div>

<script src="main_script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
<footer class="bg-dark text-white text-center py-3">
    &copy; 2025 FH SPIELWELT | <a onclick="loadPage('impressum')" href="#" class="text-white text-decoration-none">Impressum</a> | <a onclick="loadPage('impressum')" href="#" class="text-white text-decoration-none">Datenschutz</a>
</footer>
</html>