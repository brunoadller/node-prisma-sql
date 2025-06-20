import { Prisma } from "@prisma/client"
import { prisma } from "../libs/prisma"

//ao invés de usar o type desta forma, ele cria um específico para auxiiar pelo prisma
//Utilizando o Prisma.UserCreateInput, ficará sempre sincronizado com os dados do banco
type CreateUserProps = {
    name: string,
    email: string
}
export const createUserFromUpsert = async (data: Prisma.UserCreateInput) => {
   //se achar, atualiza com o dado
   //se não achar cria um usuário
    const result = await prisma.user.upsert({
        where:{
            email: data.email
        },
        update:{
            name: 'ricardo'
        },
        create: data


    })
}
export const createUser = async (data: Prisma.UserCreateInput) => {
    try{
        const user = await prisma.user.create({data})

        return user
    }catch(error){
        return false
    }
}
//skipDuplicate, ele nao deixará passar os que são iguais (duplicadas)
export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    try{
        return await prisma.user.createMany({
            data: users, 
            skipDuplicates: true
        })
    }catch( error){
        return false
    }
}

//pegando todos ussuários
export const getAllUsers = async () => { 
    //select serve para pegar os campos que desejo, o true confirma que quer
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            posts: {
                
                select:{
                    id: true,
                    title: true
                }
            }
        }
    })
    return users
}
//função para filtrar esepecificamente utilizando o where em relação a todos usuaários

export const getAllUsersFilter = async () => {
    const users = await prisma.user.findMany({
        where:{
            email: {
                endsWith: '@gmail.com',

            }
        },
        select:{
            id: true,
            name: true,
            email: true,
            status: true
        }
    })
    return users
} 
//pegando um único usuário por email
export const getUserByEmail = async (email: string) => {
    //find first serve para pegar um campo baseando se ele é único
    const user = await prisma.user.findUnique({
         where:{email},
         select: {
            id: true,
            name: true,
            email: true
         }
    })

    return user
}

export const getUserFilterFromOr = async () => {
    const users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    email: {
                        endsWith: '@hotmail.com'
                    }
                },
                {
                    email: {
                        endsWith: '@gmail.com'
                    }
                }
            ]
        },
        select:{
            id: true,
            name: true,
            email: true,
            status: true,
          
        }
    })

    return users
}
/*
export const getAllUsersForRelations = async () => {
    const users = await prisma.user.findMany({
        where:{
            posts:{
                some:{
                    title:{
                        startsWith: 'Titulo'
                    }
                }
            }
        },
        select:{
            id: true,
            name: true,
            email: true,
            status: true,
            posts: true
        }
    })
    return users
}
*/
//Seleciona o usuário por relação, ou seja, quero que selecione o usuário
//onde os posts tenham o título que começem com "Titulo", por exemplo.
export const getAllUsersForRelations = async () => {
    const users = await prisma.user.findMany({
        where:{
            posts:{
                some:{
                    title:{
                        startsWith: 'Titulo'
                    }
                }
            }
        },
        select:{
            id: true,
            name: true,
            email: true,
            status: true,
            posts: true
        }
    })
    return users
}

/*
Para ordenar, é nece´sario colocar na consultar
orderBy:{
    name:'asc' ou 'desc' Ascendente (crsescente) Descrescente respectivamente 
}
*/
//selciona os usuários de forma decrescente
export const getAllUsersForDesc = async () => {
    const users = await prisma.user.findMany({
        orderBy:{
            name: 'desc'
        }
    })
    return users
}
export const getAllUsersForAsc = async () => {
    const users = await prisma.user.findMany({
        orderBy:{
            name: 'asc'        }
    })
    return users
}
//Realizando paginação pulando os usuários
export const getUserForPaginationForSkip = async  () => {
    const users = await prisma.user.findMany({
        skip: 0
    })
    return users
}

//realizando paginação pegando uma quantidade x de usuários
export const getUserForPaginationForTake = async () => {
    const users = await prisma.user.findMany({
        take: 2
    })
    return users
}
//realizando paginação pulando 1 com skip e pegando os próximos 2 por exemplo com take
export const getUsersForPaginationTakeAndSkip = async () => {
    let page = 5
    let skip = (page - 1) * 2
      const users = await prisma.user.findMany({
        skip: skip,
        take: 2
    })
    return users
}

//exercicio get paginaação via url
export const getExercicioPagination  = async (page: number) => {
    let perPage = 2
    let skipPage = (page - 1) * perPage
    //take quero pular de dois em dois, mas poderia ser uma constante
    //skippage é para que o usuário consiga colocar pagia 1 2 e ect sem se precoupar com a posição
    const users = await prisma.user.findMany({
        skip: skipPage,
        take: perPage
    })
    return users
}

//atualizando usuário
export const updateUser = async () => {
    const updatedUser = await prisma.user.update({
        where:{
          id: 5
        },
        data:{
            name: 'Juca'
        }
    })
    return updatedUser
}

