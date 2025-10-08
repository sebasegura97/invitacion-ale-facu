const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function initDatabase() {
  try {
    console.log('Creating invitations table...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS invitations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        guests INTEGER NOT NULL,
        code VARCHAR(6) UNIQUE NOT NULL,
        confirmed INTEGER DEFAULT 0,
        message TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        confirmed_at TIMESTAMP
      )
    `;
    
    console.log('✅ Database initialized successfully!');
    console.log('Table "invitations" created with the following structure:');
    console.log('- id: SERIAL PRIMARY KEY');
    console.log('- name: VARCHAR(255) NOT NULL');
    console.log('- guests: INTEGER NOT NULL (max guests allowed)');
    console.log('- code: VARCHAR(6) UNIQUE NOT NULL (6-letter code)');
    console.log('- confirmed: INTEGER DEFAULT 0 (guests confirmed)');
    console.log('- message: TEXT');
    console.log('- created_at: TIMESTAMP DEFAULT NOW()');
    console.log('- confirmed_at: TIMESTAMP');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();
