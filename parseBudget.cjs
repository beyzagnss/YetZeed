const xlsx = require('xlsx');
const fs = require('fs');

try {
  const workbook = xlsx.readFile('budget.xlsx');
  const result = {};

  workbook.SheetNames.forEach(sheetName => {
    result[sheetName] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: false });
  });

  fs.writeFileSync('budget.json', JSON.stringify(result, null, 2));
  console.log('Successfully written to budget.json');
} catch (e) {
  console.error(e);
}
