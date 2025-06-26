import Link from "next/link";

export default function Login() {

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-2">
        <h1 className="flex justify-center">Login</h1>
        <div className="flex flex-col">
          <label htmlFor='email'>Email</label>
          <input name='email'
          className="outline-none border border-gray-300 rounded-md p-2" 
          type="text"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor='senha'>Senha</label>
          <input name='senha'
          className="outline-none border border-gray-300 rounded-md p-2" 
          type="password"
          />
        </div>
        <button type='submit' className="bg-blue-500 rounded">Entrar</button>
        <Link className="bg-pink-500 rounded text-center" href='cadastro'>Cadastre-se!</Link>
      </form>
    </div> 
  )
}
