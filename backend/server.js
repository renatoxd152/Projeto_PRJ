import app from './src/app.js'
import cliente from './src/Controllers/Cliente/Cliente.js'
import produto from './src/Controllers/Produto/Produto.js'
import compra from './src/Controllers/Compras/Compras.js'
import itens_compra from './src/Controllers/Compras/Itens_compras.js'
const port = 3000
app.use(cliente)
app.use(produto)
app.use(compra)
app.use(itens_compra)
app.listen(port,()=>
{
    console.log(`Servidor rodando no endereço http://localhost:${port}`)
})