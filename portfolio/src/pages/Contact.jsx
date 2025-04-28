import { BuildingOffice2Icon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { createContact } from "../services/contacts.services";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFeedback("");
        try {
            await createContact(form);
            setFeedback("Merci, votre message a bien été envoyé !");
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            console.error(err);
            setFeedback("Une erreur est survenue. Réessayez plus tard.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="pt-24 px-6 max-w-4xl mx-auto grid gap-16 lg:grid-cols-2">
                <section className="space-y-6">
                    <h2 className="text-4xl font-semibold text-gray-900">Contactez-nous</h2>
                    <p className="text-gray-600">
                        Vous avez une question sur un projet ou souhaitez nous rejoindre ? Écrivez-nous.
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
                                <a
                                    href="mailto:contact@esgi-portfolio.com"
                                    className="hover:text-gray-900"
                                >
                                    contact@esgi-portfolio.com
                                </a>
                            </p>
                        </div>
                    </dl>
                </section>
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
                                className="w-full border rounded px-3 py-2 bg-white text-black"
                                disabled={loading}
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
                                className="w-full border rounded px-3 py-2 bg-white text-black"
                                disabled={loading}
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
                                className="w-full border rounded px-3 py-2 bg-white text-black"
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-500 transition"
                            disabled={loading}
                        >
                            {loading ? "Envoi..." : "Envoyer"}
                        </button>
                    </form>
                    {feedback && (
                        <p className="mt-4 text-center text-gray-700">{feedback}</p>
                    )}
                </section>
            </div>
        </div>
    );
}
