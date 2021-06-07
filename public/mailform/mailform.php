<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/PHPMailer.php';
require './phpmailer/Exception.php';
require './phpmailer/SMTP.php';


$data = json_decode(file_get_contents("php://input"), true);



if ($data){
    //data
    if($data['name']){ $name = $data['name']; }
    if($data['perfecture']){ $perfecture = $data['perfecture']; }
    if($data['email']){ $email = $data['email']; }
    if($data['tel']){ $tel = $data['tel']; }
}

//Mail body
$mailBodyHTML = '
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="background: #f2f2f2; padding: 15px;">
    <div style="background: white;border-radius: 10px; width: 700px; max-width: 100%; margin: 0 auto; padding: 25px 15px;">
        <h2>お客様の情報</h2>
        <ul>
            <li><strong>名前:</strong>'.$name.'<br></li>
            <li><strong>メールアドレス:</strong> '.$email.'<br></li>
        </ul>
    </div>
</body>
</html>
';



$mailBody = "
    お客様の情報\r\n
    名前:".$name."\r\n
    メールアドレス: ".$email."\r\n
";


// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);
//Server settings
$mail->SMTPDebug = 3;                      // Enable verbose debug output
$mail->isSMTP(); 
$mail->isHTML(true);                                           // Send using SMTP
$mail->CharSet = 'UTF-8';

$mail->Host       = '';                    // Set the SMTP server to send through
$mail->SMTPAuth   = true;                                   // Enable SMTP authentication
$mail->Username   = '';                     // SMTP username
$mail->Password   = '';                               // SMTP password
$mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    
    //Recipients
    $mail->setFrom('', mb_encode_mimeheader('うな探偵社'));
    $mail->addAddress('', mb_encode_mimeheader('うな探偵社'));     // Add a recipient
    $mail->addReplyTo($email, $email);

    // Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    // Content
    $mail->Subject = mb_encode_mimeheader('お問合せフォーム');
    $mail->Body    = $mailBodyHTML;
    $mail->AltBody = $mailBody;

try {
    $mail->send();
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
} 
?>
