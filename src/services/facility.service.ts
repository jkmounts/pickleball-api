import dbService from './db.service';

type Facility = {
  name: string;
  address: string;
  city: string;
  state: string;
  public: boolean;
}

export default class FacilityService {
  async add(facility: Facility) {
    const res = await dbService.createNode('Facility', facility);
    return res;
  }

  async all() {
    const query = `
    MATCH (facility:Facility)
    return facility`;
    const res = await dbService.read(query);
    return res;
  }
}