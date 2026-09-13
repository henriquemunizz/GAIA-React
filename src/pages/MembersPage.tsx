import { MemberCard } from '../components/MemberCard'
import { PageHeader } from '../components/PageHeader'
import { members } from '../data/members'

export function MembersPage() {
  return (
    <main className="flex-1">
      <PageHeader
        title="Integrantes"
        description="Conheça a equipe responsável pelo desenvolvimento do projeto GAIA."
      />
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-16 sm:grid-cols-2 sm:py-24 lg:grid-cols-4">
        {members.map((member) => (
          <MemberCard key={member.rm} member={member} />
        ))}
      </section>
    </main>
  )
}
