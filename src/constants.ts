process.loadEnvFile('src/.env')

export const constants = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '30d',
  },
}
