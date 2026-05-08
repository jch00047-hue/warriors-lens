export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-4">
          Combat Photography & Visual Storytelling
        </p>
        <h1 className="font-display text-5xl sm:text-7xl font-bold text-neutral-100 mb-6 leading-tight">
          Through the
          <span className="block text-amber-500">Warrior's Lens</span>
        </h1>
        <p className="text-neutral-400 text-lg max-w-xl mb-10">
          Documenting military service, operations, and the human stories behind the uniform.
          Visual journalism by a soldier, for the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/portfolio"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-semibold rounded-md transition-colors"
          >
            View Portfolio
          </a>
          <a
            href="/blog"
            className="px-8 py-3 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 rounded-md transition-colors"
          >
            Read Articles
          </a>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="font-display text-3xl text-neutral-100 mb-10 text-center">What I Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: 'Combat Photography', desc: 'On-the-ground documentation of military operations, training, and deployments.' },
            { title: 'Visual Journalism', desc: 'Storytelling through imagery — capturing the human side of service.' },
            { title: 'Public Affairs', desc: 'Official military media relations and strategic communications.' },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="font-display text-xl text-amber-400 mb-3">{title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
