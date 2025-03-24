document.addEventListener("DOMContentLoaded", function () {
    loadGallery();
    checkAdmin();
});

function loadGallery() {
    const galleryContainer = document.getElementById("gallery-images");

    // Fetch images from backend (placeholder for now)
    fetch("get-images.php")
        .then(response => response.json())
        .then(images => {
            galleryContainer.innerHTML = "";
            images.forEach(img => {
                const imgElement = document.createElement("img");
                imgElement.src = img.url;
                imgElement.classList.add("gallery-image");
                galleryContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error("Error loading gallery:", error));
}

function checkAdmin() {
    // Placeholder: Replace with actual authentication method
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (isAdmin) {
        document.getElementById("upload-section").style.display = "block";
    }
}

function uploadImage() {
    const fileInput = document.getElementById("imageUpload");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    fetch("upload.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Image uploaded successfully!");
            loadGallery();
        } else {
            alert("Upload failed: " + data.error);
        }
    })
    .catch(error => console.error("Upload error:", error));
}
