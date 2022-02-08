import React, { useEffect, useState } from "react";
import { getUsers } from "../../../api/apiCalls";
import { useTranslation } from "react-i18next";
import UserListItem from "./UserListItem";
const initialState = {
  page: {
    content: [],
    number: 0,
    size: 3,
    first: null,
    last: null,
  },
};
const UserList = () => {
  const { t } = useTranslation();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    loadUsers(state.page.number, state.page.size);
  }, []);

  const onNextPage = () => {
    const nextPage = state.page.number + 1;
    loadUsers(nextPage, state.page.size);
  };

  const onPrevPage = () => {
    const nextPage = state.page.number - 1;
    loadUsers(nextPage, state.page.size);
  };

  function loadUsers(page, size) {
    getUsers(page, size)
      .then((response) => {
        setState({ ...state, page: response.data });
      })
      .catch((error) => {});
  }

  return (
    <div className="card">
      <h3 className="card-header text-center">{t("Users")}</h3>
      <div className="list-group-flush">
        {state.page.content.map((user) => (
          <UserListItem key={user.username} user={user} />
        ))}
      </div>
      <div>
        {state.page.first === false && (
          <button className="btn btn-sm btn-light float-left" onClick={onPrevPage}>
            {t('previous page')}
          </button>
        )}
        {state.page.last === false && (
          <button
            className="btn btn-sm btn-light float-right"
            onClick={onNextPage}
          >
            {t('next page')}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserList;

/*   const onDelete = (index) => {
      //console.log(index," - index ci" )
      const users = [...state.users];
      users.splice(index,1);
      setState({ ...state, users: users })
} */
/*  {state.users.map( (user,index)=> (<UserItem key={user.username} user = {user} onDelete = {()=>onDelete(index)} /> ) )} */
/*/
 state.users.map((user)=>(
          <XTable users = {user.username} /> 
       )) 
/*/
