<?php
include "../../config/connect_to_db.php";

date_default_timezone_set('Africa/Kampala');

$date = date('Y-m-d h:i:s');
$query = "SELECT temp,date,lpg,smoke,carbonmonoxide FROM sensor_values where YEAR(date)=YEAR(now()) and MONTH(date)=MONTH(now()) and DAY(date)=DAY('".$date."') order by date asc ";
$result = $con->query($query);

$jsonArray = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        array_push(
            $jsonArray,
            [
                'date' => $row['date'],
                'temp' => $row['temp'],
                'lpg' => $row['lpg'],
                'smoke' => $row['smoke'],
                'carbonmonoxide' => $row['carbonmonoxide']
            ]
        );
    }
}

$con->close();

header('Content-type: application/json');
echo json_encode($jsonArray);
