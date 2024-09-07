function processAnotherData(data) {
    const result = [["Unit Name", "Panel Name", "Material", "Length", "Width", "THK", "Top Surface", "Top Barcode", "Bottom Surface", "Bottom Barcode", "Quantity", "Sq.Mtr", "Sq.Feet", "Extra"]];
    let currentUnit = null;
    let quantitySum = 0;
    let sqMtrSum = 0;
    let sqFeetSum = 0;
    let grandTotalQuantity = 0;
    let grandTotalSqMtr = 0;
    let grandTotalSqFeet = 0;

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row.length >= 55) {
            const unitName = row[36];
            if (unitName !== currentUnit) {
                if (currentUnit) {
                    result.push(["", "", "", "", "", "", "", "", "", `Total (${currentUnit})`, quantitySum.toFixed(2), sqMtrSum.toFixed(2), sqFeetSum.toFixed(2), "", true]);
                    grandTotalQuantity += quantitySum;
                    grandTotalSqMtr += sqMtrSum;
                    grandTotalSqFeet += sqFeetSum;
                }
                currentUnit = unitName;
                quantitySum = 0;
                sqMtrSum = 0;
                sqFeetSum = 0;
            }

            const processedRow = [];
            processedRow[0] = (row[1] === "") ? "" : row[36];
            const rowNumber = i + 1;
            const pValue = row[15] || "";
            processedRow[1] = (row[1] === "") ? "" : `${rowNumber - 1} - ${pValue}`;
            const d2 = row[3] || "";
            const e2 = row[4] || "";
            const c2 = row[2] || "";
            if (row[1] !== "") {
                if (d2.includes("PRE_LAM_") && e2.includes("PRE_LAM_")) {
                    processedRow[2] = c2;
                } else if (d2 !== "" && e2 !== "") {
                    processedRow[2] = c2 + "+" + (d2 < e2 ? `${d2}+${e2}` : `${e2}+${d2}`);
                } else {
                    processedRow[2] = c2;
                }
            } else {
                processedRow[2] = "";
            }

            processedRow[3] = (row[1] === "") ? "" : row[53];
            processedRow[4] = (row[1] === "") ? "" : row[54];
            processedRow[5] = (row[1] === "") ? "" : row[55];
            processedRow[6] = (row[1] === "") ? "" : row[4];
            processedRow[7] = (row[1] === "") ? "" : row[41];
            processedRow[8] = (row[1] === "") ? "" : row[3];
            processedRow[9] = (row[1] === "") ? "" : row[42];
            processedRow[10] = (row[1] === "") ? "" : row[11];
            const bbValue = parseFloat(row[53]) || 0;
            const bcValue = parseFloat(row[54]) || 0;
            const lValue = parseFloat(row[11]) || 0;
            const sqMtr = ((bbValue * bcValue) / 1000000 * lValue).toFixed(2);
            const sqFeet = ((((bbValue * bcValue) / 1000000) * lValue) * 10.76).toFixed(2);
            processedRow[11] = (row[1] === "") ? "" : sqMtr;
            processedRow[12] = (row[1] === "") ? "" : sqFeet;
            processedRow[13] = (row[1] === "") ? "" : row[19];

            quantitySum += parseFloat(row[11]) || 0;
            sqMtrSum += parseFloat(sqMtr) || 0;
            sqFeetSum += parseFloat(sqFeet) || 0;

            result.push(processedRow);
        } else {
            console.warn(`Skipping row ${i} due to insufficient columns.`);
        }
    }

    if (currentUnit) {
        result.push(["", "", "", "", "", "", "", "", "", `Total (${currentUnit})`, quantitySum.toFixed(2), sqMtrSum.toFixed(2), sqFeetSum.toFixed(2), "", true]);
        grandTotalQuantity += quantitySum;
        grandTotalSqMtr += sqMtrSum;
        grandTotalSqFeet += sqFeetSum;
    }

    result.push(["", "", "", "", "", "", "", "", "", "Grand Total", grandTotalQuantity.toFixed(2), grandTotalSqMtr.toFixed(2), grandTotalSqFeet.toFixed(2), "", true]);

    return result;
}
