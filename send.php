<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$text = $_POST['text'];

// Формирование самого письма
$title = "Заявка с сайта";
$body = "
<h2>Привет, у вас новая заявка с сайта Юр. Услуг</h2>
<b>Имя:</b> $name<br>
<b>Почта:</b> $email<br><br>
<b>Сотовый:</b> $tel<br><br>
<b>Сообщение:</b><br>$text
";

// Валидация почты
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'ssl://smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'egorostanin9632@gmail.com'; // Логин на почте
    $mail->Password   = 'Password9632!'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('egorostanin9632@gmail.com', 'Сайт Юр. Услуг'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('respekt531@gmail.com');  
    $mail->addAddress('hhh963123741@gmail.com'); // Ещё один, если нужен


// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
} else {
	$result = "email";
}

?>