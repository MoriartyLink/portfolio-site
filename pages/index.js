import Image from 'next/image'
import RepoCard from '../components/RepoCard'
import { motion } from 'framer-motion'

export default function Home({ repos }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030612] to-[#071226] text-[#dffaff]">
      
      {/* Hero Section */}
      <header className="relative h-[48vh] md:h-[56vh] overflow-hidden">
        <Image
          src="/cover.jpg"
          alt="cover"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.28)' }}
        />
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-20">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden ring-2 ring-neon/30">
              <Image
                src="/avatar.jpg"
                alt="avatar"
                width={144}
                height={144}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ textShadow: '0 0 18px rgba(0,229,255,0.18)' }}>Min Thu Khaing</h1>
              <p className="text-neon mt-1 font-medium">Full-Stack Developer • Embedded Systems • Cloud-native</p>
            </div>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <main className="max-w-6xl mx-auto px-6 -mt-12 relative z-10">
        <section id="projects" className="mb-12">
          <motion.h2 initial={{ y: 8, opacity: 0 }} whileInView={{ y:0, opacity:1 }} transition={{ duration: 0.5 }} className="text-2xl font-bold text-neon mb-4">
            Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map(repo => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

// Fetch GitHub repos
export async function getStaticProps() {
  const username = 'MoriartyLink'
  const headers = {}
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
  }

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`,
    { headers }
  )
  const data = await res.json()

  const repos = (Array.isArray(data) ? data : []).map(r => ({
    id: r.id,
    name: r.name,
    html_url: r.html_url,
    description: r.description,
    stargazers_count: r.stargazers_count,
    language: r.language,
    updated_at: r.updated_at
  }))

  return {
    props: { repos },
    revalidate: 3600
  }
}
