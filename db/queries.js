// db/queries.js
// ==========================
// Requêtes SQL pour l’application
// ==========================

const queries = {
  // ========================================
  // AUTH & USERS
  // ========================================
  getUserByEmail: 'SELECT * FROM users WHERE email = ?',
  getUserById: 'SELECT * FROM users WHERE id = ?',
  createUser: 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
  updateUser: 'UPDATE users SET username = ?, email = ? WHERE id = ?',
  deleteUser: 'DELETE FROM users WHERE id = ?',
  getAllUsers: 'SELECT id, username, email FROM users',

  // ========================================
  // TRANSACTIONS
  // Table : transactions (id, user_id, category_id, amount, description, date, created_at)
  // ========================================
  createTransaction: `
    INSERT INTO transactions (user_id, amount, category_id, date, description)
    VALUES (?, ?, ?, ?, ?)
  `,
  getTransactionsByUser: `
    SELECT * FROM transactions
    WHERE user_id = ?
    ORDER BY date DESC
  `,
  getTransactionById: `
    SELECT * FROM transactions
    WHERE id = ? AND user_id = ?
  `,
  updateTransaction: `
    UPDATE transactions
    SET amount = ?, category_id = ?, date = ?, description = ?
    WHERE id = ? AND user_id = ?
  `,
  deleteTransaction: `
    DELETE FROM transactions
    WHERE id = ? AND user_id = ?
  `,

  // ========================================
  // CATEGORIES
  // Table : categories (id, name, type, created_at)
  // ========================================
  createCategory: `
    INSERT INTO categories (name, type)
    VALUES (?, ?)
  `,
  getCategories: `
    SELECT * FROM categories
  `,
  updateCategory: `
    UPDATE categories
    SET name = ?, type = ?
    WHERE id = ?
  `,
  deleteCategory: `
    DELETE FROM categories
    WHERE id = ?
  `,

  // ========================================
  // BUDGETS
  // Table : budgets (id, user_id, category_id, amount, currency, start_date, end_date, created_at)
  // ========================================
  createBudget: `
    INSERT INTO budgets (user_id, category_id, amount, start_date, end_date)
    VALUES (?, ?, ?, ?, ?)
  `,
  getBudgetsByUser: `
    SELECT * FROM budgets
    WHERE user_id = ?
  `,
  updateBudget: `
    UPDATE budgets
    SET amount = ?, start_date = ?, end_date = ?
    WHERE id = ? AND user_id = ?
  `,
  deleteBudget: `
    DELETE FROM budgets
    WHERE id = ? AND user_id = ?
  `,

  // ========================================
  // REPORTS (statistiques mensuelles)
  // Table : monthly_statistics
  // ========================================
  getMonthlyReport: `
    SELECT category_id, SUM(amount) AS total, c.type
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ? AND MONTH(t.date) = ? AND YEAR(t.date) = ?
    GROUP BY category_id, c.type
  `,

  // ========================================
  // SETTINGS (paramètres utilisateurs)
  // Table : settings
  // ========================================
  getSettingsByUser: `
    SELECT * FROM settings
    WHERE user_id = ?
  `,
  updateSettings: `
    UPDATE settings
    SET preferred_currency = ?, theme = ?, language = ?
    WHERE user_id = ?
  `,
  createSettings: `
    INSERT INTO settings (user_id, preferred_currency, theme, language)
    VALUES (?, ?, ?, ?)
  `
};

module.exports = queries;
