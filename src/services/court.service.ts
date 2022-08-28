import db from './db.service';

export default class CourtService {
  async all() {
    const query = `
    MATCH (m:Movie)
    return m`;
    const res = await db.read(query);
    return res;
  }
}