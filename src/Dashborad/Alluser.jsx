import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Alluser = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const handleDelete = (_id) => {
        console.log(_id);
        fetch(`https://react-js-server.vercel.app/users/${_id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "successfully delete",
                    showConfirmButton: false,
                    timer: 1500
                });
                const remaining = users.filter(user => user._id !== _id);
                setUsers(remaining);
            }
        });
    };

    // Filter users based on role and status
    const filteredUsers = users.filter(user => {
        if (filterRole && user.role !== filterRole) return false;

        if (filterStatus !== "") {
            const status = filterStatus === "active" ? true : false;
            if (user.status !== status) return false;
        }

        if (searchTerm &&
            !user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !user.email.toLowerCase().includes(searchTerm.toLowerCase())
        ) return false;
        
        return true;
    });

    return (
        <div>
            {/* Search and Filter Controls */}
            <div className="search-filter">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <select value={filterRole} onChange={e => setFilterRole(e.target.value)}>
                    <option value="">Filter by Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="">Filter by Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="md:overflow-x-hidden overflow-x-hidden  md:w-auto lg:w-full">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Link to={`/update/${user._id}`}>
                                        <button className="btn md:ml-4 ml-4">Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(user._id)} className="btn m-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Alluser;
