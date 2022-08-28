import { toNativeTypes } from '../utils';
import db from './db.service';

type Court = {
  name: string,
  city: string,
  state: string,
}

export default class CourtService {
  async all() {
    const query = `
    MATCH (court:Court)
    return court`;
    const res = await db.read(query);
    return res.records.map(r => toNativeTypes(r.get('court')));
  }
  
  async add(court: Court) {
    const query = `
      CREATE (n:Court { name: $name, city: $city, state: $state })
      return n
    `
    const res = await db.write(query, court)
    return res;
  }
}