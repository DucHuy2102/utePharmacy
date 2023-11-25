<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

    include_once '../../config/Database.php';
    include_once '../../models/Orders.php';
    include_once '../../models/Order_item.php';
    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate blog post object
    $product = new Orders($db);
    $order_item = new Order_item($db);
    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    // $product->name = $data->name;
    $product->user_id = $data->user_id;
    $product->state = $data->state;
    $product->total_ship = $data->total_ship;

    $d = strtotime("+5 Hours");
    $date = date("Y-m-d H:i:s", $d);

    $product->date = $date;
    
    $product->username = $data->username;
    $product->phone = $data->phone;
    $product->address = $data->address;

    $order_last_insert = $product->create();
    for($i = 0; $i < count($data->cart); $i ++) {

        $order_item->order_id = $order_last_insert;
        $order_item->product_id = $data->cart[$i]->product_id;
        $order_item->amount = $data->cart[$i]->amount;
        $order_item->price = $data->cart[$i]->price;
        $order_item->create();
        $order_item->update_amount($data->cart[$i]->available);
    }

echo "Create done";