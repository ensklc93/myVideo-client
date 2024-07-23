import React from "react";
import { useParams } from "react-router-dom";

export const ProfileView = ({ users }) => {
  const { userName } = useParams();

  const user = users.find(u => u.username === userName);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Birthday: {user.birthday}</p>
      <h2>Favorite Movies</h2>
      <div>
        {user.favorites}
        </div>
    </div>
  );
};
