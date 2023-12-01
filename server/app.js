const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const globalErrorHandler = require('./controllers/errorControllers');
const AppError = require('./utils/appError');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const userRouter = require('./routes/userRoutes');
const teamRouter = require('./routes/teamRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(mongoSanitize());
app.use(xss());

app.use('/api/users', userRouter);
app.use('/api/team', teamRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
