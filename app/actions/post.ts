'use server';
export async function getPostById(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/forum/${id}`, {
    method: 'GET',
  });

  const data = await res.json();
  console.log('action post', data);
  return data;
}
