// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const { limiter } = require('./middleware/rateLimiter');
// const { logger, logEvents } = require('./middleware/logger');
// const errorHandler = require('./middleware/errorHandler');
// const helmet = require('helmet');

// const app = express();

// const PORT = process.env.PORT || 5000;
// // const MONGO_URI = process.env.MONGO_URI;
// const MONGO_URI = "mongodb://localhost:27017/digitalshop1"
// console.log('Mode is: ', process.env.NODE_ENV)


// if (!MONGO_URI || !PORT) {
//   console.error('FATAL ERROR: MONGO_URI and PORT must be defined in the environment variables');
//   process.exit(1);
// }

// // custom midilware logger
// app.use(logger)

// // Built-in Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Third-party Middleware
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));
// app.use(cookieParser());
// app.use(limiter);
// app.use(helmet());

// // Log requests
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// // Routes
// app.get('/', (req, res) => {
//   res.send('Welcome to the server!');
// });
// app.use('/auth', require('./routes/authRoute'));
// app.use('/api/users', require('./routes/usersRoute'));
// app.use('/api/products', require('./routes/productsRoute'));
// app.use('/api/orders', require('./routes/ordersRoute'));

// // Error Handling Middleware
// app.use(errorHandler);

// // Connect to MongoDB and Start Server
// mongoose.connect(MONGO_URI).then(() => {
//   console.log('Connected to MongoDB');

//   // Start server
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });

//   // Graceful shutdown

// }).catch(err => {
//   console.error('Failed to connect to MongoDB', err);
// });


const express = require('express');
const mongoose = require('mongoose');

const app = express()
const port = 5000
const url = "mongodb://localhost:27017/dbtest1"

mongoose.connect(url, {
  // useNewUrlParser: true, 
  // useUnifiedTopology: true,
  family: 4,
})
  .then(result => console.log("database connected"))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('<h1>Hello from nodejs app</h1>')
})

app.listen(port, () => {
  console.log("server is running at port: ", port);
})