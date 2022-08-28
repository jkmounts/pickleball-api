import { Router } from "express";
import courts from './courts.routes';
import auth from './auth.routes';

const router = Router();

router.use('/courts', courts);
router.use('/auth', auth);

export default router;