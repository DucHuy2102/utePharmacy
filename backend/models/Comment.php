<?php
class Comment
{
    // DB Stuff
    private $conn;
    private $table = 'comment';

    // Properties
    public $product_id;
    public $id;
    public $user_id;
    public $comment;
    public $rate;
    public $datetime;

    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Get Single Category
    public function read_single()
    {
        // Create query
        $query = 'SELECT C.product_id, C.user_id, C.comment, C.rate, C.datetime, U.username, U.fName, U.lName, U.url_avt
                FROM comment AS C, user AS U 
                WHERE C.user_id = U.user_id AND C.product_id = ? ORDER BY datetime DESC;';

        //Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(1, $this->product_id);

        // Execute query
        $stmt->execute();

        // $arr = array();

        // while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        //   extract($row);
        //   array_push($arr, $url);
        // }
        // return $arr;

        return $stmt;
    }
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
    public function create()
    {
        $query = "INSERT into comment (product_id, user_id, comment, rate, `datetime`) VALUES (?,?,?,?,?)";
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(1, $this->product_id);
        $stmt->bindParam(2, $this->user_id);
        $stmt->bindParam(3, $this->comment);
        $stmt->bindParam(4, $this->rate);
        $stmt->bindParam(5, $this->datetime);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
}
