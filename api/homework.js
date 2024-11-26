// api/homework.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

function getHomeworkData(date, callback) {
  const query = 'SELECT * FROM homework WHERE date = ?';
  pool.execute(query, [date], (err, results) => {
    if (err) {
      console.error('Database query error: ', err);
      return callback(err, null);
    }
    callback(null, results);
  });
}

module.exports = async (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // 格式化为 YYYY-MM-DD

  getHomeworkData(today, (err, data) => {
    if (err) {
      res.status(500).json({ error: '无法加载家课数据' });
    } else {
      res.status(200).json(data);
    }
  });
};
