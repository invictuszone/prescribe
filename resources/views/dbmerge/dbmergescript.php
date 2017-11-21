<?php
// $link = mysql_connect('vidzspotcom.ipagemysql.com', 'diet', '12345678', '3306');
// if (!$link) {
//     die('Could not connect: ' . mysql_error());
// }
// echo 'Connected successfully';
// mysql_select_db(dietspecification);
$servername = "vidzspotcom.ipagemysql.com";
$username = "diet";
$password = "12345678";
$dbname = "dietspecification";
$port = "3306";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

function getItems($conn){
	$sql = 'SELECT a.id, a.name as "Food Name", a1.name as "Ingredient Name", usda.fid as "linked" FROM `fooditems` a left join foodingredients g on a.id = g.FID left join fooditems a1 on g.IID = a1.id left join usdalinked usda on usda.FID = a.id ORDER BY `Food Name` ASC';
	$sql = 'SELECT a.id, a.name as "Food Name", a1.name as "Ingredient Name" FROM `fooditems` a left join foodingredients g on a.id = g.FID left join fooditems a1 on g.IID = a1.id  ORDER BY `Food Name` ASC';
	//echo $sql;
	$items = [];
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			if(!isset($items[$row['id']])){
				$items[$row['id']] = [];
				$items[$row['id']]['id'] = $row['id'];
				//$items[$row['id']]['linked'] = $row['linked'];
				$items[$row['id']]['name'] = $row['Food Name'];
				$items[$row['id']]['ingredients'] = [];
			}else{
				$items[$row['id']]['ingredients'][] =  $row['Ingredient Name'];
			}
		}
	}
//echo sizeof($items);
	//echo '<pre>';
	//var_dump($items);
	//echo '</pre>';
	$conn->close();
	return $items;
}


?>
