<?php
include "../../config/connect_to_db.php";

date_default_timezone_set('Africa/Kampala');
$response = array('success' => false, "error" => "", "data" => '');

if (
    isset($_POST['temp']) &&
    isset($_POST['lpg']) &&
    isset($_POST['smoke']) &&
    isset($_POST['co']) 
) {

    $date = date('Y-m-d h:i:s');
    $lpg = mysqli_escape_string($con, $_POST['lpg']);
    $smoke = mysqli_escape_string($con, $_POST['smoke']);
    $co = mysqli_escape_string($con, $_POST['co']);
    $temp = mysqli_escape_string($con, $_POST['temp']);

    $query = "INSERT INTO sensor_values(lpg,smoke,carbonmonoxide,temp,date) VALUES ('$lpg','$smoke','$co','$temp','$date')";

    if ($con->query($query) === true) {
        $response['success'] = true;
        $reponse['data'] = 'New Sensor values added to db';
    } else {
        $response['success'] = true;
        $reponse['error'] = $con->error;
    }
} else {
    $response['success'] = false;
    $response['error'] = 'Please add all sensor values';
}

$con->close();

header('Content-type: application/json');
echo json_encode($response);
