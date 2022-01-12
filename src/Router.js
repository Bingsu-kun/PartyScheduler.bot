import express from "express";
import controller from "./controller.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('anony4questioner.bot for slack --- made by Hephai (icetime963@gmail.com)');
});

router.get('/health', controller.commands.HealthCheckCommand);

router.post('/question', controller.commands.QuestionCommand);

// 허용되지 않은 path 404에러 
router.all('*', controller.errors.NotRegisteredPath);

export default router;