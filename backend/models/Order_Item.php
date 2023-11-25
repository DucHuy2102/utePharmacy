<?php
class Order_item
{
  // DB Stuff
  private $conn;
  private $table = 'order_item';

  // Properties
  public $order_id;
  public $product_id;
  public $amount;
  public $price;


  // Constructor with DB
  public function __construct($db)
  {
    $this->conn = $db;
  }

  // Find user from produc-id
  public function create()
  {
      // Create query
      $query = 'INSERT INTO ' . $this->table . 
            ' SET order_id = :order_id, product_id = :product_id, amount = :amount, price = :price';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Clean data
      $this->order_id = htmlspecialchars(strip_tags($this->order_id));
      $this->product_id = htmlspecialchars(strip_tags($this->product_id));
      $this->amount = htmlspecialchars(strip_tags($this->amount));
      $this->price = htmlspecialchars(strip_tags($this->price));
      
      // $this->product_id = htmlspecialchars(strip_tags($this->product_id));

      // Bind data
      $stmt->bindParam(':order_id', $this->order_id);
      $stmt->bindParam(':product_id', $this->product_id);
      $stmt->bindParam(':amount', $this->amount);
      $stmt->bindParam(':price', $this->price);
      
      // $stmt->bindParam(':product_id', $this->product_id);
      // Execute query
      if ($stmt->execute()) {
          return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
  }
  public function update_amount($available)
  {
      $query = 'UPDATE product SET amount = :amount WHERE product_id = :product_id';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      $stmt->bindParam(':product_id', $this->product_id);
      $up = $available - $this->amount;
      $stmt->bindParam(':amount', $up);
      // Execute query

      if ($stmt->execute()) {
          return true;
      }
      printf("Error: %s.\n", $stmt->error);
      return false;
  }
}
