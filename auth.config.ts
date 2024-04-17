import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Google,
    // Credentials({
    //   async authorize(credentials) {
    //     const existingUser = await prisma.user.findUnique({
    //       where: {
    //         email: String(credentials.email),
    //       },
    //     });

    //     if (!existingUser) return false;

    //     if (!existingUser.password) return false;

    //     const password = existingUser?.password;

    //     const checkPassword = await bcrypt.compare(
    //       String(credentials.password),
    //       password
    //     );

    //     if (!checkPassword) return false;

    //     return existingUser;

    //     // try {
    //     //   const resend = new Resend(process.env.RESEND_API_KEY);
    //     //   resend.emails.send({
    //     //     from: "onboarding@resend.dev",
    //     //     to: "gnverudy@gmail.com",
    //     //     subject: "Hello World",
    //     //     html: "<p>Here is your 6-digit code: 123456</p>",
    //     //   });
    //     //   return resend;
    //     // } catch (error) {
    //     //   return error;
    //     // }
    //   },
    // }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
