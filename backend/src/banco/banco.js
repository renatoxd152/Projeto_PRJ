import { Sequelize } from "sequelize";

const sequelize = new Sequelize("loja_banco","root","",{
    dialect:"mysql",
    host:"localhost",
    port:"3306"
})

export default sequelize