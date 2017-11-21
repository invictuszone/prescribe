<?php

  if(!empty($_FILES))
  {
    $path = '../assets/images/' . $_POST['Picture'];
    if(move_uploaded_file($_FILES['file']['tmp_name'], $path))
    {
      echo "Works";
    }
    else{
      echo "InnerError";
    }
  }
  else{
    echo "Failed";

  }
  echo $_POST['Picture'];
?>
