<?php
    session_start();
    include '../config/connect_to_db.php';
    // code...
    session_destroy();
    header('Location: ../../../login.php');

 ?>