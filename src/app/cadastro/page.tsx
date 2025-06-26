'use client'

import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUser } from './_actions/createUser';

import { useActionState, startTransition } from 'react';


const schema = z.object({
  email: z.string().email('Email incorreto!'),
  username: z.string().min(3, 'Username muito curto!'),
  senha: z.string().min(4, 'Senha muito curta!')
})

export type FormData = z.infer<typeof schema>



export default function Cadastro() {
  const initialState = {
    message: ''
  };

  const [currentState, formAction, isPending] = useActionState(createUser, initialState)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  // O handleSubmit tras todos os dados do form validados com Zod!!!
  function onSubmit (data: FormData){
    // Retorno aparece no console do navegador, ou seja, no ClientSide.
    console.log("Dados enviados do front-end para o back-end: ", data);

    {/* Englobamos a function 'formAction(data)' do useActionState com a 'startTransition' 
      para receber no FrontEnd o resultado da action no BackEnd, ou seja, em  _actions/createUser. */}
    startTransition(() => {
      formAction(data)
    })
  }

    return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <h1 className="flex justify-center">Crie sua conta</h1>
        <div className="flex flex-col">
          <label htmlFor='email'>Email</label>
          <input 
          {...register('email')}
          name='email'
          className={`${errors.email?.message ? 'border border-red-500 rounded-md p-2 outline-none' : 'outline-none border border-gray-300 rounded-md p-2'}`}
          type="text"/>
          {errors.email && (<p className="text-bold text-red-500">{errors.email.message}</p>)}
        </div>
        <div className="flex flex-col">
          <label htmlFor='username'>Username</label>
          <input 
          {...register('username')}
          name='username'
          className={`${errors.username?.message ? 'border border-red-500 rounded-md p-2 outline-none' : 'outline-none border border-gray-300 rounded-md p-2'}`}
          type="text"/>
          {errors.username && (<p className="text-bold text-red-500">{errors.username.message}</p>)}
        </div>
        <div className="flex flex-col">
          <label htmlFor='senha'>Senha</label>
          <input 
          {...register('senha')}
          name='senha'
          className={`${errors.senha?.message ? 'border border-red-500 rounded-md p-2 outline-none' : 'outline-none border border-gray-300 rounded-md p-2'}`}
          type="password"
          />
          {errors.senha && (<p className="text-bold text-red-500">{errors.senha.message}</p>)}
        </div>
        <button disabled={isPending} type='submit' className="disabled:opacity-50 bg-blue-500 rounded">Cadastrar</button>
        <Link className="bg-pink-500 rounded text-center" href='/'>Já tenho uma conta!</Link>

        {currentState?.message && (
          <p className="text-red-500 text-xl text-center mt-4">{isPending ? 'Carregando...' : currentState.message}</p>
        )}
      </form>
    </div> 
  )
}