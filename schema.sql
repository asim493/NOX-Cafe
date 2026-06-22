DROP DATABASE IF EXISTS nox_cafe;
CREATE DATABASE nox_cafe;
USE nox_cafe;

-- 1. Operators Table
CREATE TABLE operators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Secure Matrix Keys Table
CREATE TABLE safe_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category ENUM('voucher', 'game_entry', 'secure_access') NOT NULL,
    code_string VARCHAR(50) NOT NULL UNIQUE,
    value_amount DECIMAL(10, 2) DEFAULT 100.00,
    meta_info VARCHAR(100),
    extra_icon VARCHAR(10)
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