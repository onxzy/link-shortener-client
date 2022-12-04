import {Client, Account, Databases} from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://appwrite.onxzy.dev/v1')
  .setProject('638b9bd15873b1a50512');

export const account = new Account(client);
export const databases = new Databases(client);
export const config = {
  db: '638b9c07a36640af5236',
  collection: '638b9c0c6efde5f3f40e'
}
