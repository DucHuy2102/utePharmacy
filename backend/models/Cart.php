<?php
class Cart
{
    // DB Stuff
    private $conn;
    private $table = 'cart';

    // Properties
    public $user_id;
    public $product_id;
    public $amount;

    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Find user from produc-id
    public function find_product($id)
    {
        $query = "
            SELECT
            cart.product_id, name, product.img_cover, price, cart.amount, cpu, screen, product.amount as available
            FROM
                cart, product
            WHERE cart.user_id = " . $id . " AND cart.product_id = product.product_id
          ";
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        return $stmt;
    }
    public function create()
    {
        $query = "INSERT into cart (user_id, product_id, amount) VALUES (?,?,?)";
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(1, $this->user_id);
        $stmt->bindParam(2, $this->product_id);
        $stmt->bindParam(3, $this->amount);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);
        return false;
    }
    public function read_single()
    {
        $query = 'SELECT *
              FROM ' . $this->table . ' WHERE product_id = ' . $this->product_id . ' AND user_id = ' . $this->user_id;
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        return $stmt;
    }
    public function updateItem($user_id, $product_id, $amount)
    {
        $query = 'UPDATE cart
              SET amount =' . $amount . '
              WHERE product_id = ' . $product_id . ' AND user_id = ' . $user_id;
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);
        return false;
    }
    public function deleteItem($user_id, $product_id)
    {
        $query = 'DELETE FROM cart
              WHERE product_id = ' . $product_id . ' AND user_id = ' . $user_id;
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
    }
    public function deleteAll($user_id)
    {
        $query = 'DELETE FROM cart
              WHERE user_id = ' . $user_id;
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
    }
    public function getCountCart()
    {
        $query = 'SELECT COUNT(product_id) as count FROM cart WHERE user_id= ' . $this->user_id;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    public function getListCart()
    {
        $query = 'SELECT product_id FROM cart WHERE user_id= ' . $this->user_id;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}