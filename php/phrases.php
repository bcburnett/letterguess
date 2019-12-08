<?php
$db = new SQLite3('./phrases.db');
$sql = "SELECT tablename, title FROM categories limit 1 offset abs(random()) % (select count(*)from categories)";
$result = $db->query($sql);
$res = $result->fetchArray(SQLITE3_ASSOC);
$title = $res['title'];
$tablename = $res['tablename'];
$sql = "SELECT phrase FROM ".$tablename." limit 1 offset abs(random()) % (select count(*) from ".$tablename.")";
$result = $db->query($sql);
$res = $result->fetchArray(SQLITE3_ASSOC);
$res['title'] = $title;
$json = json_encode($res);
header("Access-Control-Allow-Origin: *");
echo $json;
