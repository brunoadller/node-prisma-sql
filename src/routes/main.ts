import { Router } from 'express';
import { prisma } from '../libs/prisma';
import { createUser, createUserFromUpsert, createUsers, getAllUsers, getAllUsersFilter, getAllUsersForAsc, getAllUsersForDesc, getAllUsersForRelations, getExercicioPagination, getUserByEmail, getUserFilterFromOr, getUserForPagination, getUserForPaginationForSkip, getUserForPaginationForTake, getUsersForPaginationTakeAndSkip, updateUser } from '../services/user';

export const mainRouter = Router();
//COPIAR O CÓDIGO APP.TS NO CAMINHO PRISMA -> PRODUCTS -> ORM -> SETUP E ACONFIIGURATION -> DATABASE CONNECTIONS. 
//COLAR EM LIBS E SUBSTITUIR AQUELA FORMA VERIFICA A CONEXÃO, PARA NÃO CRIAR UMA NOVA DESNECESSÁRIAMENTE

//adicionar o comando watch para não precisar atualizar o nservidor manualmente npm i -D tsx, depois ir em package json para verificar como está a configuração do scriptf

mainRouter.post('/user', async (req, res) => {
    const user = await createUserFromUpsert({
        name: 'Felipe 2',
        email: 'felipebssrdnt@hotmail.com',
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
    const result = await getAllUsers()

    res.json({result})
})

mainRouter.get('/user', async (req, res) => {
    const result  = await getUserByEmail('joao@gmail.com')

    res.json({result})
})

mainRouter.get('/usersFilter', async (req, res) => {
    const result = await getAllUsersFilter()
    res.json({result})
})

mainRouter.get('/usersFilterFromOr', async (req, res) => {
    const result = await getUserFilterFromOr()

    res.json({result})
})
mainRouter.get('/usersForRelations', async (req, res) => {
    const result = await getAllUsersForRelations()
    res.json({result})
})
/*
mainRouter.get('/usersForRelations', async (req, res) => {
    const result = await getAllUsersForRelations()

    res.json({result})
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

mainRouter.get('/allusersfordesc', async (req, res) => {
    const usersOrderDesc = await getAllUsersForDesc()
    res.json({usersOrderDesc})
})
mainRouter.get('/allusersforasc', async (req, res) => {
    const usersOrderAsc = await getAllUsersForAsc()
    res.json({usersOrderAsc})
})
mainRouter.get('/getusersforpaginationforskip', async (req, res) => {
    const users = await getUserForPaginationForSkip()

    res.json({users})
})
mainRouter.get('/getusersforpaginationfortake', async (req, res) =>{
    const users = await getUserForPaginationForTake()
    res.json({users})
})
mainRouter.get('/getusersforpaginationskipandtake', async (req, res) => {
    const users = await getUsersForPaginationTakeAndSkip()
    res.json({users})
})
//rota do exxercicio de setar a página e vir os ususários por pagína
mainRouter.get('/setpagina', async (req, res) => {
    const pageValue = req.query.page 
    const usersPage = await getExercicioPagination(Number(pageValue))
    res.json({usersPage})
})

mainRouter.put('/user', async (req, res) => {
    const result = await updateUser()
    res.json({result})
})