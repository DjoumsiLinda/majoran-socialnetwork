import "../css/Registration.css";
import { Link } from "react-router-dom";
import useForm from "../useForm.js"; //custom Hooks
import useAuthSubmit from "../useAuthSubmit.js"; //custom Hooks

export default function Registration() {
    const [form, handleChange] = useForm({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });
    const [submit, error] = useAuthSubmit("/registration.json", {
        first: form.firstname,
        last: form.lastname,
        email: form.email,
        password: form.password,
    });

    return (
        <div id="regis">
            <h2>Join LKD~Fashion</h2>
            {error && (
                <p className="error">
                    There are already an account with these emails adresse!
                </p>
            )}
            <form className="registration" onSubmit={submit}>
                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={form.firstname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={form.lastname}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-Mail-Adresse"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
            <Link to="/login">Click here to Log in!</Link>
        </div>
    );
}
