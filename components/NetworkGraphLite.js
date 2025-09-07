import { useEffect, useRef } from 'react'

export default function NetworkGraphLite() {
  const svgRef = useRef()

  useEffect(() => {
    const svg = svgRef.current
    const width = svg.clientWidth
    const height = svg.clientHeight
    const ctx = svg.getContext("2d")

    const nodes = Array.from({ length: 16 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6
    }))

    function animate() {
      ctx.clearRect(0, 0, width, height)

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0, 229, 255, ${1 - dist / 180})`
            ctx.lineWidth = 1.2
            ctx.shadowBlur = 12
            ctx.shadowColor = "#00e5ff"
            ctx.stroke()
          }
        }
      }

      // Draw glowing nodes
      nodes.forEach(n => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 5, 0, Math.PI * 2)
        ctx.fillStyle = "#00e5ff"
        ctx.shadowBlur = 15
        ctx.shadowColor = "#00e5ff"
        ctx.fill()

        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <canvas
      ref={svgRef}
      width={800}
      height={400}
      className="w-full h-[400px] rounded-2xl bg-[#030612] border border-neon/30"
    />
  )
}
