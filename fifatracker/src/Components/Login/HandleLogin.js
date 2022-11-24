import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase App.js";
import ToastMaker from "../ToastMaker";

export default class HandleLogin {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async Login() {
    try {
      await signInWithEmailAndPassword(auth, this.email, this.password);
    } catch (error) {
      //TODO: temporary only!!
      console.log(error);
      new ToastMaker().ShowErrorToast(error.message);
    }
  }
}
