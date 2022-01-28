import ReactDOM from "react-dom";
//redux import
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./redux/reducer";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";

import Welcome from "./Welcome/Welcome.js";
import App from "./App/App.js";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

fetch("/user/id.json")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // user is logged in
        if (data.userId) {
            ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>,
                document.querySelector("main")
            );
        } else {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        }
    });
