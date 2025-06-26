'use server'

// Importando os tipos dos dados que ja foram tratados pelo zod no front end
import type { FormData } from "../page";

export async function createUser( currentState: {message:string}, data: FormData  ) {
    // const {email, username, senha} = data;

    try{
        return {
            message: 'Cadastro realizado!'
        }
    } catch (error) {
        return {
            message: 'Um erro ocorreu enquanto estava registrando o usuario!', error
        }
    }
}