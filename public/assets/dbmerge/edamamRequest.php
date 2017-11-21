<?php
    //header('Content-Type: image/jpeg');
    //header("Access-Control-Allow-Origin: *");
$APP_ID = '31df3730';
$APP_KEY = 'db1a9f538bfb496f9e54f63334c7d342';

if(isset($_REQUEST['searchNutrient'])){
	$furi = $_REQUEST['furi'];
	$muri = $_REQUEST['muri'];
	$yield = 1;
	$arr = (object) array(
		"quantity"=> 1,
		"measureURI" => $muri,
		"foodURI"=> $furi
	);
	$ingredients = [$arr];
	$arr = (object) array(
		"yield"=> $yield,
		"ingredients" => $ingredients
	);
	$request = json_encode($arr);
	//echo trim($request);
	//die();
	
	$url = 'https://api.edamam.com/api/food-database/nutrients?app_id='.$APP_ID.'&app_key='.$APP_KEY;
	
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_TIMEOUT_MS, 200000);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	
	$headers = array
	(
		'Accept: application/json'
	); 

	curl_setopt($ch, CURLOPT_HTTPHEADER,$headers); 
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
	curl_setopt($ch, CURLOPT_POSTFIELDS, $request);                                                                  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(    
			'Accept: application/json',                                                                      
		'Content-Type: application/json',                                                                                
		'Content-Length: ' . strlen($request))                                                                       
	);                                                                                                                   
                         
	$result=curl_exec($ch);
	$result = json_decode($result,true);
	$result =  json_encode($result);
	$result = utf8_decode($result);
	echo trim($result);
}



if(isset($_REQUEST['searchFood'])){
	$name = $_REQUEST['name'];
	//$url1 = 'https://api.edamam.com/api/food-database/parser?ingr=apple&app_id=31df3730&app_key=db1a9f538bfb496f9e54f63334c7d342';
	//echo $url1.'<br/>';
	
	$name = urlencode($name);
	$url = 'https://api.edamam.com/api/food-database/parser?ingr='.$name.'&app_id='.$APP_ID.'&app_key='.$APP_KEY.'&page='.$_REQUEST['page'];

	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_TIMEOUT_MS, 200000);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	header("Content-Type: text/html; charset=ISO-8859-1");
	$headers = array
	(
		'Accept: application/json'
	); 
	curl_setopt($ch, CURLOPT_HTTPHEADER,$headers); 
	$result=curl_exec($ch);
	$result = json_decode($result,true);
	$result =  json_encode($result);
	$result = utf8_decode($result);
	echo trim($result);
	//if($result[sizeof($result)-1]=='1')
	//	echo $result[sizeof($result)-1];
}

?>