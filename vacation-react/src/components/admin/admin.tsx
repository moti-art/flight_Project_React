import React, { Component , ChangeEvent } from "react";
import { Vacation } from "../../models/Vacation";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import "./admin.css";


interface Admin {
  vacation: Vacation[];
  AdminName: string;
}
export default class admin extends Component<any, Admin> {
  constructor(props: any) {
    super(props);
    this.state = { vacation: [] , AdminName:"" };
  
  }

  public add_vacation = async () => {
    this.props.history.push("/addVacation");
  };

  public edit = async (id: number) => {
    this.props.history.push(`/editVacation/${id}`);
  };

  public delete = async (id: number) => {
    try {
      const response = await axios.delete<any>(
        `http://localhost:3001/vacations/admin/${id}`
      );
      alert(`vacation ID number ${id} been deleted`);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  public logOut= ()=>{
    localStorage.clear();
    this.props.history.push("/");

  }

  public async componentDidMount() {
    console.log("try to get vacations");
    try {
      const response = await axios.get<Vacation[]>(
        "http://localhost:3001/vacations/admin"
      );
      let name =localStorage.getItem("userName")
      this.setState({ vacation: response.data , AdminName:name});
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  render() {
    return (
      <div className="admin">
        <button id="new" onClick={()=>{this.props.history.push("/charts");}}>Charts</button>
    
        <button id="new" onClick={this.add_vacation}>
          Add A New Vacation
        </button>{" "}
        <div className="logInOut">
          <p id="login_name">Admin: {this.state.AdminName}</p>
          <button onClick={this.logOut}>LogOut</button>
        </div>
        <br></br>
        {this.state.vacation.map((vacation) => (
          <div key={vacation.id} className="vacation">
            <Card>
              <CardContent>
                <div className="edit_buttons">
                  <button
                    id="delete"
                    onClick={() => {
                      this.delete(vacation.id);
                    }}
                  >
                    X
                  </button>

                  <button
                    id="edit"
                    onClick={() => {
                      this.edit(vacation.id);
                    }}
                  >
                    edit
                  </button>
                </div>

                <Typography>Description: {vacation.description}</Typography>
                <Typography>Destination: {vacation.destination}</Typography>
                <Typography>Start: {vacation.startDate}</Typography>
                <Typography>End: {vacation.endDate}</Typography>
                <Typography>Price: {vacation.price}</Typography>
                <Typography>
                  {" "}
                  `<img width="250" src={vacation.image} />`
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}
