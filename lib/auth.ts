import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Providers {
  providers: {};
  clientId: string;
  clientSecret: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "inge@gmail.com" &&
          credentials?.password === "123"
        ) {
          return { id: "1", name: "Demo User", email: "inge@gmail.com" };
        }
        return null;
      },
    }),
  ],
  pages: "auth/signin",
};
