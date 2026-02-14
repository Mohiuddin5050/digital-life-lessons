import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import Container from "../../../components/Container";
import { Link } from "react-router";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const handleToggleRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: "Change role?",
      text: `This user will become ${newRole}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.patch("/admin/users/role", {
      email: user.email,
      role: newRole,
    });

    // 🔥 THIS IS THE KEY
    refetch();

    Swal.fire("Updated!", "Role updated successfully", "success");
  };

  const handleDelete = (email) => {
    Swal.fire({
      title: "Delete user?",
      text: "This action cannot be undone",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/admin/users/${email}`).then(() => {
          refetch();
          Swal.fire("Deleted!", "User removed", "success");
        });
      }
    });
  };

  return (
    <Container>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-3xl text-center m-10 font-bold mb-6">
          Manage Users
        </h2>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Lessons</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, i) => (
                <tr key={user.email}>
                  <th>{i + 1}</th>
                  <td>
                    <Link to={`/profile/${user.email}`}>
                    {user.displayName || "N/A"}</Link>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className="capitalize">{user.role}</span>
                  </td>
                  <td>{user.totalLessons}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleToggleRole(user)}
                      className={`btn btn-xs ${
                        user.role === "admin" ? "btn-warning" : "btn-primary"
                      }`}
                    >
                      {user.role === "admin" ? "Demote" : "Promote"}
                    </button>

                    <button
                      onClick={() => handleDelete(user.email)}
                      className="btn btn-xs btn-error"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No users found</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ManageUsers;
