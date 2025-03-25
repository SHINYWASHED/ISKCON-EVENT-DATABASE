document.addEventListener("DOMContentLoaded", function () {
    const sheetId = "1QFLzxYMmlhg0SV8C1cEXPxo9CaM1YKgU8zmQL0ybeEk";
    const apiKey = "AIzaSyBuVqvwSK-NK2-GXyAsbpN49a1RxajCKwc";

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
