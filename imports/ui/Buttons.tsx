import { Meteor } from "meteor/meteor";
import React from "react";

const Buttons = () => {
  const generateUsers = () => {
    for (let i = 1; i <= 20; i++) {
      Meteor.call("users.insert", `user#${Math.random()}`);
    }
  };

  const refreshDates = () => {
    Meteor.call("users.refreshDates");
  };

  const deleteAllUsers = () => {
    Meteor.call("users.deleteAll");
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={generateUsers}>Сгенерировать 20 пользователей</button>
      <button onClick={deleteAllUsers}>Удалить всех пользователей</button>
      <button onClick={refreshDates}>Освежить даты</button>
    </div>
  );
};

export default Buttons;
