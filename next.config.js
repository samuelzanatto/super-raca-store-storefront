const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * Medusa Cloud-related environment variables
 */
const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME
const SUPABASE_PROJECT_REF =
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF ||
  process.env.SUPABASE_PROJECT_REF ||
  "ddbuptidjujztkfcsvqz"

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      ...(SUPABASE_PROJECT_REF
        ? [
            {
              protocol: "https",
              hostname: `${SUPABASE_PROJECT_REF}.supabase.co`,
              pathname: "/storage/v1/object/public/**",
            },
            {
              protocol: "https",
              hostname: `${SUPABASE_PROJECT_REF}.storage.supabase.co`,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [
            {
              protocol: "https",
              hostname: S3_HOSTNAME,
              pathname: S3_PATHNAME,
            },
          ]
        : []),
    ],
  },
}

module.exports = nextConfig
