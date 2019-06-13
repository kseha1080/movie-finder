import React from "react";
import { render } from "react-dom";
import Wrapper from "./app/wrapper";
import "./scss/app.scss";
import { store } from "./app/store";

render(<Wrapper store={store} />, document.getElementById("root"));
