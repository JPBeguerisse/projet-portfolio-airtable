export default function Home() {
    return (
        <div className="bg-gray-900 min-h-screen">
            <main className="pt-24 px-6 mx-auto max-w-4xl text-center text-white">
                <h1 className="text-5xl font-semibold tracking-tight mb-6">
                    Bienvenue sur le Portfolio ESGI
                </h1>
                <p className="mt-4 text-lg leading-relaxed">
                    Découvrez les projets innovants de nos étudiants en Ingénierie du Web.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <a
                        href="/projects"
                        className="rounded-md bg-indigo-500 px-5 py-3 text-sm font-semibold hover:bg-indigo-400 transition"
                    >
                        Voir les projets
                    </a>
                    <a
                        href="/about"
                        className="rounded-md border border-white px-5 py-3 text-sm font-semibold hover:bg-white hover:text-gray-900 transition"
                    >
                        À propos
                    </a>
                </div>
            </main>
        </div>
    );
}