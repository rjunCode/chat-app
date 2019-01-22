import React, { Component } from "react";
import ChatProvider from "./components/chat-provider";
import Login from "./components/login";
import "./app.scss";
import { AppContext, AppContextProvider } from "./contexts/app";

class App extends Component {
  render() {
    return (
      <AppContextProvider>
        <AppContext.Consumer>
          {({ user, setUser, time }) => {
            if (user) {
              return <ChatProvider user={user} time={time} />;
            } else {
              return <Login setUser={setUser} />;
            }
          }}
        </AppContext.Consumer>
      </AppContextProvider>
    );
  }
}

export default App;
