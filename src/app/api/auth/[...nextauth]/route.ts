import NextAuth, { NextAuthOptions } from 'next-auth'
import AzureAD from 'next-auth/providers/azure-ad'

export const authOptions: NextAuthOptions = {
  providers: [
    AzureAD({
      tenantId: process.env.AZURE_AD_TENANT_ID,
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      authorization: {
        params: { scope: 'openid email profile User.Read offline_access' },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token }) {
      return token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
