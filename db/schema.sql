CREATE DATABASE IF NOT EXISTS backend_db DEFAULT CHARACTER SET utf8mb4;

-- ===========================================================
-- Base de données : backend_db
-- But : Application de gestion de budget personnel
-- ===========================================================

-- Sélection de la base
USE backend_db;

-- ===========================================================
-- 1. Table : roles
-- Rôles des utilisateurs (admin, utilisateur, etc.)
-- ===========================================================
CREATE TABLE IF NOT EXISTS roles (
    id_role INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom_role VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Rôles utilisateurs';

-- ===========================================================
-- 2. Table : users
-- Utilisateurs de l'application
-- ===========================================================
CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    id_role INT UNSIGNED DEFAULT 1 NULL,
    birth_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_role FOREIGN KEY (id_role)
        REFERENCES roles(id_role)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================================
-- 3. Table : categories
-- Catégories des transactions (ex: loyer, salaire, courses)
-- ===========================================================
CREATE TABLE IF NOT EXISTS categories (
    category_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('revenu', 'depense') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================================
-- 4. Table : sessions
-- Sessions JWT des utilisateurs
-- ===========================================================
CREATE TABLE IF NOT EXISTS sessions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    browser_info TEXT,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiration_time TIMESTAMP NULL,
    active BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_session_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================================
-- 5. Table : transactions
-- Toutes les transactions utilisateur (dépenses et revenus)
-- ===========================================================
CREATE TABLE IF NOT EXISTS transactions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_transaction_user FOREIGN KEY (user_id)
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_transaction_category FOREIGN KEY (category_id)
        REFERENCES categories(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================================
-- 6. Table : password_resets
-- Réinitialisation de mot de passe
-- ===========================================================
CREATE TABLE IF NOT EXISTS password_resets (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_reset_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================================
-- 7. Table : notifications
-- Notifications envoyées aux utilisateurs
-- ===========================================================
CREATE TABLE IF NOT EXISTS notifications (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    content TEXT NOT NULL,
    read_status BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================================
-- 8. Table : budgets
-- Budgets alloués par catégorie et par période
-- ===========================================================
CREATE TABLE IF NOT EXISTS budgets (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'EUR',
    start_date DATE NOT NULL,
    end_date DATE DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_budgets_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_budgets_category FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================================
-- 9. Table : monthly_statistics
-- Calculs automatiques mensuels (revenus, dépenses, épargne)
-- ===========================================================
CREATE TABLE IF NOT EXISTS monthly_statistics (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    month DATE NOT NULL,
    total_expenses DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_income DECIMAL(10,2) NOT NULL DEFAULT 0,
    savings DECIMAL(10,2) GENERATED ALWAYS AS (total_income - total_expenses) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_stats_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT uq_user_month UNIQUE (user_id, month)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================================
-- 10. Table : settings
-- Préférences utilisateur (langue, thème, etc.)
-- ===========================================================
CREATE TABLE IF NOT EXISTS settings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    language VARCHAR(10) DEFAULT 'fr',
    theme VARCHAR(20) DEFAULT 'clair',
    email_notifications BOOLEAN DEFAULT TRUE,
    preferred_currency VARCHAR(10) DEFAULT 'EUR',
    results_per_page INT DEFAULT 10,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_settings_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================================
-- 11. Table : comments
-- Commentaires sur les transactions
-- ===========================================================
CREATE TABLE IF NOT EXISTS comments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    transaction_id INT UNSIGNED DEFAULT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_comments_transaction FOREIGN KEY (transaction_id)
        REFERENCES transactions(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
