import mysql from 'mysql';

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "morhealth_app",
})

db.connect((err) => {
    if (err) {
        console.error("Error en la conexión de la base de datos", err);
    } else {
        console.log("Conectado a la base de datos correctamente.")
    }
})