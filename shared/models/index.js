const { sequelize } = require("../../config/database");
const User = require("../models/User")

const syncModels = async ()=>{
    try{
        await sequelize.sync({alter: true}); // alter modidica la tabla si es necesario
        console.log("modelos sincronizados con la base de datos");
    } catch (error){
        console.error("Error al sincronizar modelos", error);
    }
};

module.exports = {
    User,
    syncModels
};
