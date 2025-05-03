async function getMensaje() {
  const res = await fetch('http://localhost:3000/api/hello');
  const data = await res.json();
  return data;
}

export default async function Home() {
  const { message } = await getMensaje();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Bienvenido a mi App</h1>
      <p className="mt-4">Mensaje desde la API:</p>
      <p className="mt-2 text-blue-600 font-semibold">{message}</p>
    </main>
  );
}
