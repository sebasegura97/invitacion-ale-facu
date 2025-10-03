const { sql } = require('@vercel/postgres');

async function initDatabase() {
  try {
    console.log('Creating guests table...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS guests (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        guest_count INTEGER NOT NULL,
        confirmed BOOLEAN DEFAULT FALSE,
        message TEXT,
        gift_message TEXT,
        confirmed_at TIMESTAMP
      )
    `;
    
    console.log('✅ Database initialized successfully!');
    console.log('Table "guests" created with the following structure:');
    console.log('- id: SERIAL PRIMARY KEY');
    console.log('- name: VARCHAR(255) NOT NULL');
    console.log('- guest_count: INTEGER NOT NULL');
    console.log('- confirmed: BOOLEAN DEFAULT FALSE');
    console.log('- message: TEXT');
    console.log('- gift_message: TEXT');
    console.log('- confirmed_at: TIMESTAMP');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();
