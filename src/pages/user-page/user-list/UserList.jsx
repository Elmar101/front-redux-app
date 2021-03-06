import React, { useCallback, useEffect, useState } from "react";
import { getUsers } from "../../../api/apiCalls";
import { useTranslation } from "react-i18next";
import UserListItem from "./UserListItem";
import { useApiProgress } from "./../../../shared/ApiProgress";
import XSippiner from "../../../x-lib/components/XSippiner";
const initialState = {
  page: {
    content: [],
    number: 0,
    size: 3,
    first: null,
    last: null,
  },
  loadFailure: false
};
const UserList = () => {
  const [state, setState] = useState(initialState);
  const { t } = useTranslation();
  const pendingApiCall = useApiProgress({apiMethod: 'get', apiPath: "api/1.0/users?page"});
  const loadUsers = useCallback((page, size) => {
    setState(state=> ({ ...state,loadFailure: false}))
    getUsers(page, size)
      .then((response) => {
        setState(state=> ({ ...state, page: response.data, loadFailure: false }));
      })
      .catch((error) => {
        setState(state=> ({ ...state,loadFailure: true}))
      });
  },[]);

  useEffect(() => {
     loadUsers(state.page.number, state.page.size);
  }, [loadUsers, state.page.number, state.page.size]);

  const onClickNext = () => {
    const nextPage = state.page.number + 1;
    loadUsers(nextPage, state.page.size);
  };

  const onClickPrevious = () => {
    const nextPage = state.page.number - 1;
    loadUsers(nextPage, state.page.size);
  };

 

  let actionDiv = (
    <div>
      {state.page.first === false && (
        <button className="btn btn-sm btn-light" onClick={onClickPrevious}>
          {t("Previous")}
        </button>
      )}
      {state.page.last === false && (
        <button
          className="btn btn-sm btn-light float-right"
          onClick={onClickNext}
        >
          {t("Next")}
        </button>
      )}
    </div>
  );
  if (pendingApiCall) {
    actionDiv = (
      <XSippiner/>
    );
  }
  return (
    <div className="card">
      <h3 className="card-header text-center">{t("Users")}</h3>
      <div className="list-group-flush">
        {state.page.content.map((user) => (
          <UserListItem key={user.username} user={user} />
        ))}
      </div>
      {actionDiv}
      {state.loadFailure && (
        <div className="text-center text-danger">{t("Load Failure")}</div>
      )}
    </div>
  );
};

export default UserList;
