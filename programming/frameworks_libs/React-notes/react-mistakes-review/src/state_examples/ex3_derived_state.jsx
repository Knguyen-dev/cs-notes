/*
+ Storing derived state:
- A derived state is a state that can be derived by an existing
state in the application. It doesn't need to be a state as 
we can find out what it is using existing state. As well as 
this, it can get out of sync. In Kyle's example, if you 
increment the age of the current user, the update for 
age doesn't show on the selectedUser. This is because it's only
the user in the state array being updated. 

- Solution: Rather htan storing the 'user' object, store something 
like the id of the currently selected user. We store an identifier
that isn't going to change and then create the selectedUser.
*/

import { useState } from "react";
export default function Ex3_Derived() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Kyle",
      age: 25,
    },
    {
      id: 2,
      name: "Irene",
      age: 32,
    },
    {
      id: 3,
      name: "Cain",
      age: 46,
    },
  ]);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const selectedUser = users.find((user) => {
    return user.id === selectedUserId;
  });

  const selectUser = (id) => setSelectedUserId(id);

  const updateUser = (id, name) => {
    setUsers((prevUsers) => {
      const newUsers = [...prevUsers];
      const user = newUsers.find((user) => user.id === id);
      user.name = name;
      return newUsers;
    });
  };

  return users.map((user) => user.name).join(", ");
}
