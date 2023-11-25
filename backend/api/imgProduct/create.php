<?php

/**
 *  An example CORS-compliant method.  It will allow any GET, POST, or OPTIONS requests from any
 *  origin.
 *
 *  In a production environment, you probably want to be more restrictive, but this gives you
 *  the general idea of what is involved.  For the nitty-gritty low-down, read:
 *
 *  - https://developer.mozilla.org/en/HTTP_access_control
 *  - https://fetch.spec.whatwg.org/#http-cors-protocol
 *
 */
function cors()
{

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400'); // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
            // may also be using PUT, PATCH, HEAD etc {
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        }

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }

        exit(0);
    }

    // echo "You have CORS!";
}
cors();
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

include_once '../../config/Database.php';
include_once '../../models/ImageProduct.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$product = new ImageProduct($db);

// Get ID
$product->product_id = isset($_GET['id']) ? $_GET['id'] : die();
// echo json_encode(
//     array('message' => $product->product_id)
// );
// return;
$data = json_decode(file_get_contents("php://input"));
$product->url = $data->url;

$result = $product->create();
$result = $product->read_last();

$num = $result->rowCount();

if ($num > 0) {
    // Cat array
    $pd_arr = array();
    // $pd_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $pd_item = array(
            // 'product_id' => $product_id,
            'id' => $id,
            'url' => $url,
        );

        // Push to "data"

        array_push($pd_arr, $pd_item);
    }

    // Turn to JSON & output
    echo json_encode($pd_arr[0]);

} else {
    // No Categories
    echo json_encode(
        array('message' => 'No Categories Found')
    );
}

// // print_r($result);
// echo json_encode(
//     array('id' => 'file is uploaded')
// );