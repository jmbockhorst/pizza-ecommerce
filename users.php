<?php
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

    // Get users
    $selectSql = "SELECT * from JMB_Users";
    $result = $conn->query($selectSql);
    if ($result === FALSE) {
        echo "Error: " . $selectSql . "<br>" . $conn->error;
    }

    $items = array();

    while(($object = mysqli_fetch_object($result))) {
        array_push($items, $object);
    }

    echo json_encode($items);

    $conn->close();
?>