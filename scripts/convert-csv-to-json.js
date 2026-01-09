const fs = require('fs');
const path = require('path');

// Read CSV file
const csvPath = 'C:/Users/iniya/Downloads/Independence Data - Edited - Independence Data.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV (simple parser - handles quoted values)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const lines = csvContent.split('\n').filter(line => line.trim());
const headers = parseCSVLine(lines[0]);
const data = [];

for (let i = 1; i < lines.length; i++) {
  const values = parseCSVLine(lines[i]);
  const obj = {};
  
  headers.forEach((header, idx) => {
    let value = values[idx] || '';
    header = header.trim();
    value = value.trim();
    
    if (header === 'Home/Away') {
      obj['Location'] = value;
    } else if (header === 'Opponent' || header === 'Player') {
      obj[header] = value;
    } else if (header === 'MINS' || header === 'FGA' || header === '2FGA' || header === '3FGA' || 
               header === 'FTA' || header === 'OREB' || header === 'DREB' || header === 'AST' || 
               header === 'TO' || header === 'STL' || header === 'BLK') {
      obj[header] = value === '' || value === '0' ? 0 : parseFloat(value) || 0;
    } else if (header === 'FG%' || header === '2FG%' || header === '3FG%' || header === 'FT%') {
      // Handle percentage - remove % and convert to decimal
      if (value.includes('%')) {
        value = value.replace('%', '');
      }
      const num = parseFloat(value);
      if (isNaN(num)) {
        obj[header] = 0;
      } else {
        // If > 1, assume it's 0-100 format, convert to 0-1
        obj[header] = num > 1 ? num / 100 : num;
      }
    } else if (header === 'REB') {
      // Keep REB as formula string or calculate
      obj[header] = value || `=SUM(L${i+1}+M${i+1})`;
    }
  });
  
  data.push(obj);
}

// Write JSON file
const outputPath = path.join(__dirname, '../data/independence_data.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log(`Converted ${data.length} records to JSON`);
console.log(`Sample record:`, JSON.stringify(data[0], null, 2));


