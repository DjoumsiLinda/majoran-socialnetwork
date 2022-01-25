import ProfilePicture from "../App/ProfilePicture.js";
import { fireEvent, render } from "@testing-library/react";

test("When no picture prop is passed img src should be default image", () => {
    const { container } = render(<ProfilePicture />);

    // HTML rendered by our component
    // console.log(container.innerHTML);

    expect(container.querySelector("img").src.endsWith("/default.jpeg")).toBe(
        true
    );
});

test("When picture pro is passed img src should be whatever is passed in", () => {
    const { container } = render(
        <ProfilePicture picture="https://example.com/" />
    );

    expect(container.querySelector("img").src).toBe("https://example.com/");
});

test("firstname lastname appear as alt on image", () => {
    const { container } = render(
        <ProfilePicture firstname="Michael" lastname="Jackson" />
    );

    expect(container.querySelector("img").alt).toBe("Michael Jackson");
});

test("toggleUploader function is triggered when the img is clicked", () => {
    // mocked function, gives us access to meta information:
    // how many times the function has been called, etc...
    const fakeToggleUploader = jest.fn();

    const { container } = render(
        <ProfilePicture componentVisible={fakeToggleUploader} />
    );

    fireEvent.click(container.querySelector("img"));

    // after the click event, we expect our function
    // to be called exactly one time
    console.log("nacher:", fakeToggleUploader.mock.calls.length);

    expect(fakeToggleUploader.mock.calls.length).toBe(1);
});
