const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor() {
        this.db = null;
        this.dbPath = path.join(__dirname, 'data', 'business.db');
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    console.error('Database connection error:', err);
                    reject(err);
                } else {
                    console.log('✅ Database connected');
                    this.initTables().then(resolve).catch(reject);
                }
            });
        });
    }

    async initTables() {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                // Create contacts table
                this.db.run(`
                    CREATE TABLE IF NOT EXISTS contacts (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        email TEXT NOT NULL,
                        phone TEXT,
                        service TEXT,
                        message TEXT NOT NULL,
                        ip_address TEXT,
                        user_agent TEXT,
                        status TEXT DEFAULT 'new',
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    )
                `, (err) => {
                    if (err) console.error('Error creating contacts table:', err);
                });

                // Create admin_users table
                this.db.run(`
                    CREATE TABLE IF NOT EXISTS admin_users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        username TEXT UNIQUE NOT NULL,
                        password_hash TEXT NOT NULL,
                        email TEXT UNIQUE NOT NULL,
                        role TEXT DEFAULT 'admin',
                        last_login DATETIME,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    )
                `, (err) => {
                    if (err) console.error('Error creating admin_users table:', err);
                });

                // Create indexes
                this.db.run(`CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status)`);
                this.db.run(`CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at DESC)`);
                this.db.run(`CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email)`);

                // Insert default admin user if not exists (username: admin, password: admin123)
                const bcrypt = require('bcryptjs');
                const defaultPassword = bcrypt.hashSync('admin123', 10);
                
                this.db.run(`
                    INSERT OR IGNORE INTO admin_users (username, password_hash, email, role)
                    VALUES (?, ?, ?, ?)
                `, ['admin', defaultPassword, 'admin@yourbrand.com', 'admin'], (err) => {
                    if (err) console.error('Error creating default admin:', err);
                    else console.log('✅ Default admin user created (username: admin, password: admin123)');
                });

                resolve();
            });
        });
    }

    // Contact methods
    async insertContact(data) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO contacts (name, email, phone, service, message, ip_address, user_agent)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            
            this.db.run(sql, [
                data.name,
                data.email,
                data.phone,
                data.service,
                data.message,
                data.ip,
                data.userAgent
            ], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    }

    async getContacts(filters = {}) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM contacts WHERE 1=1';
            const params = [];

            if (filters.status) {
                sql += ' AND status = ?';
                params.push(filters.status);
            }

            if (filters.startDate) {
                sql += ' AND created_at >= ?';
                params.push(filters.startDate);
            }

            if (filters.endDate) {
                sql += ' AND created_at <= ?';
                params.push(filters.endDate);
            }

            sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
            params.push(filters.limit || 50, filters.offset || 0);

            this.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    async getContactsCount(filters = {}) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(*) as count FROM contacts WHERE 1=1';
            const params = [];

            if (filters.status) {
                sql += ' AND status = ?';
                params.push(filters.status);
            }

            if (filters.startDate) {
                sql += ' AND created_at >= ?';
                params.push(filters.startDate);
            }

            if (filters.endDate) {
                sql += ' AND created_at <= ?';
                params.push(filters.endDate);
            }

            this.db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
    }

    async getContactById(id) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM contacts WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    async updateContactStatus(id, status) {
        return new Promise((resolve, reject) => {
            this.db.run(
                'UPDATE contacts SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [status, id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });
    }

    async deleteContact(id) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM contacts WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    // Admin methods
    async getAdminUser(username) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM admin_users WHERE username = ?', [username], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    async updateLastLogin(userId) {
        return new Promise((resolve, reject) => {
            this.db.run(
                'UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
                [userId],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });
    }

    // Dashboard stats
    async getDashboardStats() {
        return new Promise((resolve, reject) => {
            const stats = {};

            this.db.serialize(() => {
                // Total contacts
                this.db.get('SELECT COUNT(*) as total FROM contacts', (err, row) => {
                    if (!err) stats.totalContacts = row.total;
                });

                // New contacts
                this.db.get("SELECT COUNT(*) as total FROM contacts WHERE status = 'new'", (err, row) => {
                    if (!err) stats.newContacts = row.total;
                });

                // Read contacts
                this.db.get("SELECT COUNT(*) as total FROM contacts WHERE status = 'read'", (err, row) => {
                    if (!err) stats.readContacts = row.total;
                });

                // Replied contacts
                this.db.get("SELECT COUNT(*) as total FROM contacts WHERE status = 'replied'", (err, row) => {
                    if (!err) stats.repliedContacts = row.total;
                });

                // Recent contacts (last 7 days)
                this.db.get(
                    "SELECT COUNT(*) as total FROM contacts WHERE created_at >= datetime('now', '-7 days')",
                    (err, row) => {
                        if (!err) stats.recentContacts = row.total;
                        resolve(stats);
                    }
                );
            });
        });
    }

    async close() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                this.db.close((err) => {
                    if (err) reject(err);
                    else {
                        console.log('✅ Database connection closed');
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }
}

module.exports = Database;
