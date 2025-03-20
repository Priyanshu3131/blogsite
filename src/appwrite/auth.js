import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;

    constructor() { //constructor is a special method in a class that runs only once when an object of that class is created.
        //Connects to your Appwrite backend using values from conf.
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);  //Initializes this.account, which will be used for authentication.
    }
    async createAccount({email, password, name}) {  // async function waits for Appwrite to create the user before moving to the next line.
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password); //createEmailSession
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}
const authService = new AuthService();
export default authService