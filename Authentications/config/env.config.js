module.exports = {
    development: {
        PORT: 3000,
        JWT_SECRET: 'your_jwt_secret_key',
        NODE_ENV: 'development'
    },
    production: {
        PORT: process.env.PORT,
        JWT_SECRET: process.env.JWT_SECRET,
        NODE_ENV: process.env.NODE_ENV
    },
    session: {
        secret: process.env.SESSION_SECRET || 'default_session_secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 60000 } // Set to true if using HTTPS
    }
}