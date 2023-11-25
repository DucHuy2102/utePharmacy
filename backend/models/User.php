<?php
class User
{
    // DB Stuff
    private $conn;
    private $table = 'user';

    // Properties
    public $user_id;
    public $username;
    public $password;
    public $fName;
    public $lName;
    public $email;
    public $phone;
    public $birthday;
    public $url_avt;
    public $isBlocked;

    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function login()
    {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE username = ? LIMIT 1';

        $stmt = $this->conn->prepare($query);
        $this->username = htmlspecialchars(strip_tags($this->username));
        $stmt->bindParam(1, $this->username);

        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $this->username = $row['username'];
                $this->password = $row['password'];
                $this->user_id = $row['user_id'];
                $this->isBlocked = $row['isBlocked'];
                return true;
            }
        }
        // printf("Error: %s.\n", $stmt->error);
        return false;
    }

    public function read()
    {
        // Create query
        $query = 'SELECT * FROM ' . $this->table . ';';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Get Single Category
    public function read_single()
    {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE user_id = ? LIMIT 1';

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->user_id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->user_id = $row['user_id'];
        $this->username = $row['username'];
        $this->password = $row['password'];
        $this->fName = $row['fName'];
        $this->lName = $row['lName'];
        $this->email = $row['email'];
        $this->phone = $row['phone'];
        $this->birthday = $row['birthday'];
        $this->url_avt = $row['url_avt'];
        $this->isBlocked = $row['isBlocked'];

        return $stmt;
    }

    public function create()
    {
        $query = "INSERT into user (username,password, fName, lName, url_avt) VALUES (?,?,?,?,?)";
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->fName = htmlspecialchars(strip_tags($this->fName));
        $this->lName = htmlspecialchars(strip_tags($this->lName));
        $this->url_avt = htmlspecialchars(strip_tags($this->url_avt));
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Bind ID
        $stmt->bindParam(1, $this->username);
        $stmt->bindParam(2, $this->password);
        $stmt->bindParam(3, $this->fName);
        $stmt->bindParam(4, $this->lName);
        $stmt->bindParam(5, $this->url_avt);

        // Execute query
        return $stmt->execute();
    }
    // Update Post
    public function update()
    {

        // Create query
        $query = 'UPDATE ' . $this->table . '
                              SET username=:username,password=:password,fName=:fName,lName=:lName,email=:email,phone=:phone,birthday=:birthday,url_avt=:url_avt,isBlocked=:isBlocked WHERE user_id = :user_id ;';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->fName = htmlspecialchars(strip_tags($this->fName));
        $this->lName = htmlspecialchars(strip_tags($this->lName));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->birthday = htmlspecialchars(strip_tags($this->birthday));
        $this->url_avt = htmlspecialchars(strip_tags($this->url_avt));
        $this->isBlocked = htmlspecialchars(strip_tags($this->isBlocked));

        // Bind data
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':fName', $this->fName);
        $stmt->bindParam(':lName', $this->lName);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':phone', $this->phone);
        $stmt->bindParam(':birthday', $this->birthday);
        $stmt->bindParam(':url_avt', $this->url_avt);
        $stmt->bindParam(':isBlocked', $this->isBlocked);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
    public function delete()
    {}
    public function update_Img($user_id, $url_avt)
    {
        $query = 'UPDATE user SET url_avt = :url_avt WHERE user_id = :user_id';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        $url_avt = htmlspecialchars(strip_tags($url_avt));
        $user_id = htmlspecialchars(strip_tags($user_id));

        $stmt->bindParam(':url_avt', $url_avt);
        $stmt->bindParam(':user_id', $user_id);
        // Execute query

        if ($stmt->execute()) {
            return true;
        }
        printf("Error: %s.\n", $stmt->error);
        return false;
    }
    public function find_user($id)
    {
        $query = 'SELECT * FROM user WHERE user_id = ' . $id;
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        return $stmt;
    }
    public function update_pass($username, $password)
    {
        $query = 'UPDATE user SET password = :password WHERE username = :username';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        $password = htmlspecialchars(strip_tags($password));
        $username = htmlspecialchars(strip_tags($username));

        $password = password_hash($password, PASSWORD_DEFAULT);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':username', $username);
        // Execute query

        if ($stmt->execute()) {
            return true;
        }
        printf("Error: %s.\n", $stmt->error);
        return false;
    }
}