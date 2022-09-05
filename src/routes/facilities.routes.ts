import { Router } from 'express';
import FacilityService from '../services/facility.service';

const router = Router();

router.get('/', async (req, res) => {
  const facilityService = new FacilityService;
  const facilites = await facilityService.all();
  res.json(facilites);
});

router.post('/', async(req, res) => {
  const facilityService = new FacilityService();
  const result = await facilityService.add(req.body);
  res.json(result);
});

export default router;