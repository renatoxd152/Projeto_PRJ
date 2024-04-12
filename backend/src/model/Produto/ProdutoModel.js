import { DataTypes } from "sequelize";
import sequelize from "../../banco/banco.js";

const Produto = sequelize.define('produtos',
{
    id:
    {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
    ,
    nome:
    {
        type:DataTypes.STRING,
        allowNull:false
    },
    preco:
    {
        type:DataTypes.FLOAT,
        allowNull:false  
    },
    quantidade:
    {
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

sequelize.sync({ force: false }).then(() => {
    console.log('Tabela cliente sincronizado');
  });


export default Produto;