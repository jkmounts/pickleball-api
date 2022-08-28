import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, SALT_ROUNDS } from '../constants.js';
import db from './db.service';

type User = {
  userId: string,
  email: string,
  name: string,
}

export default class AuthService {
  userToClaims(user: User) {
    const { name, userId } = user

    return { sub: userId, userId, name, }
  }
  async register(email: string, plainPassword: string, name: string) {
    const encrypted = await hash(plainPassword, SALT_ROUNDS);
    const query = `
      CREATE (u:User {
        userId: randomUuid(),
        email: $email,
        password: $encrypted,
        name: $name
      })
      RETURN u`;
    const params = { email, encrypted, name };
    const res = await db.write(query, params);
    const node = res.records[0].get('u');
    const { password, ...safeProperties } = node.properties;

    return {
      ...safeProperties,
      token: jwt.sign(this.userToClaims(safeProperties), JWT_SECRET)
    }
    // TODO: Create Validation Constraints in dB (ie, no duplicate email)
  }
}