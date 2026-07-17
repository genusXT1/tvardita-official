import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as argon2 from 'argon2';
import { encrypt } from '@/lib/session';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const user = await db.user.findUnique({
      where: { username },
      include: { role: { include: { permissions: true } } }
    });

    if (!user) {
      return NextResponse.json({ error: 'Неверные учетные данные' }, { status: 401 });
    }

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return NextResponse.json({ error: 'Неверные учетные данные' }, { status: 401 });
    }

    const permissions = user.role.permissions.map(p => p.name);
    
    const sessionData = {
      userId: user.id,
      username: user.username,
      role: user.role.name,
      permissions
    };

    const sessionString = await encrypt(sessionData);

    (await cookies()).set('session', sessionString, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
