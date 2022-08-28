import { Router } from "express";
import courts from './courts.routes';

const router = Router();

router.use('/courts', courts)

export default router;