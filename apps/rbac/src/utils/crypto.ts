import JSEncrypt from 'jsencrypt';
import { template } from 'lodash-es';

export function compilePublicKey(key: string) {
  const compiled = template('-----BEGIN PUBLIC KEY-----\n<%= publickKey %>\n-----END PUBLIC KEY-----');
  return compiled({ publickKey: key });
}

export async function getPem() {
  const { data } = await getAuthLoginKey();
  const key = await compilePublicKey(data!);
  return key;
}

export async function encryptWithPublicKey(publicKey: string, data: string) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  const encrypted = encryptor.encrypt(data);
  return encrypted as string;
}

export async function getEncryptedData(str: string) {
  const key = await getPem();
  const value = await encryptWithPublicKey(key, str);
  return value;
}
