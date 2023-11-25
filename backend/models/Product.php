<?php
class Product
{
    // DB Stuff
    private $conn;
    private $table = 'product';

    // Properties
    public $product_id;
    public $name;
    public $url;
    public $product_code;
    public $brand;
    public $cpu;
    public $ram;
    public $gpu;
    public $os;
    public $old_price;
    public $price;
    public $screen;
    public $size;
    public $battery;
    public $amount;
    public $description;
    public $rating;
    public $num_reviewer;
    public $img_cover;
    public $isDisabled;

    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        // Create query
        $query = 'SELECT * FROM ' . $this->table;
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
        $stmt->bindParam(1, $this->id);

        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set properties
        $this->product_id = $row['product_id'];
        $this->name = $row['name'];
        $this->url = $row['url'];
        $this->product_code = $row['product_code'];
        $this->brand = $row['brand'];
        $this->cpu = $row['cpu'];
        $this->ram = $row['ram'];
        $this->gpu = $row['gpu'];
        $this->os = $row['os'];
        $this->old_price = $row['old_price'];
        $this->price = $row['price'];
        $this->screen = $row['screen'];
        $this->size = $row['size'];
        $this->battery = $row['battery'];
        $this->amount = $row['amount'];
        $this->description = $row['description'];
        $this->rating = $row['rating'];
        $this->num_reviewer = $row['num_reviewer'];
        $this->img_cover = $row['img_cover'];
        $this->isDisabled = $row['isDisabled'];
    }

    public function read_last()
    {
        // Create query
        $query = 'SELECT * FROM ' . $this->table . ' ORDER BY product_id DESC LIMIT 1';
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        // $stmt->bindParam(1, $this->product_id);

        // Execute query
        $stmt->execute();

        return $stmt;

    }

    // Create Product
    public function create()
    {
        // Create query
        $query = 'INSERT INTO ' . $this->table . ' SET name=:name,url=:url,product_code=:product_code,brand=:brand,cpu=:cpu,ram=:ram,gpu=:gpu,os=:os,old_price=:old_price,price=:price,screen=:screen,size=:size,battery=:battery,amount=:amount,description=:description,rating=:rating,num_reviewer=:num_reviewer,img_cover=:img_cover';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->url = htmlspecialchars(strip_tags($this->url));
        $this->product_code = htmlspecialchars(strip_tags($this->product_code));
        $this->brand = htmlspecialchars(strip_tags($this->brand));
        $this->cpu = htmlspecialchars(strip_tags($this->cpu));
        $this->ram = htmlspecialchars(strip_tags($this->ram));
        $this->gpu = htmlspecialchars(strip_tags($this->gpu));
        $this->os = htmlspecialchars(strip_tags($this->os));
        $this->old_price = htmlspecialchars(strip_tags($this->old_price));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->screen = htmlspecialchars(strip_tags($this->screen));
        $this->size = htmlspecialchars(strip_tags($this->size));
        $this->battery = htmlspecialchars(strip_tags($this->battery));
        $this->amount = htmlspecialchars(strip_tags($this->amount));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->rating = htmlspecialchars(strip_tags($this->rating));
        $this->num_reviewer = htmlspecialchars(strip_tags($this->num_reviewer));
        $this->img_cover = htmlspecialchars(strip_tags($this->img_cover));
        // $this->product_id = htmlspecialchars(strip_tags($this->product_id));

        // Bind data
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':url', $this->url);
        $stmt->bindParam(':product_code', $this->product_code);
        $stmt->bindParam(':brand', $this->brand);
        $stmt->bindParam(':cpu', $this->cpu);
        $stmt->bindParam(':ram', $this->ram);
        $stmt->bindParam(':gpu', $this->gpu);
        $stmt->bindParam(':os', $this->os);
        $stmt->bindParam(':old_price', $this->old_price);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':screen', $this->screen);
        $stmt->bindParam(':size', $this->size);
        $stmt->bindParam(':battery', $this->battery);
        $stmt->bindParam(':amount', $this->amount);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':rating', $this->rating);
        $stmt->bindParam(':num_reviewer', $this->num_reviewer);
        $stmt->bindParam(':img_cover', $this->img_cover);
        // $stmt->bindParam(':product_id', $this->product_id);
        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
    // Update Post
    public function update()
    {
        // Create query
        $query = 'UPDATE ' . $this->table . '
                              SET name=:name,url=:url,product_code=:product_code,brand=:brand,cpu=:cpu,ram=:ram,gpu=:gpu,os=:os,old_price=:old_price,price=:price,screen=:screen,size=:size,battery=:battery,amount=:amount,description=:description,rating=:rating,num_reviewer=:num_reviewer,img_cover=:img_cover,isDisabled=:isDisabled WHERE product_id = :product_id';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->url = htmlspecialchars(strip_tags($this->url));
        $this->product_code = htmlspecialchars(strip_tags($this->product_code));
        $this->brand = htmlspecialchars(strip_tags($this->brand));
        $this->cpu = htmlspecialchars(strip_tags($this->cpu));
        $this->ram = htmlspecialchars(strip_tags($this->ram));
        $this->gpu = htmlspecialchars(strip_tags($this->gpu));
        $this->os = htmlspecialchars(strip_tags($this->os));
        $this->old_price = htmlspecialchars(strip_tags($this->old_price));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->screen = htmlspecialchars(strip_tags($this->screen));
        $this->size = htmlspecialchars(strip_tags($this->size));
        $this->battery = htmlspecialchars(strip_tags($this->battery));
        $this->amount = htmlspecialchars(strip_tags($this->amount));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->rating = htmlspecialchars(strip_tags($this->rating));
        $this->num_reviewer = htmlspecialchars(strip_tags($this->num_reviewer));
        $this->img_cover = htmlspecialchars(strip_tags($this->img_cover));
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $this->isDisabled = htmlspecialchars(strip_tags($this->isDisabled));

        // Bind data
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':url', $this->url);
        $stmt->bindParam(':product_code', $this->product_code);
        $stmt->bindParam(':brand', $this->brand);
        $stmt->bindParam(':cpu', $this->cpu);
        $stmt->bindParam(':ram', $this->ram);
        $stmt->bindParam(':gpu', $this->gpu);
        $stmt->bindParam(':os', $this->os);
        $stmt->bindParam(':old_price', $this->old_price);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':screen', $this->screen);
        $stmt->bindParam(':size', $this->size);
        $stmt->bindParam(':battery', $this->battery);
        $stmt->bindParam(':amount', $this->amount);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':rating', $this->rating);
        $stmt->bindParam(':num_reviewer', $this->num_reviewer);
        $stmt->bindParam(':img_cover', $this->img_cover);
        $stmt->bindParam(':product_id', $this->product_id);
        $stmt->bindParam(':isDisabled', $this->isDisabled);
        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
    public function status()
    {
        // Create query
        $query = 'UPDATE ' . $this->table . '
                              SET name=:name,url=:url,product_code=:product_code,brand=:brand,cpu=:cpu,ram=:ram,gpu=:gpu,os=:os,old_price=:old_price,price=:price,screen=:screen,size=:size,battery=:battery,amount=:amount,description=:description,rating=:rating,num_reviewer=:num_reviewer,img_cover=:img_cover WHERE product_id = :product_id';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->url = htmlspecialchars(strip_tags($this->url));
        $this->product_code = htmlspecialchars(strip_tags($this->product_code));
        $this->brand = htmlspecialchars(strip_tags($this->brand));
        $this->cpu = htmlspecialchars(strip_tags($this->cpu));
        $this->ram = htmlspecialchars(strip_tags($this->ram));
        $this->gpu = htmlspecialchars(strip_tags($this->gpu));
        $this->os = htmlspecialchars(strip_tags($this->os));
        $this->old_price = htmlspecialchars(strip_tags($this->old_price));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->screen = htmlspecialchars(strip_tags($this->screen));
        $this->size = htmlspecialchars(strip_tags($this->size));
        $this->battery = htmlspecialchars(strip_tags($this->battery));
        $this->amount = htmlspecialchars(strip_tags($this->amount));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->rating = htmlspecialchars(strip_tags($this->rating));
        $this->num_reviewer = htmlspecialchars(strip_tags($this->num_reviewer));
        $this->img_cover = htmlspecialchars(strip_tags($this->img_cover));
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));

        // Bind data
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':url', $this->url);
        $stmt->bindParam(':product_code', $this->product_code);
        $stmt->bindParam(':brand', $this->brand);
        $stmt->bindParam(':cpu', $this->cpu);
        $stmt->bindParam(':ram', $this->ram);
        $stmt->bindParam(':gpu', $this->gpu);
        $stmt->bindParam(':os', $this->os);
        $stmt->bindParam(':old_price', $this->old_price);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':screen', $this->screen);
        $stmt->bindParam(':size', $this->size);
        $stmt->bindParam(':battery', $this->battery);
        $stmt->bindParam(':amount', $this->amount);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':rating', $this->rating);
        $stmt->bindParam(':num_reviewer', $this->num_reviewer);
        $stmt->bindParam(':img_cover', $this->img_cover);
        $stmt->bindParam(':product_id', $this->product_id);
        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
    // Update Post
    public function updateRating()
    {
        // Create query
        $query = 'UPDATE ' . $this->table . '
                              SET rating=:rating,num_reviewer=:num_reviewer WHERE product_id = :product_id';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->rating = htmlspecialchars(strip_tags($this->rating));
        $this->rating = htmlspecialchars(strip_tags($this->num_reviewer));
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));

        // Bind data
        $stmt->bindParam(':rating', $this->rating);
        $stmt->bindParam(':num_reviewer', $this->num_reviewer);
        $stmt->bindParam(':product_id', $this->product_id);
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
    public function restock() {
        $query = 'UPDATE product SET amount = ? WHERE product_id = ?';
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->amount);
        $stmt->bindParam(2, $this->product_id);
        $stmt->execute();
        return $stmt;
    }
}