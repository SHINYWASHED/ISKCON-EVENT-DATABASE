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
        const element = document.getElementById(sheet.elementId);
        if (element) {
            element.innerHTML = `<p class="loading">⏳ Loading data...</p>`; // Show loading text
            fetchSheetData(sheetId, sheet.range, apiKey, sheet.elementId);
        }
    });
});

function fetchSheetData(sheetId, range, apiKey, elementId) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayData(data, elementId))
        .catch(error => {
            console.error(`Error fetching data for ${elementId}:`, error);
            document.getElementById(elementId).innerHTML = `<p class="error">⚠ Unable to load data. Please check your connection or try again later.</p>`;
        });
}

function displayData(data, elementId) {
    if (!data.values || data.values.length === 0) {
        document.getElementById(elementId).innerHTML = `<p class="no-data">📭 No data available.</p>`;
        return;
    }

    let table = `<div class="table-container"><table class="styled-table"><thead><tr>`;
    data.values[0].forEach(header => table += `<th>${header}</th>`);
    table += `</tr></thead><tbody>`;

    data.values.slice(1).forEach(row => {
        table += `<tr>`;
        row.forEach(cell => table += `<td>${cell ? cell : "-"}</td>`); // Display '-' for empty cells
        table += `</tr>`;
    });

    table += `</tbody></table></div>`;

    document.getElementById(elementId).innerHTML = table;
}
