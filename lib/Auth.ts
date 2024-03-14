import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'STAFFs',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials, req) {
                const res = await fetch(`http://localhost:3000/api/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                });
                console.log(res)
                const user = await res.json();
                console.log(user)
                // If no error and we have user data, return it
                if (user.status && user) {
                    return user;
                }

                if (!user.status) {
                    return { error: user.message };
                }

                // Return null if user data could not be retrieved
                return null;
            },
        }),
    ],
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        session({ session, token, user }) {
            return session // The return type will match the one returned in `useSession()`
        },
    },
};