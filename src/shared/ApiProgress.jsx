import {useState,useEffect} from "react";
import axios from "axios";
export const useApiProgress = (props) => {
  const {apiMethod,apiPath , strickPath} = props;
  const [pendingApiCall , setPendingApiCall ] = useState(false);

  useEffect(()=>{
    let requestInterceptorReject;
    let responseInterceptorReject; 

    const updateApiCallFor = (url, method, isBoolean) => {
      if(method !== apiMethod){
        return ;
      }
      if(strickPath && url === apiPath){
        setPendingApiCall( isBoolean );
      }
      else if (!strickPath && url.toString().startsWith(apiPath.toString())) {
        setPendingApiCall( isBoolean );
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
  },[apiPath,apiMethod,strickPath])

  return pendingApiCall;
}
