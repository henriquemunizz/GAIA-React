import type { Member } from '../types/member'

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <article className="group rounded-[1.75rem] bg-white/70 p-2 text-center ring-1 ring-gaia-900/5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(6,71,72,0.12)]">
      <div className="h-full rounded-[1.35rem] bg-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      <img
        className="mx-auto mb-5 h-32 w-32 rounded-full object-cover ring-4 ring-gaia-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        src={member.image}
        alt={`Foto de ${member.name}`}
      />
      <h2 className="text-lg font-semibold leading-snug text-gaia-950">{member.name}</h2>
      <p className="mt-2 text-sm text-slate-600">
        <strong className="text-gaia-600">RM:</strong> {member.rm}
      </p>
      <p className="text-sm text-slate-600">
        <strong className="text-gaia-600">Turma:</strong> {member.className}
      </p>

      <div className="mt-4 flex justify-center gap-2">
        <a
          className="rounded-full bg-gaia-950 px-4 py-2 text-xs font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-gaia-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gaia-600"
          href={member.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          className="rounded-full bg-gaia-100 px-4 py-2 text-xs font-semibold text-gaia-800 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-gaia-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gaia-600"
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
      </div>
    </article>
  )
}
