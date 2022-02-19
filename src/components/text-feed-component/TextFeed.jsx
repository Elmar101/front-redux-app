import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPostTexts } from "../../api/apiCalls";
import { useApiProgress } from "../../shared/ApiProgress";
import XSippiner from "../../x-lib/components/XSippiner";
import { TextView } from "./TextView";

const TextFeed = () => {
  const { t } = useTranslation();
  const [texts, setTexts] = useState({ content: [],last: true, number: 0 });
  const pendingApiCall = useApiProgress({apiMethod: 'get', apiPath: "/api/1.0/texts"});
  const loadText = useCallback((page) => {
      getPostTexts(page).then(response=> {
      setTexts(prevTexts=> ({
        ...prevTexts,
        content: [
          ...prevTexts.content,
          ...response.data.content
        ],
        last: response.data.last,
        number : response.data.number
      }))})
      .catch (error=>{}) 
  }, []);

  useEffect(() => {
    loadText(texts.number)
  }, [loadText,texts.number]);

  if (texts.content.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        {pendingApiCall ? <XSippiner/> : t('There are no texts')}
      </div>
    );
  }
  return (
    <div>
      {
        texts.content.map((text,i)=> (
          <TextView key = {i} text={text}/>
        ))
      }
      {!texts.last && <div 
          className="alert alert-secondary text-center"
          style={{ cursor: pendingApiCall ? "not-allowed" : 'pointer' }}
          onClick={pendingApiCall ? ()=> {} : ()=>{
            loadText(texts.number + 1) 
          }}
          >
          { pendingApiCall ? <XSippiner/> : t('Load old texts')}
        </div>
      }
    </div>
    
  );
};

export default TextFeed;
