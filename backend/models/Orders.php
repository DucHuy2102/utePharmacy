<?php
class Orders
{
    // DB Stuff
    private $conn;
    private $table = 'orders';

    // Properties
    public $order_id;
    public $user_id;
    public $state;
    public $total_ship;
    public $date;
    public $phone;
    public $username;
    public $address;

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
            ' SET user_id = :user_id, state = :state, total_ship = :total_ship, date = :date, username = :username, phone = :phone, address = :address';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->state = htmlspecialchars(strip_tags($this->state));
        $this->total_ship = htmlspecialchars(strip_tags($this->total_ship));
        $this->date = htmlspecialchars(strip_tags($this->date));
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->address = htmlspecialchars(strip_tags($this->address));

        // $this->product_id = htmlspecialchars(strip_tags($this->product_id));

        // Bind data
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':state', $this->state);
        $stmt->bindParam(':total_ship', $this->total_ship);
        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':phone', $this->phone);
        $stmt->bindParam(':address', $this->address);

        // $stmt->bindParam(':product_id', $this->product_id);
        // Execute query
        if ($stmt->execute()) {
            $last_id = $this->conn->lastInsertId();
            return $last_id;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
    public function read()
    {
        $query = 'SELECT O.order_id, O.state, O.total_ship, O.date,O.phone AS phoneReciver, I.amount, I.product_id, I.price, P.name, P.cpu, P.description, P.img_cover, U.phone , CONCAT(U.fName ," ",U.lName) AS name,U.username FROM orders AS O, order_item AS I, product AS P,user AS U WHERE O.order_id = I.order_id AND I.product_id = P.product_id AND U.user_id= O.user_id ORDER BY O.order_id';

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    // Get Single Category
    public function read_single_user($user_id)
    {
        $query = 'SELECT O.order_id, O.state, O.total_ship, O.date, O.username AS receiver,O.phone AS phoneReceiver,O.address, I.amount, I.product_id, I.price, P.name, P.cpu, P.description, P.img_cover, U.phone , CONCAT(U.fName ," ",U.lName) AS nameUser ,U.username FROM orders AS O, order_item AS I, product AS P,user AS U WHERE O.user_id = ? AND O.order_id = I.order_id AND I.product_id = P.product_id  AND U.user_id= O.user_id ORDER BY O.order_id';

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $user_id);
        $stmt->execute();
        return $stmt;
    }
    public function read_single($user_id)
    {
        $query = 'SELECT O.order_id, O.state, O.total_ship, O.date, O.username AS receiver,O.phone AS phoneReceiver,O.address, I.amount, I.product_id, I.price, P.name, P.cpu, P.description, P.img_cover, U.phone , CONCAT(U.fName ," ",U.lName) AS nameUser ,U.username FROM orders AS O, order_item AS I, product AS P,user AS U WHERE O.order_id = ? AND O.order_id = I.order_id AND I.product_id = P.product_id  AND U.user_id= O.user_id ORDER BY O.order_id';

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $user_id);
        $stmt->execute();
        return $stmt;
    }
    public function update()
    {
        $query = 'UPDATE orders SET state = ?, date = ?,total_ship = ?,  username = ?, phone = ?, address = ? WHERE order_id = ? ';
        $stmt = $this->conn->prepare($query);
        $d = strtotime("+5 Hours");
        $date = date("Y-m-d H:i:s", $d);
        $stmt->bindParam(1, $this->state);
        $stmt->bindParam(2, $date);
        $stmt->bindParam(3, $this->order_id);
        $stmt->bindParam(3, $this->total_ship);
        $stmt->bindParam(4, $this->username);
        $stmt->bindParam(5, $this->phone);
        $stmt->bindParam(6, $this->address);
        $stmt->bindParam(7, $this->order_id);
        $stmt->execute();
        return $stmt;
    }

    public function cancel()
    {
        $query = 'UPDATE orders SET state = ?, date = ? WHERE order_id = ? AND state = "Pending"';
        $stmt = $this->conn->prepare($query);
        $d = strtotime("+5 Hours");
        $date = date("Y-m-d H:i:s", $d);
        $stmt->bindParam(1, $this->state);
        $stmt->bindParam(2, $date);
        $stmt->bindParam(3, $this->order_id);
        $stmt->execute();

        $query1 = 'SELECT I.product_id, I.amount AS res_amount, P.amount AS cur_amount
            FROM product AS P, order_item AS I
            WHERE I.product_id IN (
                SELECT I.product_id
                FROM orders AS O, order_item AS I
                WHERE O.order_id = ? AND I.order_id = ?)
            AND I.product_id = P.product_id';
        $stmt1 = $this->conn->prepare($query1);
        $stmt1->bindParam(1, $this->order_id);
        $stmt1->bindParam(2, $this->order_id);
        $stmt1->execute();
        $num = $stmt1->rowCount();
        if ($num > 0) {
            // Cat array
            while ($row = $stmt1->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $query_restock = 'UPDATE product SET amount = ? + ? WHERE product_id = ?';
                $stmt_restock = $this->conn->prepare($query_restock);
                $stmt_restock->bindParam(1, $res_amount);
                $stmt_restock->bindParam(2, $cur_amount);
                $stmt_restock->bindParam(3, $product_id);
                $stmt_restock->execute();
                if (!$stmt_restock) {
                    return $stmt_restock;
                }
            }
        }
        return $stmt;
    }
}