import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();

  // Delete the cookie
  cookieStore.set('surveyCompleted', '', {
    expires: new Date(0), // Expired date
    path: '/',
  });

  return Response.json({ message: 'Cookie deleted successfully' });
}