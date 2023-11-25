<?php
class Product_Image
{
  // DB Stuff
  private $conn;
  private $table = 'product_image';

  // Properties
  public $product_id;
  public $url;
  
  // Constructor with DB
  public function __construct($db)
  {
    $this->conn = $db;
  }

  // Get Single Category
  public function read_single()
  {
    // Create query
    $query = 'SELECT url FROM '. $this->table . ' WHERE product_id = ? ';

    //Prepare statement
    $stmt = $this->conn->prepare($query);

    // Bind ID
    $stmt->bindParam(1, $this->product_id);

    // Execute query
    $stmt->execute();

    // $result = $stmt->fetch(PDO::FETCH_ASSOC);

    $arr = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      array_push($arr, $url);
    }
    return $arr;
  }

  
}
