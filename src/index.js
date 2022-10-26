import React from "react";
import { render } from "react-dom";
import { AppView } from './App';
import { Store } from './Store';

render(<AppView store={Store} />, document.getElementById("root"));
