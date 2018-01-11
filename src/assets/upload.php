<?php
// En versiones de PHP anteriores a la 4.1.0, debería utilizarse $HTTP_POST_FILES en lugar
// de $_FILES.

$dir_subida = 'sivStore/';

$fichero_subido = $dir_subida . basename($_FILES['fichero_usuario']['name']);

echo '<pre>';
if (move_uploaded_file($_FILES['fichero_usuario']['tmp_name'], $fichero_subido)) {

    $response_array['status'] = 'success';
	  echo json_encode($response_array);
	  echo json_encode($from_email);
	  header($response_array);
	  return $response_array;
}

else {
  
  $response_array['status'] = 'error';
  echo json_encode($response_array);
  header('Location: /error.html');
}

?>
