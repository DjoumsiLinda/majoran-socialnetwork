import { useState } from "react";

// this is our very own useForm hook (custom hook)
export default function useAuthSubmit(url, values) {
    const [error, setError] = useState();

    const submit = () => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then((res) => {
            if (res.ok) {
                location.reload();
            } else {
                setError(true);
            }
        });
    };

    return [submit, error];
}
