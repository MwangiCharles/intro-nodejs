const{createPool} = require('mysql2')

const pool = createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'farm',
    waitForConnections: true,
    connectionLimit: 10,
   
});
pool.query('select * from kcacart_db.users', (err, res) => {
    console.log(res) })
