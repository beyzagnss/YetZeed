import * as XLSX from 'xlsx';
import * as fs from 'fs';

const filePath = 'C:\\Users\\Beyza\\Desktop\\Annual Budget #15903.xlsx';
try {
  const buffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  console.log("Sheet Names:", JSON.stringify(workbook.SheetNames));
  
  workbook.SheetNames.forEach(sheetName => {
    console.log(`\n--- Sheet: ${sheetName} ---`);
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });
    console.log(JSON.stringify(data.slice(0, 30)));
  });
} catch (e) {
  console.error("Error reading file:", e.message);
}
