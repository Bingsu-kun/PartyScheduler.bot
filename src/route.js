import express from "express";
import controller from "./controller.js";

const route = express.Router();

route.get('/', (req, res) => {
    res.send('Hello World! 화이팅 하자 장훈아');
  });

route.get('/test', controller.test);

export default route;