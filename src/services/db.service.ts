import { getDriver } from "../neo4j";

export default {
  read: async (query: string, params?: object) => {
    const session = getDriver().session();
    const res = await session.readTransaction(tx => tx.run(query, params));
    await session.close();
    return res;
  },
  write: async (query: string, params?: object) => {
    const session = getDriver().session();
    const res = await session.writeTransaction(tx => tx.run(query, params));
    await session.close();
    return res;
  }
}