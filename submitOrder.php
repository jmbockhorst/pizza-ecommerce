<?php
if(isset($_POST['size'])){
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

    $size = $_POST['size'];
    $toppings = $_POST['toppings'];
    $sauce = $_POST['sauce'];
    $cheese = $_POST['cheese'];

    $sql = "INSERT INTO JMB_Pizza_Orders (pizza_size, pizza_toppings, pizza_sauce, pizza_cheese, order_created_time) VALUES ('{$size}', '{$toppings}', '{$sauce}', '{$cheese}', NOW())";

    if ($conn->query($sql) === FALSE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Get number of previous orders
    $selectSql = "SELECT * from JMB_Pizza_Orders";
    $result = $conn->query($selectSql);
    if ($result === FALSE) {
        echo "Error: " . $selectSql . "<br>" . $conn->error;
    }

    // Calculate 5 minutes per order
    $wait_time = $result->num_rows * 5;

    echo $wait_time;

    $conn->close();
}
?>