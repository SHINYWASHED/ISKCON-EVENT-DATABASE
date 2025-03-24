<?php
session_start();

// Set your admin password here
$admin_password = "your_secure_password";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $password = $_POST["password"];

    if ($password === $admin_password) {
        $_SESSION["admin"] = true;
        header("Location: upload.php"); // Redirect to the upload page
        exit();
    } else {
        echo "<script>alert('Incorrect password!'); window.location.href='admin-login.html';</script>";
    }
}
?>
