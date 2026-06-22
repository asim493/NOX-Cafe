-- Drop and recreate tables
DROP TABLE IF EXISTS safe_codes;
DROP TABLE IF EXISTS operators;

-- 1. Operators Table
CREATE TABLE operators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Secure Matrix Keys Table
CREATE TABLE safe_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL CHECK(category IN ('voucher', 'game_entry', 'secure_access')),
    code_string TEXT NOT NULL UNIQUE,
    value_amount REAL DEFAULT 100.00,
    meta_info TEXT,
    extra_icon TEXT
);

-- Seed Master Operator credentials
INSERT INTO operators (username, password) VALUES 
('nox_root', 'password123');

-- Seed Play Safe Matrix arrays
INSERT INTO safe_codes (category, code_string, meta_info, extra_icon) VALUES
('voucher', '425', 'EXP: 12/26', NULL),
('voucher', '836', 'EXP: 12/26', NULL),
('voucher', '5091', 'EXP: 01/27', NULL),
('voucher', '7284', 'EXP: 01/27', NULL),
('voucher', '193', 'EXP: 02/27', NULL),
('voucher', '3647', 'EXP: 02/27', NULL),
('game_entry', '94716', 'ENTRY #001', '🕹️'),
('game_entry', '28350', 'ENTRY #002', '🎰'),
('game_entry', '61829', 'ENTRY #003', '👾'),
('game_entry', '47503', 'ENTRY #004', '🚀'),
('game_entry', '80264', 'ENTRY #005', '🔥'),
('secure_access', '284751', 'ALPHA', 'nox_root@auth_node:~# decrypt --id 01'),
('secure_access', '941836', 'BETA', 'nox_root@auth_node:~# decrypt --id 02'),
('secure_access', '160394', 'GAMMA', 'nox_root@auth_node:~# decrypt --id 03'),
('secure_access', '735028', 'DELTA', 'nox_root@auth_node:~# decrypt --id 04'),
('secure_access', '509162', 'OMEGA', 'nox_root@auth_node:~# decrypt --id 05');
