<?php

include 'database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$res = getAlljsonDatabase();
print(json_encode($res));


 ?>
