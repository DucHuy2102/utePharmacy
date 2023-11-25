<?php
class ImageProduct
{
    // DB Stuff
    private $conn;
    private $table = 'product_image';

    // Properties
    public $product_id;
    public $id;
    public $url;

    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        // Create query
        $query = 'SELECT id, name, created_at FROM' . $this->table . ' ORDER BY created_at DESC';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Get Single Post
    public function read_single()
    {
        // Create query
        $query = 'SELECT * FROM ' . $this->table . ' p
                               WHERE
                                 p.product_id = ?';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(1, $this->product_id);

        // Execute query
        $stmt->execute();

        return $stmt;

    }
// Get Img vua ms upload
    public function read_last()
    {
        // Create query
        $query = 'SELECT * FROM ' . $this->table . ' p
                           WHERE
                             p.product_id = ? ORDER BY ID DESC LIMIT 1';
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(1, $this->product_id);

        // Execute query
        $stmt->execute();

        return $stmt;

    }
    public function create()
    {
        $query = "INSERT into product_image (product_id,url) VALUES (?,?)";
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(1, $this->product_id);
        $stmt->bindParam(2, $this->url);

        // Execute query
        $stmt->execute();
        return $stmt;
    }
    public function update()
    {}
    public function delete()
    {
        // Create query
        $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Bind data
        $stmt->bindParam(':id', $this->id);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
}