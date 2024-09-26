import axiosProvider from "src/commons/axios-provider";
import { HttpClientProvider } from "src/commons/http/http-client.provider";
import configuration from "src/config/configuration";

export default () => {
    return new HttpClientProvider(axiosProvider(configuration().cep_api_url));
}