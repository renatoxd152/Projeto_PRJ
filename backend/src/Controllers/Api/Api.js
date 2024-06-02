import express from 'express';
import fetch from 'node-fetch';
const api = express();
api.use(express.json());

api.get("/cep/:cep", async (req, res) => {
    const cep = req.params.cep;
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.cep) {
            res.json(data);
        } else {
            res.status(404).json({ mensagem: "CEP não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Não foi possível buscar o CEP devido a um erro interno no servidor da API" });
    }
});


api.get("/estados", async (req, res) => {
    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        const data = await response.json();
        res.json(data);
        
    } catch (error) {
        res.status(500).json({ mensagem: "Não foi possível buscar os estados devido a um erro interno no servidor da API" });
    }
});

api.get('/cidades/:estado', async (req, res) => {
   
    try {
        const { estado } = req.params;
    
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios?orderBy=nome`);
        const data = await response.json();
        res.json(data);
       
    } catch (error) {
        res.status(500).json({ mensagem: "Não foi possível buscar as cidades devido a um erro interno no servidor da API" });
    }
   
});

api.get('/cidade/:cidade', async (req, res) => {
    try {
        const {cidade} = req.params;
       
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cidade}`);
        const data = await response.json();
        res.json(data);
       
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensagem: "Não foi possível buscar a cidade devido a um erro interno no servidor da API" });
    }
   
});

export default api;
