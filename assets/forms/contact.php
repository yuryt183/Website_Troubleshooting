<?php
if (isset($_POST['submit'])) {
  $full_name = $_POST['full_name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];
  
  // Set the recipient email address here
  $recipient = "yurypro333@gmail.com";
  
  // Set the email subject here
  $email_subject = "New message from $full_name";
  
  // Build the email content
  $email_content = "Name: $full_name\n";
  $email_content .= "Email: $email\n";
  $email_content .= "Subject: $subject\n";
  $email_content .= "Message: $message\n";
  
  // Send the email
  mail($recipient, $email_subject, $email_content);
  
  // Redirect to a success page
  header("Github pages currently doesn't support php scripting. Stay tuned while I try to find a workaround or alternatively, reach out to me through the CONTACT ME link on the top right ");
  exit;
}
?>

