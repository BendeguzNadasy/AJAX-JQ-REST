<?php

require './MySqlDB.php';
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $mySql = new MySqlDB();

    $mySql->torol("telefonkonyvem", "ID=" . $_GET["ID"]);
}

