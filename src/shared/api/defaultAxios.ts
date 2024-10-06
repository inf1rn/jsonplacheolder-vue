import axios from "axios";

const defaultAxios = axios.create();
defaultAxios.defaults.baseURL = import.meta.env.VITE_DATA_ENDPOINT;

export { defaultAxios };
