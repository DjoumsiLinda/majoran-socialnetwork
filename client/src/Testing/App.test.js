import App from "../App/App.js";
import { render, waitFor } from "@testing-library/react";

test("App will eventually render user info", async () => {
    //fabrique un user qui a ete fetch ds le App.js
    fetch.mockResolvedValue({
        ok: true,
        json() {
            return {
                id: 3,
                first: "Michael",
                last: "Jackson",
                email: "fake",
                picture:
                    "https://upload.wikimedia.org/wikipedia/commons/5/5a/George_H._W._Bush_with_Michael_Jackson_%28cropped%29.png",
                bio: "musician",
            };
        },
    });

    const { container } = render(<App />);

    //console.log(container.innerHTML);

    expect(container.innerHTML).toContain("Loading...");
    await waitFor(() => {
        expect(container.querySelector("header")).toBeTruthy();
        // console.log(container.innerHTML);

        expect(container.querySelector("h2").innerHTML).toBe("Michael Jackson");
    });
});
