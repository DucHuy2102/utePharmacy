<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Orders.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$order = new Orders($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));
$order->order_id = isset($_GET['id']) ? $_GET['id'] : die();

$result = $order->read_single($order->order_id);
$num = $result->rowCount();
// print_r($result);

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $order->state = $data->state;
    $order->total_ship = $total_ship;
    $order->date = $date;
    $order->phone = $phoneReceiver;
    $order->username = $receiver;
    $order->address = $address;
}

// Update post
if ($order->update()) {
    echo json_encode(
        array('message' => 'Orders Updated',
            'data' => $data->state,
        )
    );
} else {
    echo json_encode(
        array('message' => 'Orders Not Updated',
            'status' => 'Fail')
    );
}