import { NextResponse } from 'next/server';
import { getAuthSession } from '~/shared/auth';

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json(null, { status: 401 });
    }

    return NextResponse.json(session.user, { status: 200 });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}
