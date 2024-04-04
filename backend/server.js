import app from './src/app.js'
import cliente from './src/Controllers/Cliente/Cliente.js'
const port = 3000
app.use(cliente)
app.listen(port,()=>
{
    console.log(`Servidor rodando no endereço http://localhost:${port}`)
})