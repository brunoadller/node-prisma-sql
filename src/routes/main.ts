import { Router } from 'express';
import { prisma } from '../libs/prisma';
import { createUser } from '../services/user';

export const mainRouter = Router();
//COPIAR O CÓDIGO APP.TS NO CAMINHO PRISMA -> PRODUCTS -> ORM -> SETUP E ACONFIIGURATION -> DATABASE CONNECTIONS. 
//COLAR EM LIBS E SUBSTITUIR AQUELA FORMA VERIFICA A CONEXÃO, PARA NÃO CRIAR UMA NOVA DESNECESSÁRIAMENTE

//adicionar o comando watch para não precisar atualizar o nservidor manualmente npm i -D tsx, depois ir em package json para verificar como está a configuração do scriptf
mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});



mainRouter.post('/user', async (req, res) => {
    const user = await createUser({
        name: 'Felipe Berndt',
        email: 'felipeberdnt@gmail.com',
        status: false
    })

    if(user){
        res.status(201).json({user})
    }else{
        res.status(500).json({error: "Email já cadastrado!"})
    }
  
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