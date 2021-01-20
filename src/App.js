import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";

import { ReduxProvider } from "Redux/ReduxProvider";
import { ThemeProvider } from "Styles/ThemeProvider";
import { DashboardController } from "Components/DashboardController";

const client = new ApolloClient({
  uri: "https://paypay-backend.herokuapp.com/",
});

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ReduxProvider>
          <ThemeProvider>
            <DashboardController />
          </ThemeProvider>
        </ReduxProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
