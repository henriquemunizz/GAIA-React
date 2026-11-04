import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { Credentials } from '../types/user'

interface AccountFieldsProps {
  register: UseFormRegister<Credentials>
  errors: FieldErrors<Credentials>
  editing?: boolean
  signingUp?: boolean
}

export function AccountFields({ register, errors, editing, signingUp }: AccountFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="username" className="text-sm font-semibold text-slate-700">Nome de usuário</label>
        <input
          id="username"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={40}
          className="field"
          aria-invalid={Boolean(errors.nomeUsuario)}
          aria-describedby="username-help username-error"
          {...register('nomeUsuario', {
            required: 'Informe seu nome de usuário.',
            pattern: { value: /^[a-zA-Z0-9_.-]{3,40}$/, message: 'Use de 3 a 40 letras, números, pontos, hífens ou sublinhados.' },
          })}
        />
        <p id="username-help" className="mt-2 text-xs text-slate-500">De 3 a 40 letras, números, pontos, hífens ou sublinhados.</p>
        <p id="username-error" className="mt-1 text-xs text-red-700">{errors.nomeUsuario?.message}</p>
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-semibold text-slate-700">{editing ? 'Nova senha (opcional)' : 'Senha'}</label>
        <input
          id="password"
          type="password"
          autoComplete={editing || signingUp ? 'new-password' : 'current-password'}
          maxLength={128}
          className="field"
          aria-invalid={Boolean(errors.senha)}
          aria-describedby="password-help password-error"
          {...register('senha', {
            required: editing ? false : 'Informe sua senha.',
            validate: (value) => (!value && editing) || (value.length >= 8 && value.length <= 128 && Boolean(value.trim())) || 'Use de 8 a 128 caracteres, com pelo menos um caractere diferente de espaço.',
          })}
        />
        <p id="password-help" className="mt-2 text-xs text-slate-500">{editing ? 'Deixe em branco para manter a senha atual.' : 'Use de 8 a 128 caracteres.'}</p>
        <p id="password-error" className="mt-1 text-xs text-red-700">{errors.senha?.message}</p>
      </div>
    </>
  )
}
