const express = require("express");
const mongoose = require("mongoose");

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const requestLog = require("./middleware/logger");
const config = require('./config'); 


const app = express();

app.use(express.json());
app.use(requestLog)


// 获取当前环境变量，可以通过NODE_ENV环境变量来设置
const env = process.env.NODE_ENV || 'development';
const dbUrl = config[env].dbUrl;

// 使用配置信息来连接 MongoDB
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to MongoDB (${env} environment)`))
  .catch((err) => console.error(`Error connecting to MongoDB: ${err}`));

// import route module
const asteroidRoute = require("./routes/asteroid");
const minerRoutes = require("./routes/miner");
const planetRoutes = require("./routes/planet");
const historyRoutes = require("./routes/history");
const errorHandler = require("./middleware/errorHandler");

app.use("/api/miner", minerRoutes);
app.use("/api/asteroid", asteroidRoute);
app.use("/api/planet", planetRoutes);
app.use("/api/history", historyRoutes);


// config swagger
const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Mediaia Restful Api', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: ['./routes/*.js'], // Path to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// handle exception
app.use(errorHandler);

// 启动 Express 应用
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
