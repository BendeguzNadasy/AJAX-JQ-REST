<?php

require './MySqlDB.php';
parse_str(file_get_contents('php://input'),$adatom);
print_r($adatom);
$mysql = new MySqlDB();
$id = $adatom["ID"];
$nev = $adatom["nev"];
$tel = $adatom["tel"];
$kep = $adatom["kep"];

$updateString = "id='".$id."', nev='".$nev."', tel='".$tel."', kep='".$kep."'";
$mysql->frissit("telefonkonyvem", $updateString, "ID=".$id);