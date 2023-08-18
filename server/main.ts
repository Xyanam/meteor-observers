import { Meteor } from "meteor/meteor";
import { UsersCollection } from "/imports/api/UsersCollection";

import "/imports/api/UsersMethods";
import { ProfileCollection } from "/imports/api/ProfileCollection";

Meteor.startup(() => {
  Meteor.publish("users.full", function () {
    const userCursor = UsersCollection.find({});
    const profileCursor = ProfileCollection.find({});

    const handleUser = userCursor.observe({
      added: (user) => {
        const profileData = ProfileCollection.findOne({ userId: user._id });
        if (profileData) {
          user.profile = profileData;
          this.added("UsersFull", user._id, user);
        }
      },
      changed: (newData) => {
        const profileData = ProfileCollection.findOne({ userId: newData._id });
        if (profileData) {
          this.changed("UsersFull", newData._id, { profile: profileData });
        }
      },
      removed: (oldData) => {
        this.removed("UsersFull", oldData._id);
      },
    });

    const handleProfile = profileCursor.observe({
      changed: (newData) => {
        const userData = UsersCollection.findOne({ _id: newData.userId });
        if (userData) {
          const user = { ...userData, profile: newData };
          this.changed("UsersFull", userData._id, user);
        }
      },
    });

    this.ready();

    this.onStop(() => {
      handleUser.stop();
      handleProfile.stop();
    });
  });
});
