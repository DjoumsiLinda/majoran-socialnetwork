import BioEditor from "../App/BioEditor.js";
import { render, fireEvent, waitFor } from "@testing-library/react";

test("When no bio is passed to it, an Add button is rendered", () => {
    const { container } = render(<BioEditor />);
    expect(container.querySelector("button").innerHTML).toBe(
        "Add your Biography now"
    );
});

test("When a bio is passed to it, an Edit button is rendered.", () => {
    const { container } = render(<BioEditor bio="fakeBio" />);
    expect(container.querySelector("button").innerHTML).toBe(" Edit");
});

test("Clicking either the Edit button causes a Save button to be rendered.", () => {
    const fakehandleClickEdit = jest.fn();
    const { container } = render(
        <BioEditor bio="fakeBio" onClick={fakehandleClickEdit} />
    );
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").innerHTML).toBe("Save");
});

test("Clicking either the Add button causes a Save button to be rendered.", () => {
    const fakehandleClickAdd = jest.fn();
    const { container } = render(<BioEditor onClick={fakehandleClickAdd} />);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").innerHTML).toBe("Save");
});

test("Clicking the Save button causes an HTTP request.", async () => {
    //fabrique un res qui a ete fetch ds le bioEditor.json
    fetch.mockResolvedValue({
        ok: true,
    });
    const fakehandleClickSave = jest.fn();
    const { container } = render(<BioEditor setbio={fakehandleClickSave} />);
    fireEvent.click(container.querySelector("button"));
    fireEvent.change(container.querySelector("textarea"));
    fireEvent.click(container.querySelector("button"));

    await waitFor(() => {
        expect(fakehandleClickSave.mock.calls.length).toBe(1);
        console.log(container.innerHTML, fakehandleClickSave.mock.calls.length);
    });
});
