import React, { Component, ChangeEvent } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { UserLoginDetails } from "../../models/UserLoginDetails";
import axios from "axios";
import { SuccessfulLoginServerResponse } from "../../models/SuccessfulLoginServerResponse";

interface LoginState {
  userName: string;
  password: string;
}

export default class Login extends Component<any, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = { userName: "", password: "" };
  }

  private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
    const userName = args.target.value;
    this.setState({ userName });
  };

  private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
    const password = args.target.value;
    this.setState({ password });
  };

  public login = async () => {
    try {
      let userLoginDetails = new UserLoginDetails(
        this.state.userName,
        this.state.password
      );
      const response = await axios.post<SuccessfulLoginServerResponse>(
        "http://localhost:3001/users/login",
        userLoginDetails
      );
      const serverResponse = response.data;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + serverResponse.token;

      localStorage.setItem("token", serverResponse.token);
      localStorage.setItem("userName", serverResponse.userName);

      if (serverResponse.userType === "admin") {
        this.props.history.push("/admin");
        localStorage.setItem("userType", "admin");
      } else if (serverResponse.userType === "user") {
        this.props.history.push(`/user/${serverResponse.user_id}`);
        localStorage.setItem("userType", "user");
        // localStorage.setItem("user_id", JSON.stringify(serverResponse.user_id));
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  render() {
    return (
      <div className="login">
        <input
          type="text"
          placeholder="User name"
          name="username"
          value={this.state.userName}
          onChange={this.setUserName}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.setPassword}
        />
        <br />
        <input type="button" value="login" onClick={this.login} /> <br></br>
        <Link to="/register">New User ? Click Here</Link>
      </div>
    );
  }
}
