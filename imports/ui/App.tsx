import React from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { UsersCollection } from "/imports/api/UsersCollection";
import { ProfileCollection } from "../api/ProfileCollection";
import { Meteor } from "meteor/meteor";
import Users from "./Users";
import Buttons from "./Buttons";

export const App = () => {
  return (
    <div>
      <h1>Meteor observers</h1>
      <Buttons />
      <Users />
    </div>
  );
};
