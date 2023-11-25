<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Product.php';
// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$product = new Product($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

// $product->name = $data->name;
$product->name = $data->name;
$product->url = $data->url;
$product->product_code = $data->product_code;
$product->brand = $data->brand;
$product->cpu = $data->cpu;
$product->ram = $data->ram;
$product->gpu = $data->gpu;
$product->os = $data->os;
$product->old_price = $data->old_price;
$product->price = $data->price;
$product->screen = $data->screen;
$product->size = $data->size;
$product->battery = $data->battery;
$product->amount = $data->amount;
$product->description = $data->description;
$product->rating = $data->rating;
$product->num_reviewer = $data->num_reviewer;
$product->img_cover = $data->img_cover;
$product->create();
$result = $product->read_last();

$num = $result->rowCount();

if ($num > 0) {
    // Cat array
    $pd_arr = array();
    // $pd_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $pd_item = array(
            'product_id' => $product_id,
            'name' => $name,
            'brand' => $brand,
            'name' => $name,
            'ram' => $ram,
            'price' => $price,
            'old_price' => $old_price,
            'amount' => $amount,
            'rating' => $rating,
            'num_reviewer' => $num_reviewer,
            'img_cover' => $img_cover,
            'cpu' => $cpu,
            'description' => $description,
            'isDisabled' => $isDisabled,
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