import {useState,useEffect} from "react";
import axios from "axios";
export const useApiProgress = (props) => {
  const {apiMethod,apiPath} = props;
  const [pendingApiCall , setPendingApiCall ] = useState(false);

  useEffect(()=>{
    let requestInterceptorReject;
    let responseInterceptorReject; 

    const updateApiCallFor = (url, method, isBoolean) => {
      if (url.toString().startsWith(apiPath.toString()) && apiMethod.toLowerCase() === method.toLowerCase()) {
        setPendingApiCall( isBoolean );
        //console.log(url.toString())
      }
    };

    const registerInterceptors = () => {
      requestInterceptorReject = axios.interceptors.request.use((request) => {
        const {url, method} = request;
        updateApiCallFor(url,method, true);
        return request;
      });

      responseInterceptorReject = axios.interceptors.response.use(
        (response) => {
          const {url, method} = response.config;
          updateApiCallFor(url,method, false);
          return response;
        },
        (error) => {
          const {url, method} = error.config;
          updateApiCallFor(url,method, false);
          throw error;
        }
      );
    }

    const unRegisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptorReject);
      axios.interceptors.response.eject(responseInterceptorReject);
    };

    registerInterceptors ();

    return () => unRegisterInterceptors();
  },[apiPath,apiMethod])

  return pendingApiCall;
}
