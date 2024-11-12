import { api } from "./api";
import { useJwtStore } from "stores/jwt";

export const AxiosJWT = () => {
    const { jwt, setJwt, setRole } = useJwtStore((state) => state);
    api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
    api.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (
            error.response?.status === 401
        ) {
            setJwt(null);
            setRole(null)
        }
        return Promise.reject(error);
    });
    return <></>
}