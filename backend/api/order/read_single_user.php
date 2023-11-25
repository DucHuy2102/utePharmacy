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

// Get ID
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die();

// Get product
$result = $orders->read_single_user($user_id);
// print_r($result);
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
                'name' => $nameUser,
                'receiver' => $receiver,
                'phone' => $phoneReceiver,
                'address' => $address,
                'user_id' => $user_id,

            ));
            $ord_arr['data'][$idx]['total'] += $price * $amount;
        } else {
            array_push($ord_arr['data'][$idx]['item'], $ord_item);
            $ord_arr['data'][$idx]['total'] += $price * $amount;
        }
    }
    // Turn to JSON & output
    function date_compare($element1, $element2) {
        $datetime1 = strtotime($element1['date']);
        $datetime2 = strtotime($element2['date']);
        return $datetime2 - $datetime1;
    }
    // Sort the array 
    usort($ord_arr['data'], 'date_compare');
    echo json_encode($ord_arr);
} else {
    // No Categories
    echo json_encode(
        array('message' => 'No Categories Found')
    );
}