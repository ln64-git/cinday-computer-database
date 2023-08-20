import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/util/prisma"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}
//   async authorize(credentials, req) {
//   const res = await fetch("/your/endpoint", {
//     method: "POST",
//     body: JSON.stringify(credentials),
//     headers: { "Content-Type": "application/json" },
//   })
//   const user = await res.json()
//   if (res.ok && user) {
//     return user
//   }
//   return null
// },

// providers: [
//   Credentials({
//     name: "Credentials",
//     credentials: {
//       email: {label: "Email"},
//       password: {label: "Password"},
//     },
//     authorize(credentials, req) {
//       if (
//         credentials?.email === "admin@example.com" &&
//         credentials.password === "admin"
//       ) {
//         return true
//       }
//       return false
//     },
//   }),
// ],
