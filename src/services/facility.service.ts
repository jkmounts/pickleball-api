import db from './db.service';

type Facility = {
  name: string;
  address: string;
  city: string;
  state: string;
  public: boolean;
}

export default class FacilityService {
  async add(facility: Facility) {
    const res = await db.createNode('Facility', facility);
    return res;
  }
}