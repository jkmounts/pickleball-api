import { getDriver } from '../neo4j';
import { toNativeTypes } from '../utils';


const dbService = {
  read: async function (query: string, params?: object) {
    const session = getDriver().session();
    const res = await session.readTransaction(tx => tx.run(query, params));
    await session.close();
    return res.records.map(r => toNativeTypes(r));
  },
  
  write: async function (query: string, params?: object) {
    const session = getDriver().session();
    const res = await session.writeTransaction(tx => tx.run(query, params));
    await session.close();
    return res;
  },
  
  createNode: async function (label: string, data?: object) {
    let propertiesString = '';
    if (data) {
      const properties = Object.keys(data);
      propertiesString = properties.reduce((string, key, index) => {
        string += `${key}: $${key}`;
        return index === properties.length -1 ? string : string += ', ';
      }, '');
    }
    const query = `
        CREATE (node:${label} {${propertiesString}})
        RETURN node;
      `;
    const res = await this.write(query, data);
    return toNativeTypes(res.records[0].get('node'));
  }
};

export default dbService;