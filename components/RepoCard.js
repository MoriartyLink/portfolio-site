import { motion } from 'framer-motion'

export default function RepoCard({ repo }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="block p-5 bg-[#0a1121] rounded-xl shadow-neon border border-neon/20 hover:bg-[#051024] transition"
    >
      <h3 className="text-lg font-bold text-neon mb-2">{repo.name}</h3>
      {repo.description && <p className="text-[#bfeff7] text-sm">{repo.description}</p>}
      <div className="flex justify-between mt-3 text-xs text-[#94dff3]">
        <span>{repo.language || 'N/A'}</span>
        <span>★ {repo.stargazers_count}</span>
      </div>
    </motion.a>
  )
}
