<?php
session_start();
include "../../config/connect_to_db.php";
$response = array('success'=> false,'error'=>'error','data'=>[]);
if(isset($_POST['username']) && isset($_POST['password'])){
    $username =$_POST['username'];
    $ppassword =$_POST['password'];
    $check_if_login_exists="select * from users ";
    $res=mysqli_query($con,$check_if_login_exists);

    if(!$res) {$response['error'] =  'error';}
    $count=mysqli_num_rows($res);

    if($count==1){
        $user=mysqli_fetch_array($res,1);
        $_SESSION['id']=$user['id'];
        $_SESSION['name']=$user['name'];
        $response['success'] = true;  
    }
    else  {
        $response['success'] = false;
        $response['error'] = $res;
    }
}else {
    $response['success'] = false;
    $response['error'] = 'no values passed';
}

header('Content-type: application/json');
echo json_encode($response);
