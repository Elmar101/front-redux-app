import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getNewTextCount, getOldTexts, getPostTexts } from "../../api/apiCalls";
import { useApiProgress } from "../../shared/ApiProgress";
import XSippiner from "../../x-lib/components/XSippiner";
import { TextView } from "./TextView";
import { useParams } from "react-router-dom";
import { getNewTexts } from "./../../api/apiCalls";

const TextFeed = () => {
  const { username } = useParams();
  const { t } = useTranslation();
  const [texts, setTexts] = useState({ content: [], last: true });
  const [count, setCount] = useState(0);
  const apiPath = username
    ? `/api/1.0/users/${username}/texts?page=`
    : "/api/1.0/texts?page=";
  const initialTextsLoadProgress = useApiProgress({
    apiMethod: "get",
    apiPath: apiPath,
  });
 
  let lastTextsId = 0;
  let firstTextId = 0;
  if (texts.content.length > 0) {
    firstTextId = texts.content[0].id;
    const loadOldTextsIndex = texts.content.length - 1;
    lastTextsId = texts.content[loadOldTextsIndex].id;
  }

  const pathOldTexts = username
    ? `/api/1.0/users/${username}/texts/${lastTextsId}`
    : `/api/1.0/texts/${lastTextsId}`;
  const loadOldTextsProgress = useApiProgress({
    apiMethod: "get",
    apiPath: pathOldTexts,
    strickPath: true,
  });

  const newHoaxPath = username
    ? `/api/1.0/users/${username}/texts/${firstTextId}?direction=after`
    : `/api/1.0/texts/${firstTextId}?direction=after`;
  const loadNewTextsProgress = useApiProgress({apiMetod: 'get', apiPath: newHoaxPath, strickPath: true});
 
  useEffect(() => {
    const loadText = () => {
      getPostTexts(username)
        .then((response) => {
          setTexts((prevTexts) => ({
            ...prevTexts,
            content: [...prevTexts.content, ...response.data.content],
            last: response.data.last,
          }));
        })
        .catch((error) => {});
    };
    loadText();
  }, [username]);

  useEffect(() => {
    const getCount = async () => {
      const response = await getNewTextCount(firstTextId, username);
      setCount((prevCount) => (prevCount = response.data.count));
    };
    const t = setInterval( getCount , 1000);
    return () => {
      clearInterval(t);
    };
  }, [firstTextId, username]);

  const loadOldText = async () => {
    const response = await getOldTexts(lastTextsId, username);
    try {
      setTexts((prevTexts) => ({
        ...prevTexts,
        content: [...prevTexts.content, ...response.data.content],
        last: response.data.last,
      }));
    } catch (error) {
    
    }
  };

  const loadNewTexts = async () => {
    const response = await getNewTexts(firstTextId,username);
    try {
      setTexts({
        ...texts,
        content: [...response.data, ...texts.content],
      });

      setCount(0);
    } catch (err) {
    
    }
  };

  const onDeleteTextSuccess = (id) => {
    setTexts({
      ...texts,
      content: texts.content.filter((content) => content.id !== id),
    });
  };

  if (texts.content.length === 0) {
    return (
      <div className="alert alert-secondary text-center mb-1">
        {initialTextsLoadProgress ? <XSippiner /> : t("There are no texts")}
      </div>
    );
  }
  return (
    <div>
      {count > 0 && (
        <div 
          className="alert alert-secondary text-center mb-1"
          style={{ cursor: loadNewTextsProgress ? 'not-allowed' : 'pointer' }}
          onClick={loadNewTextsProgress ? () => {} : loadNewTexts}
        
        >
          {loadNewTextsProgress ? <XSippiner/> : t("There are new hoaxes")}
        </div>
      )}
      {texts.content.map((text, i) => (
        <TextView
          key={text.id}
          text={text}
          onDeleteText={onDeleteTextSuccess}
        />
      ))}
      {!texts.last && (
        <div
          className="alert alert-secondary text-center"
          style={{ cursor: loadOldTextsProgress ? "not-allowed" : "pointer" }}
          onClick={
            loadOldTextsProgress
              ? () => {}
              : loadOldText    
          }
        >
          {loadOldTextsProgress ? <XSippiner /> : t("Load old texts")}
        </div>
      )}
    </div>
  );
};

export default TextFeed;
