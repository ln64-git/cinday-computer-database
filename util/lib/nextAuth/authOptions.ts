import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/util/config/prisma"


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
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
//       username: { label: "Username", type: "text", placeholder: "jsmith" },
//       password: { label: "Password", type: "password" }
//     },
//     async authorize(credentials, req) {
//       const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
//       if (user) {
//         return user
//       } else {
//         return null
//       }
//     }
//   })
// ]
