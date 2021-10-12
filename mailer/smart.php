<?php 

// $name = $_POST['name'];
// $phone = $_POST['phone'];
// $email = $_POST['email'];
// $name = 123;
// $phone = 123;
// $email = 123;

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'ssl://smtp.yandex.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'timskateandslam@yandex.ru';                 // Наш логин
$mail->Password = 'rmhqthkgyqyiooqe';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('timskateandslam@yandex.ru', 'Pulse');   // От кого письмо 
$mail->addAddress('timurprh@gmail.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $_POST['name'] . ' <br>
	Номер телефона: ' . $_POST['phone'] . '<br>
	E-mail: ' . $_POST['email'];

// $mail->Body    = '
// 		Пользователь оставил данные <br> 
// 	Имя:  <br>
// 	Номер телефона: <br>
// 	E-mail: ';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>