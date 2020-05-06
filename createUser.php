<?php
if(isset($_POST['username'])){
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

    $user = $_POST['username'];
    $password = md5($_POST['password']);

    $sql = "INSERT INTO JMB_Users (username, password, employee) VALUES ('{$user}', '{$password}', 'FALSE')";

    if ($conn->query($sql) === FALSE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>