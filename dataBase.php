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
  $request = $connect->prepare("SELECT * FROM marker ORDER BY idMarker DESC"); // prepare la requete SQL
  $request->execute();
  $resultat = $request->fetchAll(PDO::FETCH_ASSOC);
  return $resultat;
}

function getAllMarkerDatabase()
{
  $connect = connectToDb();
  $request = $connect->prepare("SELECT * FROM marker WHERE idMarker = idMarker"); // prepare la requete SQL
  $request->execute();
  $resultat = $request->fetchAll(PDO::FETCH_ASSOC);
  return $resultat;
}

function getAllInfoDatabase()
{
  $connect = connectToDb();
  $request = $connect->prepare("SELECT * FROM info WHERE idInfo = idInfo"); // prepare la requete SQL
  $request->execute();
  $resultat = $request->fetchAll(PDO::FETCH_ASSOC);
  return $resultat;
}

function getAllDatabase()
{
  $result = getAllInfoDatabase();
  return $result;
}

function getAllJsonDatabase()
{
  $result[0] = getAllInfoDatabase();
  $result[1] = getAllMarkerDatabase();
  return $result;
}

function setMarkerTodatabase($latitude,$longitude,$idInfo)
{
  $connect = connectToDb();
  $request = $connect->prepare("INSERT INTO `marker`( +\"+ $latitude +\"+ , +\"+ $longitude +\"+ , +\"+ $idInfo +\"+) VALUES ()"); // prepare la requete SQL
  $request->execute();
  $resultat = $request->fetchAll(PDO::FETCH_ASSOC);
  return $resultat;
}

function setInfoToDatabase($name,$nameCreator)
{
  $connect = connectToDb();
  $request = $connect->prepare("INSERT INTO `info`( +\"+ $name +\"+ , +\"+ $nameCreator +\"+ ) VALUES ()"); // prepare la requete SQL
  $request->execute();
  $resultat = $request->fetchAll(PDO::FETCH_ASSOC);
  return $resultat;
}

function setMarkerWithInfoToDatabase($latitude,$longitude,$idInfo,$name,$nameCreator)
{
  setInfoToDatabase($name,$nameCreator);
  setMarkerTodatabase($latitude,$longitude);
}


?>
