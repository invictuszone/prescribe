<?php
 if(!empty($_POST['data']))
{
  $data    = $_POST["result"];
  $data    = json_decode("$data", true);

  $myNewFolderPath = '../assets/images/patients/'.$_POST['id'];

  if(!file_exists($myNewFolderPath))
  {
    mkdir($myNewFolderPath,0777, true);
    echo "Done";
  }

  //just echo an item in the array
  echo "key1 : ".$data["key1"];
    $patientid = $_POST['id']; // name the file
    // $data = $_POST['data'];
    $data = base64_decode($_POST['data']);
    // file_put_contents( "../tmp/test.pdf", $data );
    $fname = $_POST['filename']; // name the file
    $file = fopen("../assets/images/patients/".$_POST['id']."/".$_POST['filename'].".pdf", "w"); // open the file path

    fwrite($file, $data); //save data
    fclose($file);
    // echo "Uploaded ".$fname;
    // echo $data;
}
else
{
    echo "No Data Sent";
}
// return $_POST;
// print_r($_POST);
?>
