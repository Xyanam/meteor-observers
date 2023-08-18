import React from "react";

import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

import { Mongo } from "meteor/mongo";

interface UserType {
  _id: string;
  username: string;
  profileId: string;
  profile: {
    userId: string;
    _id: string;
    createdAt: Date;
  };
}

export const UsersFull = new Mongo.Collection("UsersFull");

const Users = () => {
  Meteor.subscribe("users.full");

  const users = useTracker(() => UsersFull.find().fetch());

  const handleDeleteUser = (userId: string) => {
    Meteor.call("users.delete", userId);
  };

  return (
    <div>
      <h1>Users</h1>
      <div>
        {users.map((user: UserType) => (
          <div className="user" key={user._id}>
            <p>Имя: {user?.username}</p>
            <p>Айди профиля: {user?.profileId}</p>
            <p>Дата: {new Date(user?.profile?.createdAt).toLocaleString()}</p>
            <button onClick={() => handleDeleteUser(user._id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
