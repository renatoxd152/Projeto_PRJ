import { DataTypes } from "sequelize";
import sequelize from "../../banco/banco.js";

const Cliente = sequelize.define('clientes',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    nome:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cpf:{
        type:DataTypes.STRING,
        allowNull:false
    },
    endereco:{
        type:DataTypes.STRING,
        allowNull:false
    },
    telefone:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

sequelize.sync({ force: false }).then(() => {
    console.log('Tabela cliente sincronizado');
  });

export default Cliente