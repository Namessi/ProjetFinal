const queries = {
  // AUTH & USERS
  getUserByEmail: 'SELECT * FROM users WHERE email = ?',
  getUserById: 'SELECT * FROM users WHERE id = ?',
  createUser: 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
  updateUser: 'UPDATE users SET username = ?, email = ? WHERE id = ?',
  deleteUser: 'DELETE FROM users WHERE id = ?',
  getAllUsers: 'SELECT id, username, email FROM users',

  // TRANSACTIONS
  createTransaction: 'INSERT INTO transactions (user_id, amount, category_id, type, date, note) VALUES (?, ?, ?, ?, ?, ?)',
  getTransactionsByUser: 'SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC',
  getTransactionById: 'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
  updateTransaction: 'UPDATE transactions SET amount = ?, category_id = ?, type = ?, date = ?, note = ? WHERE id = ? AND user_id = ?',
  deleteTransaction: 'DELETE FROM transactions WHERE id = ? AND user_id = ?',

  // CATEGORIES
  createCategory: 'INSERT INTO categories (user_id, name, icon, color) VALUES (?, ?, ?, ?)',
  getCategoriesByUser: 'SELECT * FROM categories WHERE user_id = ?',
  updateCategory: 'UPDATE categories SET name = ?, icon = ?, color = ? WHERE id = ? AND user_id = ?',
  deleteCategory: 'DELETE FROM categories WHERE id = ? AND user_id = ?',

  // BUDGETS
  createBudget: 'INSERT INTO budgets (user_id, category_id, amount, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
  getBudgetsByUser: 'SELECT * FROM budgets WHERE user_id = ?',
  updateBudget: 'UPDATE budgets SET amount = ?, start_date = ?, end_date = ? WHERE id = ? AND user_id = ?',
  deleteBudget: 'DELETE FROM budgets WHERE id = ? AND user_id = ?',

  // REPORTS
  getMonthlyReport: `
    SELECT category_id, SUM(amount) as total, type 
    FROM transactions 
    WHERE user_id = ? AND MONTH(date) = ? AND YEAR(date) = ?
    GROUP BY category_id, type
  `,

  // SETTINGS
  getSettingsByUser: 'SELECT * FROM settings WHERE user_id = ?',
  updateSettings: 'UPDATE settings SET currency = ?, theme = ?, language = ? WHERE user_id = ?',
  createSettings: 'INSERT INTO settings (user_id, currency, theme, language) VALUES (?, ?, ?, ?)',
};

module.exports = queries;
