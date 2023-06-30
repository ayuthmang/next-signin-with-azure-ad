# Next.js Sign-in with Azure Active Directory

Next.js app directory sign-in with Azure AD example.

## Requirement

- A created application on Azure Portal following [this tutorial](https://learn.microsoft.com/en-us/graph/tutorials/javascript?tabs=aad&tutorial-step=1)
- Get the secret and put in the `.env.

## Getting Started

1. Copy the `.env.example` to `.env` file.
2. Edit the `.env` file and change following property to match yours:
   - `AZURE_AD_TENANT_ID` - your tenant id
   - `AZURE_AD_CLIENT_ID` - your application client id
   - `AZURE_AD_CLIENT_SECRET` - your application client secret

3. Then run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.
5. Click Sign-in button at the header to sign-in and see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Microsoft Graph, take a look at the following resources:

- [Overview of Microsoft Graph](https://learn.microsoft.com/en-us/graph/overview)
- [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)
