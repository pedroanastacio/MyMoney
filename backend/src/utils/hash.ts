/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

export const hash = async (str: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(str, salt);
  return hashedString;
}
