<?php
$servername = "mysql-38308-0.cloudclusters.net";
$username = "deven";
$password = "password";
$dbname   = "homesafetysystem";
$port = 38308;
try {
  $con = mysqli_connect($servername, $username, $password, $dbname,$port);
} catch (\Throwable $th) {
  echo $th;
} 
