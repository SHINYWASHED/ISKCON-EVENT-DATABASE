<?php
session_start();

// Check if the user is an admin
if (!isset($_SESSION['isAdmin']) || $_SESSION['isAdmin'] !== true) {
    die(json_encode(["status" => "error", "message" => "Unauthorized access!"]));
}

$targetDir = "uploads/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (!empty($_FILES["image"]["name"])) {
    $fileName = basename($_FILES["image"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

    $allowedTypes = ["jpg", "jpeg", "png", "gif"];
    if (in_array(strtolower($fileType), $allowedTypes)) {
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
            echo json_encode(["status" => "success", "message" => "Image uploaded!", "imagePath" => $targetFilePath]);
        } else {
            echo json_encode(["status" => "error", "message" => "File upload failed."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid file type."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No file uploaded."]);
}
?>
