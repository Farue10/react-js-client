import axios from "axios";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");

    const user = useLoaderData();
       

    useEffect(() => {
        setName(user.name || "");
        setEmail(user.email || "");
        setRole(user.role || "");
        setPassword(user.password || "");
        setStatus(user.status || "");
    }, [user]);

    const handleUpdate =async (e) => {
        e.preventDefault();
        console.log(name, email, password, role, status);
        const userUpdate = { name: name, email: email, password: password, role: role, status: status };
        console.log(userUpdate);
        try {
            const response = await axios.put(`https://react-js-server.vercel.app/users/${user._id}`, userUpdate);
            console.log("Update successful:", response?.status);
            // Optionally, perform any action upon successful update
            if(response?.status === 200){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "successfully update",
                    showConfirmButton: false,
                    timer: 1500
                  });
                
            }
            
        } catch (error) {
            console.error("Update failed:", error.message);
        }
        
    }

    return (
        <div>
            <form onSubmit={handleUpdate} className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100">
                <h1 className="text-3xl font-medium text-center uppercase">Update information {user.name}</h1>
                <div className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            className="input input-bordered"
                            type="text border-1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            className="input input-bordered"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            className="input input-bordered"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select
                            className="input input-bordered"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <input
                            className="toggle"
                            type="checkbox"
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                        />
                    </div>

                </div>
                <input
                    className="btn w-1/2 mx-auto text-white bg-black hover:bg-red-400 mb-4 "
                    type="submit"
                    value="SUBMIT"
                />
            </form>
        </div>
    );
};

export default Update;
