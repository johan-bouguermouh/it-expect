// pages/posts.jsx
import { getUsers } from "@/app/services/userService";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

// Création de l'interfce utilisateur
interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
}

function Users() {
  // This useQuery could just as well happen in some deeper child to
  // the "Posts"-page, data will be available immediately either way
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users?.map((user: any) => (
          <li key={user.id}>{user.firstName + " " + user.lastName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
