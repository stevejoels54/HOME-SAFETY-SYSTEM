<?php include "../../config/connect_to_db.php";

$query = "SELECT date FROM sensor_values ORDER BY date desc  LIMIT 1";
$result = $con->query($query);
$response = array('success' => false, 'error' => '', 'data' => '');


$jsonArray = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response['data'] = $row['date'];
        $response['success'] = true;
    }
}

header('Content-type: application/json');
echo json_encode($response);
$con->close();
