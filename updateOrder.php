<?php
if(isset($_POST['orderId'])){
    $host = "www.math-cs.ucmo.edu";
    $username = "cs4130_sp2020";
    $password = "tempPWD!";
    $dbname = "cs4130_sp2020";

    // Create connection
    $conn = mysqli_connect($host, $username, $password, $dbname);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $orderId = $_POST['orderId'];
    $type = $_POST['type'];
    $checked = $_POST['checked'];

    if($checked === 'true'){
        $sql = "UPDATE JMB_Pizza_Orders SET order_{$type}_time = NOW() WHERE order_id = {$orderId}";
    } else {
        $sql = "UPDATE JMB_Pizza_Orders SET order_{$type}_time = NULL WHERE order_id = {$orderId}";
    }

    if ($conn->query($sql) === FALSE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>