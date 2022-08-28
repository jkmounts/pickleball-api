import { Router } from 'express';
import AuthService from '../services/auth.service';

const router = Router();

router.post('/register', async (req, res, next) => {
  const { email, password, name } = req.body;
  const authService = new AuthService();
  const output = await authService.register(email, password, name);

  res.json(output);
});

export default router;