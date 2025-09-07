import Image from 'next/image'
import { motion } from 'framer-motion'

export default function RepoCard({ repo }){
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: 8, opacity: 0 }}
      whileInView={{ y:0, opacity:1 }}
      transition={{ duration: 0.4 }}
      className="block p-5 rounded-xl bg-[#061226]/70 border border-neon/10 hover:border-neon hover:shadow-neon transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-lg text-[#dffaff]">{repo.name}</h4>
          <p className="text-sm text-[#bfeff7] mt-1">{repo.description ?? 'No description'}</p>
        </div>
        <div className="text-right text-sm text-[#bfeff7]">
          <div className="mb-1">{repo.language ?? '—'}</div>
          <div className="text-xs">★ {repo.stargazers_count}</div>
        </div>
      </div>
    </motion.a>
  )
}