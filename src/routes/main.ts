import { Router } from 'express';
import { prisma } from '../libs/prisma';
import { createUser, createUsers } from '../services/user';

export const mainRouter = Router();
//COPIAR O CÓDIGO APP.TS NO CAMINHO PRISMA -> PRODUCTS -> ORM -> SETUP E ACONFIIGURATION -> DATABASE CONNECTIONS. 
//COLAR EM LIBS E SUBSTITUIR AQUELA FORMA VERIFICA A CONEXÃO, PARA NÃO CRIAR UMA NOVA DESNECESSÁRIAMENTE

//adicionar o comando watch para não precisar atualizar o nservidor manualmente npm i -D tsx, depois ir em package json para verificar como está a configuração do scriptf

mainRouter.post('/user', async (req, res) => {
    const user = await createUser({
        name: 'Felipe 2',
        email: 'felipebssrdnt@gmail.com',
        status: false,
        posts: {
            create:{
                title:"Titulo de teste do testador 2",
                body: "corpo de teste"
            }
        }
    })

    if(user){
        res.status(201).json({user})
    }else{
        res.status(500).json({error: "Email já cadastrado!"})
    }
  
})
mainRouter.post('/users', async (req, res) => {
    const result = await  createUsers([
        { "name": "Marcos Oliveira", "email": "marcos.oliveira@email.com" },
        { "name": "Larissa Fernandes", "email": "larissa.fernandes@email.com" },
        { "name": "Ricardo Santos", "email": "ricardo.santos@email.com" },
        { "name": "Tatiane Ribeiro", "email": "tatiane.ribeiro@email.com" },
        { "name": "Felipe Moura", "email": "felipe.moura@email.com" },
        { "name": "Amanda Costa", "email": "amanda.costa@email.com" },
        { "name": "Vitor Cardoso", "email": "vitor.cardoso@email.com" },
        { "name": "Sabrina Lopes", "email": "sabrina.lopes@email.com" },
        { "name": "Roberto Almeida", "email": "roberto.almeida@email.com" },
        { "name": "Camila Souza", "email": "camila.souza@email.com" }
    ])
    res.json({ result})
})

mainRouter.get('/users', async (req, res) => {
    const user = await prisma.user.findMany()
    res.json({user})
})
/*

CÓDIGO DE FORMA SIMPLIFICADA

mainRouter.post('/user', async ( req, res) => {
    const user = await prisma.user.create({
        data: {
            name: 'João',
            email: 'joao@gmail.com'
        }
    })
    res.json({user})
})

*/