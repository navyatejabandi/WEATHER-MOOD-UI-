const fs = require('fs');
const code = fs.readFileSync('/tmp/site.js', 'utf8');

// Search for the main components
function findComponentAround(keyword) {
  const idx = code.indexOf(keyword);
  if (idx === -1) return null;
  const start = Math.max(0, idx - 200);
  const end = Math.min(code.length, idx + 800);
  return code.substring(start, end);
}

console.log('--- Screen HOME component snippet ---');
console.log(findComponentAround('Same sky, different feelings'));

console.log('--- Weather Conditions snippet ---');
console.log(findComponentAround('WEATHER_CONDITIONS'));

console.log('--- Prediction snippet ---');
console.log(findComponentAround('Based on your past'));

console.log('--- Date logic ---');
console.log(findComponentAround('toLocaleDateString'));
