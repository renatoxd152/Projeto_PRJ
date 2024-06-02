import cors from 'cors'
import app from './src/app.js'
import api from './src/Controllers/Api/Api.js'
import cliente from './src/Controllers/Cliente/Cliente.js'
import compra from './src/Controllers/Compras/Compras.js'
import itens_compra from './src/Controllers/Compras/Itens_compras.js'
import produto from './src/Controllers/Produto/Produto.js'
import usuario from './src/Controllers/Usuario/Usuario.js'
const port = 3000

app.use(cors());
app.use(api)
app.use(cliente)
app.use(produto)
app.use(compra)
app.use(itens_compra)
app.use(usuario)


app.listen(port,()=>
{
    console.log(`Servidor rodando no endereço http://localhost:${port}`)
})