'use client';
import { useState, useEffect } from 'react';

export default function UniversitiesPage() {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [coach, setCoach] = useState('');
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar universidades al cargar la página
  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    const res = await fetch('/api/universities');
    const data = await res.json();
    setUniversities(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/universities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, team, coach }),
    });

    if (res.ok) {
      setName('');
      setTeam('');
      setCoach('');
      await fetchUniversities(); // Actualizar la lista
    }

    setLoading(false);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Universidades de Basket 🏀</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded-xl shadow">
        <div>
          <label className="block font-semibold">Nombre de la universidad</label>
          <input
            className="w-full p-2 rounded border"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Equipo de basket</label>
          <input
            className="w-full p-2 rounded border"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Entrenador</label>
          <input
            className="w-full p-2 rounded border"
            value={coach}
            onChange={(e) => setCoach(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar universidad'}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Universidades registradas:</h2>
        {universities.length === 0 && <p>No hay datos aún.</p>}
        <ul className="space-y-2">
          {universities.map((u, i) => (
            <li key={i} className="p-2 bg-white border rounded shadow">
              <strong>{u.name}</strong> – {u.team} (Coach: {u.coach})
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
