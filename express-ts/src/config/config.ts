module.exports = {
    // Application configuration
    app: {
      port: process.env.PORT || 3000,
      environment: process.env.NODE_ENV || 'development',
      secretKey: process.env.SECRET_KEY || 'your-secret-key-here',
    },
  
    // Database configuration
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 27017,
      name: process.env.DB_NAME || 'my_database',
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password123',
    },
  
    // JWT configuration
    jwt: {
      secret: process.env.JWT_SECRET || 'your-jwt-secret-key-here',
      expiresIn: '7d', // Example: Token expires in 7 days
    },
  };
  