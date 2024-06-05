import { DataTypes } from "sequelize";
import sequelize from "../../banco/banco.js";

const Usuario = sequelize.define('usuarios',
{
    id:
    {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    nome:
    {
        type:DataTypes.STRING,
        allowNull:false
    }
    ,
    cpf:{
        type:DataTypes.STRING(11),
        allowNull:false
    },
    senha:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tipo:{
        type:DataTypes.ENUM('COMUM','ADMIN'),
        allowNull:false
    }},
    {
        timestamps:false
    })

sequelize.sync({ force: false }).then(() => {
    console.log('Tabela usuário sincronizado');
  });


export default Usuario