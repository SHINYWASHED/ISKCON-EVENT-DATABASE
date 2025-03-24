document.addEventListener("DOMContentLoaded", function () {
    const sheetId = "1QFLzxYMmlhg0SV8C1cEXPxo9CaM1YKgU8zmQL0ybeEk"; // Your Google Sheets ID
    const apiKey = "AIzaSyBuVqvwSK-NK2-GXyAsbpN49a1RxajCKwc"; // Your API Key

    // Define sheets with their respective elements
    const sheets = [
        { range: "Sheet1!A1:Z100", elementId: "sheetData1" },
        { range: "Sheet2!A1:Z100", elementId: "sheetData2" },
        { range: "Sheet3!A1:Z100", elementId: "sheetData3" },
        { range: "Sheet4!A1:Z100", elementId: "sheetData4" },
        { range: "Sheet5!A1:Z100", elementId: "sheetData5" }
    ];

    sheets.forEach(sheet => {
        if (document.getElementById(sheet.elementId)) {
            fetchSheetData(sheetId, sheet.range, apiKey, sheet.elementId);
        }
    });

    // Gallery Feature
    initGallery();
});

// Function to Fetch Google Sheets Data
function fetchSheetData(sheetId, range, apiKey, elementId) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayData(data, elementId))
        .catch(error => {
            console.error(`Error fetching data for ${elementId}:`, error);
            document.getElementById(elementId).innerHTML = `<p class="error">Unable to load data. Please try again later.</p>`;
        });
}

// Function to Display Data in Table
function displayData(data, elementId) {
    if (!data.values || data.values.length === 0) {
        document.getElementById(elementId).innerHTML = `<p class="no-data">No data available.</p>`;
        return;
    }

    let table = `<table class="styled-table"><thead><tr>`;
    data.values[0].forEach(header => table += `<th>${header}</th>`);
    table += `</tr></thead><tbody>`;

    data.values.slice(1).forEach(row => {
        table += `<tr>`;
        row.forEach(cell => table += `<td>${cell || "-"}</td>`); // Display '-' for empty cells
        table += `</tr>`;
    });

    table += `</tbody></table>`;

    document.getElementById(elementId).innerHTML = table;
}

// Function to Initialize Gallery
function initGallery() {
    const gallery = document.getElementById("gallery");
    const uploadInput = document.getElementById("imageUpload");

    // Ask for Admin Password
    const password = prompt("Enter Admin Password to Upload Images:");
    if (password === "your_secure_password") {
        uploadInput.style.display = "block"; // Show upload input
    } else {
        alert("Incorrect password! You cannot upload images.");
    }

    // Upload & Display Image
    uploadInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.classList.add("gallery-img");
                gallery.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
}
