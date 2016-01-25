<?php
	
	if(!empty($_FILES)){
		if($_FILES['error']==0){
			$file_name = $_FILES['file']['name'];
			$tmp_name = $_FILES['file']['tmp_name'];
			$rootDirectory = $_REQUEST['rootDirectory'];
			$path_name = $_SERVER['DOCUMENT_ROOT'].'/'.$rootDirectory.'/images/admin/partners/';
			$location = $path_name . $file_name;  
			$setArr = array();
			if(move_uploaded_file($tmp_name, $location)){
				$setArr = array('uploaded_file'=>$file_name);
				echo  json_encode($setArr);
			}
		}
	}
?>