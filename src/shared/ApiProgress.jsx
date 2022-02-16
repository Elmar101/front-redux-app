import {useState,useEffect} from "react";
import axios from "axios";
/* const getDisplayName = (WrapperComponent)=> {
  return WrapperComponent.displayName || WrapperComponent.name || "Component";
}
WrrapperComponent.displayName = `ApiProgres(${getDisplayName(Component)})`; */
export const useApiProgress = (props) => {
  const {apiMethod,apiPath} = props;
  //console.log("api progress call oldu")
  const [pendingApiCall , setPendingApiCall ] = useState(false);

  useEffect(()=>{
    let requestInterceptorReject;
    let responseInterceptorReject; 

    const updateApiCallFor = (url, method, isBoolean) => {
      if (url.toString().startsWith(apiPath.toString()) && apiMethod.toLowerCase() === method.toLowerCase()) {
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
  },[apiPath,apiMethod])

  return pendingApiCall;
}



/* const getDisplayName = (WrapperComponent)=> {
  return WrapperComponent.displayName || WrapperComponent.name || "Component";
}
export const withApiProgress = (Component, path) => {

  const WrrapperComponent = (props) => {
    WrrapperComponent.displayName = `ApiProgres(${getDisplayName(Component)})`;

    const [state, setState] = useState({pendingApiCall: false});

    const updateApiCallFor = (url, isBoolean) => {
      if (url === path) {
        setState({...state, pendingApiCall: isBoolean});
      }
    };

    useEffect(() => {
      const requestInterceptorReject = axios.interceptors.request.use((request) => {
        updateApiCallFor(request.url, true);
        return request;
      });

      const responseInterceptorReject = axios.interceptors.response.use(
        (response) => {
          updateApiCallFor(response.config.url, false);
          return response;
        },
        (error) => {
          updateApiCallFor(error.config.url, false);
          throw error;
        }
      );

      return () => {
        axios.interceptors.request.eject(requestInterceptorReject);
        axios.interceptors.response.eject(responseInterceptorReject);
      };
    })
    return <Component pendingApiCall = {state.pendingApiCall} {...props}/>;
  };
  
  return WrrapperComponent;
};
 */



/* import React from "react";
import axios from "axios";

const getDisplayName = (WrapperComponent)=> {
  return WrapperComponent.displayName || WrapperComponent.name || "Component";
}
export  const withApiProgress = (WrapperComponent, path) => {
  
  return class extends React.Component {
    static displayName = `ApiProgres(${getDisplayName(WrapperComponent)})`;
    
    state = {
      pendingApiCall: false,
    };
    updateApiCallFor = (url, isBoolean) => {
      if (url === path) {
        this.setState((pendingApiCall) => (pendingApiCall = isBoolean));
      }
    };

    componentDidMount() {
      axios.interceptors.request.use((request) => {
        this.updateApiCallFor(request.url, true);
        return request;
      });

      axios.interceptors.response.use(
        (response) => {
          this.updateApiCallFor(response.config.url, false);
          return response;
        },
        (error) => {
          this.updateApiCallFor(error.config.url, false);
          throw error;
        }
      );
    }

    render() {
      const { pendingApiCall } = this.state;
      return <WrapperComponent pendingApiCall = {pendingApiCall} {...this.props} />;
    }
  };
} */
