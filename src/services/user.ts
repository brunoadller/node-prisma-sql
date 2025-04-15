import { Prisma } from "@prisma/client"
import { prisma } from "../libs/prisma"

//ao invés de usar o type desta forma, ele cria um específico para auxiiar pelo prisma
//Utilizando o Prisma.UserCreateInput, ficará sempre sincronizado com os dados do banco
type CreateUserProps = {
    name: string,
    email: string
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
             status: true
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