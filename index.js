console.log("Mi primera app en espress.js")
require ('dotenv').config();
const express = require('express')
const {corsMiddleware} = require('./shared/middleware/cors');
const { testConnection } = require('./config/database');
const { syncModels } = require('./shared/models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(corsMiddleware);

// iniciar base de datos

const initializeDatabase = async () => {
    await testConnection();
    await syncModels();
}


app.get('/', (req,res)=>{
    res.json({
        message: "¡Hola Espress funcionando con MySQL!",
        timestamp : new Date ().toString(),
        status : "succes"
    })
});

// login
//  http://localhost:3001
// http://localhost:3001/api/v1
// http://localhost:3001/api/v1/auth/login
//
app.use('/api/v1', require('./routes/auth'));


// iniciar server
const startServer = async() => {
    try{
        await initializeDatabase();
        app.listen(PORT,()=>{
            console.log(`servidor en http://localhost:${PORT}`)
        });
    } catch (error) {
        console.error('error al iniciar el servidor:', error)
    }

}

startServer();




