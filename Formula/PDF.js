function downloadPDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'landscape',
        format: 'a4',
        unit: 'mm',
        hotfixes: ["px_scaling"]
    });

    const fileName = document.getElementById('boqFileName').value.trim() || `${originalFileName}_BOQ.pdf`;
    const userName = document.getElementById('userName').value || "N/A";
    const dateTime = new Date().toLocaleString();
    const projectName = "";

    doc.setFontSize(12);

    const logoImg = new Image();
    logoImg.src = '/Src/artech.png';
    logoImg.onload = () => {
        const pageWidth = doc.internal.pageSize.width;
        const logoWidth = 100;
        const logoHeight = 30;
        const x = pageWidth - logoWidth - 10;
        const y = 5;

        doc.addImage(logoImg, 'PNG', x, y, logoWidth, logoHeight);
        doc.text("Order Number: " + orderNumber, 8, 10);
        doc.text("Customer Name: " + customerName, 8, 18);
        doc.text("User Name: " + userName, 8, 26);
        doc.text("Project Name: " + projectName, 8, 34);

        doc.autoTable({
            startY: 40,
            head: [data[0]],
            body: data.slice(1),
            styles: {
                cellPadding: 1,
                fontSize: 7,
                valign: 'middle',
                halign: 'center',
                minCellHeight: 10,
            },
            headStyles: {
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                fontSize: 9,
                halign: 'center'
            },
            bodyStyles: {
                lineWidth: 0.1,
                lineColor: [0, 0, 0],
                halign: 'center',
            },
            tableLineColor: [0, 0, 0],
            margin: { top: 5, bottom: 8, left: 3, right: 3 },
            didParseCell: function (data) {
                const row = data.row.raw;
                const isTotalRow = row && row[9] && (row[9].startsWith("Total") || row[9] === "Grand Total");

                if (isTotalRow) {
                    data.cell.styles.fontSize = 9;
                    data.cell.styles.fontStyle = 'bold';
                }
            },
            didDrawPage: function (data) {
                const pageWidth = doc.internal.pageSize.width;
                const margin = 5;
                const x = pageWidth / 2;
                const y = doc.internal.pageSize.height - margin;
                doc.setFontSize(8);
                doc.text(`${dateTime}`, x, y, { align: 'center' });
            }
        });

        doc.save(fileName);
    };

    logoImg.onerror = () => {
        showToast('Error loading logo image.', true);
    };
}

function showToast(message, isError = false) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = isError ? 'toast toast-error' : 'toast toast-success';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}