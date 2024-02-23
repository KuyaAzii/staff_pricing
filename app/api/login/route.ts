// pages/api/login.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password === password) {
      console.log('Login successful');


      
      return NextResponse.json({ data: [], message: "User created successfully!" }, { status: 200});
    } else {
      console.log('Invalid credentials');
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401});
    }
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500});
  } 
}
