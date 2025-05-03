import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('basketApp');
    const universities = await db.collection('universities').find({}).toArray();
    return Response.json(universities);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Error al obtener las universidades' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, team, coach } = await request.json();

    if (!name || !team || !coach) {
      return Response.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('basketApp');

    const result = await db.collection('universities').insertOne({
      name,
      team,
      coach,
    });

    return Response.json({ message: 'Universidad guardada', id: result.insertedId });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Error al guardar la universidad' }, { status: 500 });
  }
}
