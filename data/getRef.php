<?php
error_reporting(E_ALL);
include 'config.php';
//declarant, agent

if (isset($_GET['ref'])) {
    $ref = htmlspecialchars($_GET["ref"]);
    if ($ref = "declarant") {
        if (isset($_GET['decType'])) {
            $decType = htmlspecialchars($_GET["decType"]);
            $query = "select * from declarant where type = '$decType';";
            //fio, address, BD, phone, email, numDUL, dateDUL, WhoDUL
        }        
    } elseif ($ref = "agent") {
        $query = ""; 
        //fio, doc, phone, email, numDUL, dateDUL, WhoDUL

    }


    $stmt = $conn->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($result);
} 


$stmt = null;
$conn = null;
?>



