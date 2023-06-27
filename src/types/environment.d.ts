declare namespace NodeJS {
  export interface ProcessEnv {
    AZURE_AD_TENANT_ID: string
    AZURE_AD_CLIENT_ID: string
    AZURE_AD_CLIENT_SECRET: string
    NEXTAUTH_SECRET: string
    NEXTAUTH_URL: string

    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
  }
}
