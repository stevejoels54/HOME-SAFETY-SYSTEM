<?php include 'src/views/common/header.php';
session_start();
if (!isset($_SESSION['id'])) {
    header('Location: login.php');
}
include 'src/views/home/main_container.php';
include 'src/views/common/footer.php'; 
?>
<script src="/src/res/js/jquery.js"></script>
<script src="/src/res/js/graph/Chart.min.js"></script>
<script src="src/res/js/main.js"></script>
<script src="/src/res/js/graph/graph.js"></script>