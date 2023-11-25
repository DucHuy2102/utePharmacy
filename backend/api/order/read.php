<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Orders.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$orders = new Orders($db);

// Get product
$result = $orders->read();

$num = $result->rowCount();
// Create array
if ($num > 0) {
    // Cat array
    $ord_arr = array();
    $ord_arr['data'] = array();
    $curr_ord_id = -1;
    $idx = -1;
    $total = 0;
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $ord_item = array(
            'product_id' => $product_id,
            'amount' => $amount,
            'price' => $price,
            'name' => $name,
            'amount' => $amount,
            'img_cover' => $img_cover,
            'cpu' => $cpu,
            'description' => $description,
        );
        if ($curr_ord_id != $order_id) {
            $curr_ord_id = $order_id;
            $idx++;
            array_push($ord_arr['data'], array(
                'order_id' => $order_id,
                'state' => $state,
                'item' => array($ord_item),
                'date' => $date,
                'total_ship' => $total_ship,
                'total' => 0,
                'phone' => $phoneReciver,
                'name' => $name,
                'username' => $username,
            ));
            $ord_arr['data'][$idx]['total'] += $price * $amount;
        } else {
            array_push($ord_arr['data'][$idx]['item'], $ord_item);
            $ord_arr['data'][$idx]['total'] += $price * $amount;
        }
    }

    // Turn to JSON & output
    echo json_encode($ord_arr);

} else {
    // No Categories
    echo json_encode(
        array('message' => 'No Categories Found')
    );
}