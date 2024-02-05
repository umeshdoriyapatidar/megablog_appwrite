import config from '../config/config.js'
import { Client, Account, ID } from 'appwrite'
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
         .setEndpoint(config.appWriteURL)
         .setProject(config.appWriteProjectId);
    this.account = new Account(this.client)
  }

  async createAccount({name, email, password}) {
    try {
       const userAccount = await this.account.create(ID.unique(), email, password, name)
       if (userAccount) {
         // return userAccount
        //call another method to directly log-in user
        return this.login({email, password})
       } else {
        return userAccount;
       }
    } catch (error) {
         throw error;
    }
  }
 
  async login({email, password}) {
    try {
      return await this.account.createEmailSession(email, password)
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
       return await this.account.get();
    } catch (error) {
      console.log("Appwrite Service :: getCurrentUser :: Error", error)
    }

    return null;
  }

  async logout(){
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.log("AppWriteService::Logout::Error", error);
    }
  }
}
const authService = new AuthService();
export default authService