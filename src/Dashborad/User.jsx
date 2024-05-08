import { useState } from "react";
import Swal from "sweetalert2";

const User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  
  // Validation states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation before submission
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log(name, email, password, role, status);
      const user = { name, email, password, role, status };
      fetch("https://react-js-server.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "successfully added",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  const validateForm = () => {
    let isValid = true;
    // Reset previous error messages
    setNameError("");
    setEmailError("");
    setPasswordError("");

    // Validate name
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    // Validate password (add more conditions as needed)
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    }

    return isValid;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100"
    >
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            className="input input-bordered"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="text-red-500">{nameError}</p>}
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
          {emailError && <p className="text-red-500">{emailError}</p>}
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
          {passwordError && <p className="text-red-500">{passwordError}</p>}
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
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div>
      </div>
      <input
        className="btn w-1/2 mx-auto bg-green-400 text-white  hover:bg-red-400 mb-4 "
        type="submit"
        value="submit"
      ></input>
    </form>
  );
};

export default User;
