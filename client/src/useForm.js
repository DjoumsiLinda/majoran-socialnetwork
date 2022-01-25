import { useState } from "react";

// this is our very own useForm hook (custom hook)
export default function useForm(initialValues) {
    const [form, setForm] = useState(initialValues);

    function handleChange(evt) {
        console.log(evt.target.name, evt.target.value);

        setForm({ ...form, [evt.target.name]: evt.target.value });
    }

    return [form, handleChange];
}
