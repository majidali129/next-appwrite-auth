import { conf } from "@/conf/config";
import { Account, Client, ID } from "appwrite";

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};
type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();
appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
  // CREATE NEW USER RECORD IN APPWRITE
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const createdUser = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (createdUser) {
        this.loginUser({ email, password });
      } else {
        return createdUser;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUser({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error) {
      //   throw error;
      console.log("login ERROR::", error);
    }
    return false;
  }
  async getCurrentUser() {
    try {
      return account.get();
    } catch (error) {
      console.log("get current user ERROR::", error);
    }
    return null;
  }
  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.log("logout ERROR::", error);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
