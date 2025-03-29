<html>
    <head>
    <link rel="stylesheet" href="pizza.css">
    </head>
    <body>
        <?php
            $size = $_POST["size"];
            $pep = $_POST["pep"];
            $mush = $_POST["mush"];
            $crust = $_POST["crust"];
            $name = $_POST["name"];

            $price= 9.95;

            if ($size == "XL"){
                $price += 3.00; 
            }

            if ($pep == "on"){
                $price += 1.25;
            }
            if ($mush == "on"){
                $price += 1.25;
            }

            if ($crust == "deep"){
                $price += 2.00;
            }
            $file = "pizza.txt";
            $content = $name . ", " . $price."\n";
        
            file_put_contents($file, $content);
            
            ?>
            <h1>Order Summary</h1>
            <div class="summary"> 
                Name: <?= $name ?> <br>
                Total Price: $<?= number_format($price,2) ?> <br>
            </div>  

    </body>

</html>