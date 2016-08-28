/* client entry point */
if (process.env.NODE_ENV === 'development') require('./main.dev');
if (process.env.NODE_ENV === 'production') require('./main.prod');
