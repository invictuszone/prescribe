<?php
  $patientid = $_POST['id']; // name the file
  $myNewFolderPath = '../assets/images/patients/'.$_POST['id'];

  if(!file_exists($myNewFolderPath))
  {
    mkdir($myNewFolderPath,0777, true);
    echo "Done";
  }


  $path = '../assets/images/patients/'.$_POST['id'].'/'. $_POST['Picture'];
  if(!empty($_FILES))
  {
    if(move_uploaded_file($_FILES['file']['tmp_name'], $path))
    {
      echo "Works";
    }
    else{
      echo "InnerError";
    }
  }
  else{
    echo "avatar";
    copy('../assets/images/avatar.png', $path);
  }
  echo $_POST['state'];
?>
