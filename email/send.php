<?php
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(!empty($request)){
		if($request->action=='contact'){
			$to = "pankaj.kumar@trigma.in";
			$subject = $request->subject;
			$message = "Contact email from Solar Change<br><br>";
			$message .= "Name : " . $request->name."<br>";
			$message .= "Email : " . $request->email."<br>";
			$message .= "Subject : " . $request->subject."<br>";
			$message .= "Message : " . $request->message."<br>";

			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			$headers .= 'From: <webmaster@example.com>' . "\r\n";
			$headers .= 'Cc: myboss@example.com' . "\r\n";
			if(mail($to,$subject,$message,$headers)){echo true;}
			else{echo false;}
		}
		else if($request->action=='newsLetter'){
			$to = "pankaj.kumar@trigma.in";
			$subject = 'Newsletter';
			$message = "Thanks for subscribing for newsletter<br><br>";
			$message .= "Email : " . $request->email."<br>";
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			$headers .= 'From: <webmaster@example.com>' . "\r\n";
			$headers .= 'Cc: myboss@example.com' . "\r\n";
			if(mail($to,$subject,$message,$headers)){echo true;}
			else{echo false;}
		}
	}
?> 