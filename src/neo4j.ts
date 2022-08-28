import neo4j from 'neo4j-driver';
import type { Driver } from 'neo4j-driver';


let driver: Driver;

export async function initDriver(uri: string, username: string, password: string) {
  driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

  await driver.verifyConnectivity();
  return driver;
}

export function getDriver() {
  return driver;
}

export function closeDriver() {
  return driver && driver.close();
}