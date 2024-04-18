import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect:"sqlite",
    storage:'\src\\banco\\loja.sqlite'
})

export default sequelize