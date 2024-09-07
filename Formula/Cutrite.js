function processData(data) {
    const result = [];
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row.length >= 55) {
            const processedRow = [];

            const rowNumber = i + 1;
            const pValue = row[15] || "";
            processedRow[0] = (row[1] === "") ? "" : `${rowNumber - 1} - ${pValue}`;

            const d2 = row[3] || "";
            const e2 = row[4] || "";
            const c2 = row[2] || "";
            if (row[1] !== "") {
                if (d2.includes("PRE_LAM_") && e2.includes("PRE_LAM_")) {
                    processedRow[1] = c2;
                } else if (d2 !== "" && e2 !== "") {
                    processedRow[1] = c2 + "+" + (d2 < e2 ? `${d2}+${e2}` : `${e2}+${d2}`);
                } else {
                    processedRow[1] = c2;
                }
            } else {
                processedRow[1] = "";
            }

            processedRow[2] = row[9] || "";
            processedRow[3] = row[10] || "";
            processedRow[4] = row[11] || "";
            processedRow[5] = "";
            processedRow[6] = "";
            if (row[1] !== "") {
                const fValue = parseFloat(row[5]) || 0;
                const gValue = parseFloat(row[6]) || 0;
                const hValue = parseFloat(row[7]) || 0;
                const maxFtoH = Math.max(fValue, gValue, hValue);
                processedRow[7] = (maxFtoH === 1) ? "Y" : "N";
            } else {
                processedRow[7] = "";
            }
            processedRow[8] = "";
            processedRow[9] = (row[1] === "") ? "" : row[1];
            processedRow[10] = (row[1] === "") ? "" : row[2];
            processedRow[11] = (row[1] === "") ? "" : row[33];
            processedRow[12] = (row[1] === "") ? "" : row[23];
            processedRow[13] = (row[1] === "") ? "" : row[24];
            processedRow[14] = (row[1] === "") ? "" : row[25];
            processedRow[15] = (row[1] === "") ? "" : row[26];
            processedRow[16] = (row[1] === "") ? "" : row[27];
            processedRow[17] = (row[1] === "") ? "" : row[30];
            processedRow[18] = (row[1] === "") ? "" : row[31];
            processedRow[19] = (row[1] === "") ? "" : row[32];
            processedRow[20] = (row[1] === "") ? "" : row[4];
            processedRow[21] = (row[1] === "") ? "" : row[19];
            processedRow[22] = (row[1] === "") ? "" : row[3];
            processedRow[23] = (row[1] === "") ? "" : row[36];
            processedRow[24] = (row[1] === "") ? "" : row[37];
            processedRow[25] = (row[1] === "") ? "" : row[41];
            processedRow[26] = (row[1] === "") ? "" : row[42];
            processedRow[27] = (row[1] === "") ? "" : row[51];
            processedRow[28] = (row[1] === "") ? "" : row[53];
            processedRow[29] = (row[1] === "") ? "" : row[54];
            processedRow[30] = (row[1] === "") ? "" : row[55];
            processedRow[31] = (row[1] === "") ? "" : row[56];

            result.push(processedRow);
        } else {
            console.warn(`Skipping row ${i} due to insufficient columns.`);
        }
    }
    return result;
}