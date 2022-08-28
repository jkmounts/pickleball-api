import { getDriver } from "../neo4j";
import { toNativeTypes } from "../utils";


  export async function read(query: string, params?: object) {
    const session = getDriver().session();
    const res = await session.readTransaction(tx => tx.run(query, params));
    await session.close();
    return res;
  }

  export async function write(query: string, params?: object) {
    const session = getDriver().session();
    const res = await session.writeTransaction(tx => tx.run(query, params));
    await session.close();
    return res;
  }

  export async function createNode(label: string, data?: object) {
    let propertiesString = '';
    if (data) {
      const properties = Object.keys(data);
      propertiesString = properties.reduce((string, key, index) => {
        string += `${key}: $${key}`;
        return index === properties.length -1 ? string : string += ', '
      }, '');
    }
    const query = `
      CREATE (node:${label} {${propertiesString}})
      RETURN node;
    `
    const res = await write(query, data);
    return toNativeTypes(res.records[0].get('node'));
  }