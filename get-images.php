<?php
$galleryDir = "gallery/";

if (!file_exists($galleryDir)) {
    mkdir($galleryDir, 0777, true);
}

$images = array_diff(scandir($galleryDir), ['.', '..']);

$imageURLs = [];
foreach ($images as $image) {
    $imageURLs[] = $galleryDir . $image;
}

echo json_encode($imageURLs);
?>
