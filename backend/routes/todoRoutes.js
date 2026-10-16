import express from 'express';
import {createTodo , getAllTodo ,getTodo , updateTodo , deleteTodo} from '../controllers/todoContol.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', verifyToken , createTodo);
router.get('/todos' , verifyToken , getAllTodo);
router.get('/:id' , verifyToken , getTodo);
router.put('/update/:id' , verifyToken , updateTodo);
router.delete('/delete/:id' , verifyToken , deleteTodo);



export default router;