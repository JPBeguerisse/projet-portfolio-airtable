import { BuildingOffice2Icon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import HeaderNav from "../components/HeaderNav";
import { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Merci, votre message a été envoyé !");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="bg-white min-h-screen">
            <HeaderNav />
            <main className="pt-24 px-6 max-w-4xl mx-auto grid gap-16 lg:grid-cols-2">
                {/* Infos */}
                <section className="space-y-6">
                    <h2 className="text-4xl font-semibold text-gray-900">Contactez-nous</h2>
                    <p className="text-gray-600">
                        Vous avez une question sur un projet ou souhaitez nous rejoindre? Écrivez-nous.
                    </p>
                    <dl className="space-y-4 text-gray-600">
                        <div className="flex items-start gap-4">
                            <BuildingOffice2Icon className="h-6 w-6 text-gray-400" />
                            <p>ESGI, 10 Rue de la Paix, 75002 Paris</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <PhoneIcon className="h-6 w-6 text-gray-400" />
                            <p>
                                <a href="tel:+33123456789" className="hover:text-gray-900">
                                    +33 1 23 45 67 89
                                </a>
                            </p>
                        </div>
                        <div className="flex items-start gap-4">
                            <EnvelopeIcon className="h-6 w-6 text-gray-400" />
                            <p>
                                <a href="mailto:contact@esgi-portfolio.com" className="hover:text-gray-900">
                                    contact@esgi-portfolio.com
                                </a>
                            </p>
                        </div>
                    </dl>
                </section>
                {/* Formulaire */}
                <section>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 mb-1">Nom</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-500 transition"
                        >
                            Envoyer
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}
