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

    // ✅ Dynamically Load Gallery Images
    if (document.getElementById("gallery")) {
        const imageNames = ["event1.jpg", "event2.jpg", "event3.jpg", "event4.jpg", "event5.jpg"];
        const gallery = document.getElementById("gallery");

        imageNames.forEach(img => {
            let imageElement = document.createElement("img");
            imageElement.src = `images/${img}`;
            imageElement.alt = img.split('.')[0];
            gallery.appendChild(imageElement);
        });
    }
});

// ✅ Function to Fetch Data from Google Sheets
function fetchSheetData(sheetId, range, apiKey, elementId) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.values) {
                let table = "<table class='styled-table'><thead><tr>";
                data.values[0].forEach(header => table += `<th>${header}</th>`);
                table += "</tr></thead><tbody>";

                data.values.slice(1).forEach(row => {
                    table += "<tr>";
                    row.forEach(cell => table += `<td>${cell || "-"}</td>`);
                    table += "</tr>";
                });

                table += "</tbody></table>";
                document.getElementById(elementId).innerHTML = table;
            } else {
                document.getElementById(elementId).innerHTML = "<p class='no-data'>No data available.</p>";
            }
        })
        .catch(error => {
            console.error(`Error fetching data for ${elementId}:`, error);
            document.getElementById(elementId).innerHTML = "<p class='error'>Unable to load data. Please try again later.</p>";
        });
}
