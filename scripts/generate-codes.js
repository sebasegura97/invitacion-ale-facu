/**
 * Script para generar códigos de invitación únicos
 * Uso: node scripts/generate-codes.js [cantidad]
 */

function generateCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function generateUniqueCodes(count) {
  const codes = new Set();
  
  while (codes.size < count) {
    codes.add(generateCode());
  }
  
  return Array.from(codes);
}

// Obtener cantidad de códigos a generar (default: 10)
const count = parseInt(process.argv[2]) || 10;

console.log(`\n🎉 Generando ${count} códigos únicos de invitación...\n`);

const codes = generateUniqueCodes(count);

console.log('Códigos generados:');
console.log('─────────────────');
codes.forEach((code, index) => {
  console.log(`${(index + 1).toString().padStart(3, ' ')}. ${code}`);
});

console.log('\n📋 Template SQL para insertar invitaciones:\n');
console.log('INSERT INTO invitations (name, guests, code) VALUES');

codes.forEach((code, index) => {
  const comma = index < codes.length - 1 ? ',' : ';';
  console.log(`  ('Nombre Invitado ${index + 1}', 2, '${code}')${comma}`);
});

console.log('\n✅ Listo! Copia el SQL de arriba y reemplaza los nombres y cantidad de invitados.\n');

