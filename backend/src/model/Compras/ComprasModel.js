import { DataTypes } from "sequelize";
import sequelize from "../../banco/banco.js";
import Cliente from "../Cliente/ClienteModel.js";
import Usuario from "../Usuario/UsuarioModel.js";
const Compra = sequelize.define('compras',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    valor:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    data:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW
    }
})

Compra.belongsTo(Cliente,{
    foreignKey:'id_cliente'
})

Compra.belongsTo(Usuario,{
    foreignKey:'id_admin'
})

sequelize.sync({ force: false }).then(() => {
    console.log('Tabela compras sincronizado');
  });


export default Compra