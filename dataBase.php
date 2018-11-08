<?php

DEFINE('DB_HOST','127.0.0.1');
DEFINE('DB_USER','root');
DEFINE('DB_NAME','dbgepoulpe');
DEFINE('DB_PASS','');
date_default_timezone_set('Europe/Zurich');

function connectToDb()  // Connection a la base de donnée
{
  static $dbb = null;
  if ($dbb == null)  // si elle est null on la créer
  {
    try
    {
      $connectionString = 'mysql:host=' . DB_HOST . ';dbname='.DB_NAME . '' ;
      $dbb = new PDO($connectionString,DB_USER,DB_PASS);  // On se connecte avec de la gestion d'erreur
      $dbb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch (Exception $e)
    {
      die('Erreur : ' . $e->getMessage());
    }
  }
  return $dbb;
}

function getAllMarker()
{
  $connect = connectToDb();
  $request = $connect->prepare("SELECT * FROM Marker ORDER BY idMarker DESC"); // prepare la requete SQL
  $request->execute();
  $resultat = $request->fetchAll(PDO::FETCH_ASSOC);
  return $resultat;
}


?>
