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

        // Get users
        $selectSql = "SELECT * from JMB_Users";
        $result = $conn->query($selectSql);
        if ($result === FALSE) {
            echo "Error: " . $selectSql . "<br>" . $conn->error;
        }

        $user = $_POST['username'];
        $password = md5($_POST['password']);

        $found = false;

        while(($object = mysqli_fetch_object($result))) {
            if($object->username === $user && $object->password === $password){
                $found = true;
            }
        }

        if($found === true){
            echo "success";
        } else {
            echo "failure";
        }

        $conn->close();
    }
?>