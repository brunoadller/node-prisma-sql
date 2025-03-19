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