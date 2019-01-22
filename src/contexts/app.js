import React, { Component } from "react";

export const AppContext = React.createContext();

export class AppContextProvider extends Component {
  state = {
    user: null,
    time: 0
  };

  setUser = user => {
    this.setState(
      {
        user
      },
      this.startTimer
    );
  };

  startTimer() {
    this.timer = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <AppContext.Provider value={{ ...this.state, setUser: this.setUser }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
