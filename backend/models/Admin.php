<?php
class Admin
{
    // DB Stuff
    private $conn;
    private $table = 'admin';

    // Properties
    public $admin_id;
    public $username;
    public $password;

    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function login()
    {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE username = ? LIMIT 1';

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->username);

        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $this->username = $row['username'];
                $this->password = $row['password'];
                $this->admin_id = $row['admin_id'];
                return true;
            }
        }
        // printf("Error: %s.\n", $stmt->error);
        return false;
    }

}