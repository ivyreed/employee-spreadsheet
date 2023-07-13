const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3210;
const app = express();
console.log (`${PORT}`)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const work_db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Louiseh1!',
    database: 'work_db'
  },
  console.log(`work_db connection verrified.`)
);
app.use((req, res) => {
  res.status(404).end();
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = {work_db};