import { toNativeTypes } from '../utils';
import { createNode, read} from './db.service';

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
    const res = await read(query);
    return res.records.map(r => toNativeTypes(r.get('court')));
  }
  
  async add(court: Court) {
    const res = await createNode('Court', court);
    return res;
  }
}