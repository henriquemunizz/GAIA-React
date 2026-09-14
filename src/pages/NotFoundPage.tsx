import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-gaia-950 px-4 py-24 text-center text-white">
      <p className="text-[8rem] font-bold leading-none text-gaia-400/20 sm:text-[12rem]">404</p>
      <h1 className="-mt-8 text-3xl font-semibold">Página não encontrada</h1>
      <p className="mt-3 text-gaia-100">O endereço informado não existe no projeto GAIA.</p>
      <Link className="mt-7 rounded-full bg-gaia-400 px-6 py-3 font-semibold text-gaia-950 transition-colors hover:bg-gaia-200" to="/">
        Voltar para a Home
      </Link>
    </main>
  )
}
