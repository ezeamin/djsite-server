require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

try {
  const app = express();
  require('./db/database');
  const routes = require('./routes/routes');
  const adminRoutes = require('./routes/adminRoutes');

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'https://djezeamin.com',
        'https://www.djezeamin.com',
        'https://admin.djezeamin.com',
        'https://djezeamin.vercel.app',
      ],
    })
  );

  app.use(routes);
  app.use(adminRoutes);

  app.set('trust proxy', true);
  app.set('port', process.env.PORT || 5000);

  app.listen(app.get('port'), (req, res) =>
    console.log('Server running on port ' + app.get('port'))
  );
} catch (error) {
  console.log(error);
}
