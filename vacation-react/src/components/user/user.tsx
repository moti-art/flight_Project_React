import React, { Component , ChangeEvent } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Vacation } from "../../models/Vacation";
import "./user.css"
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import {FollowedVacation} from "../../models/FollowedVacation"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";



interface User {
  vacation: Vacation[];
  userName : string;
  followVacation: FollowedVacation[];
  departDate: string ;
  returnDate: string;
  keyWord: string;
  isSerachFieldActive: boolean;
}

export default class user extends Component<any, User> {
  constructor(prop: any) {
    super(prop);
    this.state = {
      vacation: [],
      userName: "",
      followVacation: [],
      departDate: "",
      returnDate: "",
      keyWord: "",
      isSerachFieldActive: true,
    };
  }

  public searchByDates = () => {

let arr=[];
let item={};
      for (var i = 0; i < this.state.vacation.length; i++) {
      
             if (this.state.vacation[i].description.toLowerCase().includes(this.state.keyWord) )   {
                 item = this.state.vacation[i];
                 arr.push(item)
        }
      }
      this.setState({vacation:arr})
      this.render()
  };


  private setDepart = (args: ChangeEvent<HTMLInputElement>) => {
    const departDate = args.target.value;
    this.setState({ departDate });
  };
  private setReturn = (args: ChangeEvent<HTMLInputElement>) => {
    const returnDate = args.target.value;
    this.setState({ returnDate });
  };
  private setSearchByWord = (args: ChangeEvent<HTMLInputElement>) => {
    const keyWord = args.target.value;
    this.setState({ keyWord });
  };

  public logOut = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  public async componentDidMount() {
    if (this.state.isSerachFieldActive) {
      try {
        const response = await axios.get<Vacation[]>(
          `http://localhost:3001/vacations/user/${this.props.match.params.id}`
        );
        let name = localStorage.getItem("userName");
        this.setState({ vacation: response.data, userName: name });
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
  }

  public follow = async (
    event: React.ChangeEvent<HTMLInputElement>,
    vacationId: number
  ) => {
    const check = event.target.checked;
    console.log(check + "=====");
    if (check) {
      try {
        let followCurrentVacation = new FollowedVacation(
          this.props.match.params.id,
          vacationId,
          check
        );
        const response = await axios.post<any>(
          `http://localhost:3001/users/user/${this.props.match.params.id}`,
          followCurrentVacation
        );
      } catch (err) {
        alert(err);
        console.log(err);
      }

      try {
        let followCurrentVacation = new FollowedVacation(
          this.props.match.params.id,
          vacationId,
          check
        );
        const response = await axios.put<any>(
          `http://localhost:3001/vacations/user/${this.props.match.params.id}`,
          followCurrentVacation
        );
      } catch (err) {
        alert(err);
        console.log(err);
      }
    } else {
      console.log("gggg");
      try {
        let followCurrentVacation = new FollowedVacation(
          this.props.match.params.id,
          vacationId,
          check
        );
        const response = await axios.put<any>(
          `http://localhost:3001/vacations/user/${this.props.match.params.id}`,
          followCurrentVacation
        );
      } catch (err) {
        alert(err);
        console.log(err);
      }

      try {
        let followCurrentVacation = new FollowedVacation(
          this.props.match.params.id,
          vacationId,
          check
        );
        const response = await axios.put<any>(
          `http://localhost:3001/users/user/${this.props.match.params.id}`,
          followCurrentVacation
        );
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
  };

  render() {
    return (
      <div>
        <div className="searchBar">
          <TextField
            id="date"
            label="Departure"
            type="date"
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.setDepart}
          />
          <br></br>
          <br></br>

          <TextField
            id="date"
            label="Return"
            type="date"
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.setReturn}
          />
          <br></br>
          <br></br>
          <TextField
            id="filled-secondary"
            label="Search destination"
            color="secondary"
            variant="filled"
            onChange={this.setSearchByWord}
          />
          <br></br>
          <br></br>
          <Button
            onClick={this.searchByDates}
            variant="contained"
            color="primary"
            size="small"
            className="button_e"
          >
            Search vacation
          </Button>
          <Button
            onClick={()=>{this.componentDidMount()}}
            variant="contained"
            color="primary"
            size="small"
            className="button_e"
          >
            clear search
          </Button>
        </div>

        <div className="logInOut">
          <p id="login_name">User: {this.state.userName}</p>
          <button onClick={this.logOut}>LogOut</button>
        </div>
        {this.state.vacation.map((vacation) => (
          <div key={vacation.id} className="vacation">
            <Card>
              <CardContent>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checked={vacation.isFollowed}
                      onChange={(event) => {
                        this.follow(event, vacation.id);
                      }}
                      checkedIcon={<Favorite />}
                      name="checkedH"
                    />
                  }
                  label="Click to Follow"
                />
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
