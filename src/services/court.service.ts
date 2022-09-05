import dbService from './db.service';

type Court = {
  name?: string,
  number?: string,
}

export default class CourtService {
  async all() {
    const query = `
    MATCH (court:Court)
    return court`;
    const res = await dbService.read(query);
    return res;
  }
  
  async add(court: Court) {
    const res = await dbService.createNode('Court', court);
    return res;
  }
}