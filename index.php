<?php

include 'database.php';

$res = getAlljsonDatabase();
print(json_encode($res));


 ?>
