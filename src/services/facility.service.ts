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
    const keys = Object.keys(facility);
    const queryProperties = keys.reduce((string, key, currentIndex) => {
      string += `${key}: $${key}`;
      if (currentIndex !== keys.length - 1) {
        string += ', '
      }
      return string;
    }, '')
    const query = `
      CREATE (facility:Facility {${queryProperties}})
      RETURN facility`;
    const res = await db.write(query, facility);
    return res;
  }
}