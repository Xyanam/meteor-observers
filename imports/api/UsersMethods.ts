import { Meteor } from "meteor/meteor";
import { UsersCollection } from "./UsersCollection";
import { ProfileCollection } from "./ProfileCollection";

Meteor.methods({
  "users.insert"(username: string) {
    const userId = UsersCollection.insert({ username });
    const profileId = ProfileCollection.insert({
      userId,
      createdAt: new Date(),
    });
    UsersCollection.update(userId, { $set: { profileId } });
  },
  "users.delete"(userId) {
    const user = UsersCollection.findOne(userId);

    if (user) {
      ProfileCollection.remove({ _id: user.profileId });
      UsersCollection.remove(userId);
    }
  },
  "users.refreshDates"() {
    ProfileCollection.update(
      {},
      { $set: { createdAt: new Date() } },
      { multi: true }
    );
  },
  "users.deleteAll"() {
    const users = UsersCollection.find().fetch();
    users.forEach((user) => {
      ProfileCollection.remove({ _id: user.profileId });
      UsersCollection.remove(user._id);
    });
  },
});
