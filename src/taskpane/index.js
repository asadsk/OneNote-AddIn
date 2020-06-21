import "office-ui-fabric-react/dist/css/fabric.min.css";
import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { store } from "./../helpers";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import * as React from "react";
import * as ReactDOM from "react-dom";
/* global AppCpntainer, Component, document, Office, module, React, require */

initializeIcons();

let isOfficeInitialized = false;

const title = "Contoso Task Pane Add-in";

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component title={title} isOfficeInitialized={isOfficeInitialized} />
      </AppContainer>
    </Provider>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.initialize = () => {
  isOfficeInitialized = true;
  render(App);
};

/* Initial render showing a progress bar */
render(App);

if (module.hot) {
  module.hot.accept("./components/App/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
