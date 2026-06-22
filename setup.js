const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Read schema-sqlite.sql
const schema = fs.readFileSync(path.join(__dirname, 'schema-sqlite.sql'), 'utf8');

const dbPath = path.join(__dirname, 'nox_cafe.db');

// Open or create database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('[SETUP ERROR]: Failed to open database:', err.message);
        process.exit(1);
    }
    
    console.log('[SETUP]: ✓ Connected to SQLite database');
    
    // Execute entire schema
    db.exec(schema, (err) => {
        if (err) {
            console.error('[SETUP ERROR]: Failed to initialize database:', err.message);
            db.close();
            process.exit(1);
        }
        
        console.log('[SETUP COMPLETE]: ✓ Database initialized successfully');
        console.log('✓ Database file "nox_cafe.db" created');
        console.log('✓ Tables created (operators, safe_codes)');
        console.log('✓ Seed data inserted\n');
        db.close();
        process.exit(0);
    });
});
