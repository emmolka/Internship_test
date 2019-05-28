import React from "react";

const LogOut = props => {
  return (
    <div className="logout-div" onClick={props.logOut}>
      <button>
        <p>Log out</p>
      </button>
    </div>
  );
};

export default LogOut;
