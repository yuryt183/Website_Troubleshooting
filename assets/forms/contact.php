if(isset($_POST['submit'])) {
  // EDIT THE FOLLOWING LINES AS REQUIRED
  $email_to = "yurypro333@gmail.com";
  $email_subject = "Contact Form Submission";
  
  // get form data
  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];
  
  // build email headers
  $headers = "From: $email";
  $headers .= "Reply-To: $email";
  
  // build email content
  $email_message = "Name: $name\n";
  $email_message .= "Email: $email\n";
  $email_message .= "Subject: $subject\n";
  $email_message .= "Message:\n$message\n";
  
  // send email
  mail($email_to, $email_subject, $email_message, $headers);

  // redirect to success page
  header('Location: thank-you.html');
  exit();
}
?>
