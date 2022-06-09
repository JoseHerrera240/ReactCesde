<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
include 'DBConfig.php';
// Create connection
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');
 
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);

// Populate Student ID from JSON $obj array and store into $S_ID.
$S_correo = $obj['correo'];
$sql = "SELECT * FROM clientdetailtable WHERE correo = '$S_correo'";
$result = $conn->query($sql);
$json = '';
if ($result->num_rows > 0) {
    while ($row[] = $result->fetch_assoc()) {
        $item = $row;
        $json = json_encode($item);
    }
} else {
    echo "El estudiante no se encuentra ...";
}
echo $json;
$conn->close();
?>