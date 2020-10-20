import axios from "axios";
import router from "../router";
import store from "../store";

export default function setup() {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status) {
                switch (error.response.status) {
                    case 401:
                        store.dispatch("logout");
                        router.push("/login");
                        break;
                    case 403:
                        console.log(error.response.status);
                        break;
                    case 404:
                        router.push("/home");
                        break;
                }
                return Promise.reject(error);
            }
        }
    );
}
