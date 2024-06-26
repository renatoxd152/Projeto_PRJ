import { DataTypes } from "sequelize";
import sequelize from "../../banco/banco.js";
import Produto from "../Produto/ProdutoModel.js";
import Compra from "./ComprasModel.js";

const ItensCompra = sequelize.define('itensPedido',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    quantidade:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    valor_total:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
},{
    
    timestamps: false
    
})

ItensCompra.belongsTo(Compra,{
    foreignKey:'id_compra'
})

ItensCompra.belongsTo(Produto,{
    foreignKey:'id_produto'
})
sequelize.sync({ force: false }).then(() => {
    console.log('Tabela itens da compra sincronizado');
  });

export default ItensCompra