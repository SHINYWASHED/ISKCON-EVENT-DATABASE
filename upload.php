<?php
session_start();

// Check if the user is an admin (Replace with actual authentication)
if (!isset($_SESSION['isAdmin']) || $_SESSION['isAdmin'] !== true) {
    echo json_encode(["success" => false, "error" => "Unauthorized access"]);
    exit;
}

// Check if an image is uploaded
if (!isset($_FILES['image']) || $_FILES['image']['error'] != UPLOAD_ERR_OK) {
    echo json_encode(["success" => false, "error" => "Image upload failed"]);
    exit;
}

$uploadDir = "gallery/";
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
$fileType = mime_content_type($_FILES['image']['tmp_name']);

if (!in_array($fileType, $allowedTypes)) {
    echo json_encode(["success" => false, "error" => "Invalid file type"]);
    exit;
}

$fileName = time() . "_" . basename($_FILES["image"]["name"]);
$filePath = $uploadDir . $fileName;

if (move_uploaded_file($_FILES["image"]["tmp_name"], $filePath)) {
    echo json_encode(["success" => true, "url" => $filePath]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to save image"]);
}
?>
