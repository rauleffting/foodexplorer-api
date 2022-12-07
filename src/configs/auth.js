module.exports = {
  jwt: {
    secret: process.env.AUTH_SERET || "default",
    expiresIn: "1d"
  }
}