import FriendBtn from "../App/FriendBtn.js";
import { render, waitFor, fireEvent } from "@testing-library/react";

test("Send Friends Request", async () => {
    //fabrique un user qui a ete fetch ds le App.js
    fetch.mockResolvedValue({
        ok: true,
        json() {
            return 0;
        },
    });

    const { container } = render(<FriendBtn id="12" />);

    await waitFor(() => {
        expect(container.querySelector("button").innerHTML).toBe(
            "Send Friends Request"
        );
        console.log(container.innerHTML);
    });
});

test("Unfriend", async () => {
    //fabrique un user qui a ete fetch ds le App.js
    fetch.mockResolvedValue({
        ok: true,
        json() {
            return {
                accepted: true,
            };
        },
    });

    const { container } = render(<FriendBtn id="12" />);

    await waitFor(() => {
        expect(container.querySelector("button").innerHTML).toBe("Unfriend");
        console.log(container.innerHTML);
    });
});
test("Cancel Friend Request", async () => {
    //fabrique un user qui a ete fetch ds le App.js
    fetch.mockResolvedValue({
        ok: true,
        json() {
            return {
                accepted: false,
            };
        },
    });

    const { container } = render(<FriendBtn id="12" />);

    await waitFor(() => {
        expect(container.querySelector("button").innerHTML).toBe(
            "Cancel Friend Request"
        );
        console.log(container.innerHTML);
    });
});

test("Accept Friend Request", async () => {
    //fabrique un user qui a ete fetch ds le App.js
    fetch.mockResolvedValue({
        ok: true,
        json() {
            return {
                accepted: false,
                sender_id: "12",
            };
        },
    });

    const { container } = render(<FriendBtn id="12" />);
    fireEvent.click(container.querySelector("button"));

    await waitFor(() => {
        expect(container.querySelector("button").innerHTML).toBe(
            "Accept Friend Request"
        );
        console.log(container.innerHTML);
    });
});
