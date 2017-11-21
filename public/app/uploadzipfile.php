<?php
 if(!empty($_POST['data']))
{
  $data    = $_POST["result"];
  // $unzip =
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
    $data1 = $_FILES['data'];


    echo "<br>data1<br>";
    var_dump($data1);
    echo "<br><br>";
    echo $data1;

    $zip = zip_open('$_FILES['data']');

  if ($zip)
  {
  while ($zip_entry = zip_read($zip))
    {
    echo "<p>";
    echo "Name: " . zip_entry_name($zip_entry) . "<br />";

    if (zip_entry_open($zip, $zip_entry))
      {
      echo "File Contents:<br/>";
      $contents = zip_entry_read($zip_entry);
      echo "$contents<br />";
      zip_entry_close($zip_entry);
      }
    echo "</p>";
  }

zip_close($zip);
}
      $data = system("unzip $data1.zip");

    $data2 = base64_decode($data);

    echo "<br>data2<br>";
    echo $data2;

    // file_put_contents( "../tmp/test.pdf", $data );
    $fname = $_POST['filename']; // name the file
    $file = fopen("../assets/images/patients/".$_POST['id']."/".$_POST['filename'].".pdf", "w"); // open the file path

    fwrite($file, $data); //save data
    fclose($file);
    // echo "Uploaded ".$fname;
    // echo $data;
}
// elseif (issset($_POST['data'])) {
//   # code...
// }
else
{
    echo "No Data Sent";
}
// return $_POST;
// print_r($_POST);
?>
