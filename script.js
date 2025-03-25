document.addEventListener("DOMContentLoaded", function () {
    const sheetId = "1QFLzxYMmlhg0SV8C1cEXPxo9CaM1YKgU8zmQL0ybeEk"; // Your Sheet ID
    const apiKey = "AIzaSyBuVqvwSK-NK2-GXyAsbpN49a1RxajCKwc"; // Your API Key

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

    // Load gallery images dynamically
    if (document.getElementById("gallery")) {
        const images = ["event1.jpg", "event2.jpg", "event3.jpg", "event4.jpg"];
        document.getElementById("gallery").innerHTML = images.map(img => 
            `<img src="images/${img}" alt="${img.split('.')[0]}">`
        ).join('');
    }
});

// ✅ Function to Fetch Data from Google Sheets
function fetchSheetData(sheetId, range, apiKey, elementId) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.values) {
                let table = "<table border='1'><tr>";
                data.values[0].forEach(header => {
                    table += `<th>${header}</th>`;
                });
                table += "</tr>";

                data.values.slice(1).forEach(row => {
                    table += "<tr>";
                    row.forEach(cell => {
                        table += `<td>${cell}</td>`;
                    });
                    table += "</tr>";
                });

                table += "</table>";
                document.getElementById(elementId).innerHTML = table;
            } else {
                document.getElementById(elementId).innerHTML = "No data found.";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById(elementId).innerHTML = "Error loading data.";
        });
}
