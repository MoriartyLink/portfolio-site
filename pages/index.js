import Image from 'next/image'
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
<p className="text-[#bfeff7] mt-2">Email: <a href="mailto:moriartylinke@gmail.com" className="underline">moriartylink@gmail.com</a></p>
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
    revalidate: 3600 // revalidate every hour
  }
}
