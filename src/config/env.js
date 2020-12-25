const enviroments = {
  production: {
    databaseDsn: process.env.DATABASE_DSN || 'postgres://postgres:sandbox@localhost:5432/videochamada',
    port: process.env.PORT || 3000
  },
  development: {
    databaseDsn: process.env.DATABASE_DSN || 'postgres://sandbox:sandbox@localhost:5432/sandbox',
    port: process.env.PORT || 3000
  },
  test: {
    databaseDsn: process.env.DATABASE_DSN || 'postgres://sandbox:sandbox@localhost:5433/sandbox_test',
    port: process.env.PORT || 3000
  },
  default: {
    databaseDsn: 'postgres://sandbox:sandbox@localhost:5432/sandbox',
    port: 3000
  }
}
module.exports = (environment) => enviroments[environment] || enviroments.default
