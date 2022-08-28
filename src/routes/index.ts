import { Router } from "express";
import courts from './courts.routes';
import auth from './auth.routes';
import facilities from './facilities.routes';

const router = Router();

router.use('/courts', courts);
router.use('/auth', auth);
router.use('/facilities', facilities);

export default router;