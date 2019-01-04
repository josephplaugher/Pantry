const { Pool } = require('pg')

var db_host;
if(process.env.NODE_ENV === 'production') {
    db_host = process.env.DB_HOST_PROD
} else {
    db_host = process.env.DB_HOST_DEV
}
const Conn = new Pool({
    user: process.env.DB_USERNAME,
    host: db_host,
    database: 'pantry',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})
Conn    
    .connect()
    .catch( error => {
        console.log('db conn error: ',error)
    })


module.exports = Conn;