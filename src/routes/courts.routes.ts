import { Router } from 'express';
import CourtService from '../services/court.service';

const router = Router();

router.get('/', async (req,res) => {
  const courtService = new CourtService;
  const courts = await courtService.all();

  res.json(courts);
})
router.post('/', async (req,res) => {
  const courtService = new CourtService;
  const court = await courtService.add(req.body);

  res.json(court);
})

export default router;