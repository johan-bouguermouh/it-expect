import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styles from "./UserTable.module.css";
import { getUsers, User } from "@/services/userService";

export default function UsersTable() {
  const [isClient, setIsClient] = useState(false);

  //Au click on redirege vers la page de l'utilisateur /users/[id]
  const handleClick = (id: number | undefined) => {
    if (!id) return;
    // window.location.href = `/users/${id}`;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    enabled: isClient,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h4>Users</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: User) => (
            <tr key={user.id} onClick={() => handleClick(user.id)}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
