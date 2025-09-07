import '../styles/globals.css'
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// FILE: pages/index.js
import Image from 'next/image'
import RepoCard from '../components/RepoCard'
import { motion } from 'framer-motion'

export default function Home({ repos }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030612] to-[#071226] text-[#dffaff]">
      {/* Cover + hero */}
      <header className="relative h-[48vh] md:h-[56vh] overflow-hidden">
        <Image src="/cover.jpg" alt="cover" fill style={{ objectFit: 'cover', filter: 'brightness(0.28)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-20">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden ring-2 ring-neon/30">
              <Image src="/avatar.jpg" alt="avatar" width={144} height={144} style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ textShadow: '0 0 18px rgba(0,229,255,0.18)' }}>Min Thu Khaing</h1>
              <p className="text-neon mt-1 font-medium">Full-Stack Developer • Embedded Systems • Cloud-native</p>
              <p className="mt-2 text-sm text-[#b6eaf6] max-w-xl">I build reliable backend services with Django, interactive frontends with React, and deploy with Docker & Kubernetes. I use Manjaro daily and enjoy hardware projects with Raspberry Pi.</p>
            </div>
          </div>
          <nav className="mt-6 md:mt-0">
            <a className="px-4 py-2 border border-neon rounded-md text-sm mr-2 hover:bg-neon hover:text-black transition" href="#projects">Projects</a>
            <a className="px-4 py-2 border border-neon rounded-md text-sm hover:bg-neon hover:text-black transition" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-12 relative z-10">
        <section id="about" className="bg-[#071226]/80 backdrop-blur-md p-6 rounded-2xl shadow-neon mb-8">
          <motion.h2 initial={{ y: 8, opacity: 0 }} whileInView={{ y:0, opacity:1 }} transition={{ duration: 0.5 }} className="text-2xl font-bold text-neon">About</motion.h2>
          <motion.p initial={{ y: 10, opacity: 0 }} whileInView={{ y:0, opacity:1 }} transition={{ duration: 0.6 }} className="mt-3 text-[#cfeff7]">I’m Min (Moriarty), a 4th-year Computer Science student at MIIT. I specialize in backend development with Django and Flask, frontend using React, and containerized deployments with Docker and Kubernetes. I also build embedded systems using Raspberry Pi & GrovePi. I enjoy clean code, efficient systems, and constant learning.</motion.p>
          <motion.div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3" initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ delay:0.2 }}>
            <Tag>Python</Tag>
            <Tag>Django</Tag>
            <Tag>React</Tag>
            <Tag>Docker</Tag>
            <Tag>Kubernetes</Tag>
            <Tag>Linux (Manjaro)</Tag>
            <Tag>Raspberry Pi</Tag>
            <Tag>Networking</Tag>
          </motion.div>
        </section>

        <section id="projects" className="mb-12">
          <motion.h2 initial={{ y: 8, opacity: 0 }} whileInView={{ y:0, opacity:1 }} transition={{ duration: 0.5 }} className="text-2xl font-bold text-neon mb-4">Projects</motion.h2>
          <motion.p className="text-[#bfeff7] mb-4">All public GitHub repositories are listed automatically below (sorted by last updated). Click a card to open the repo.</motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map(repo => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </section>

        <section id="timeline" className="mb-12 p-6 bg-[#071226]/70 rounded-2xl">
          <h3 className="text-neon font-semibold">Timeline</h3>
          <ul className="mt-3 space-y-4 text-[#cfeff7]">
            <li><strong>2021 – 2025</strong> — BSc (Hons) Computer Science, MIIT</li>
            <li><strong>2024</strong> — Coursera: IBM Full Stack specialization (ongoing)</li>
            <li><strong>Present</strong> — Building full-stack & embedded projects, learning infra and security.</li>
          </ul>
        </section>

        <section id="contact" className="mb-24 p-6 rounded-2xl bg-[#071226]/60">
          <h3 className="text-neon font-semibold">Contact</h3>
          <p className="text-[#bfeff7] mt-2">Email: <a href="mailto:you@example.com" className="underline">you@example.com</a></p>
          <div className="flex gap-4 mt-4">
            <a className="px-4 py-2 border border-neon rounded-md hover:bg-neon hover:text-black transition" href="https://github.com/MoriartyLink" target="_blank">GitHub</a>
            <a className="px-4 py-2 border border-neon rounded-md hover:bg-neon hover:text-black transition" href="https://www.linkedin.com/in/min-thu-khaing-188249354/" target="_blank">LinkedIn</a>
          </div>
        </section>
      </main>

      <footer className="text-center py-8 text-[#94dff3]">
        © {new Date().getFullYear()} Min Thu Khaing — Moriarty
      </footer>
    </div>
  )
}

function Tag({ children }){
  return <span className="inline-block py-1 px-3 rounded-full text-sm border border-neon/20 text-[#dffaff]">{children}</span>
}

export async function getStaticProps(){
  const username = 'MoriartyLink' // change if needed
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`)
  const data = await res.json()
  // basic filter & map
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
    revalidate: 3600 // regenerate every hour
  }
}
