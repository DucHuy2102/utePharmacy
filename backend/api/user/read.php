<?php
// Headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/User.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate category object
$user = new User($db);

// Category read query
$result = $user->read();

// Get row count
$num = $result->rowCount();

// Check if any categories
if ($num > 0) {
    // Cat array
    $pd_arr = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $pd_item = array(
            'user_id' => $user_id,
            'username' => $username,
            'password' => $password,
            'fName' => $fName,
            'lName' => $lName,
            'email' => $email,
            'phone' => $phone,
            'birthday' => $birthday,
            'url_avt' => $url_avt,
            'isBlocked' => $isBlocked,
        );

        // Push to "data"
        array_push($pd_arr, $pd_item);
    }

    // Turn to JSON & output
    echo json_encode($pd_arr);

} else {
    // No Categories
    echo json_encode(
        array('message' => 'No user')
    );
}