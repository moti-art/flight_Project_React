import React, { Component, ChangeEvent } from "react";
import { Vacation } from "../../models/Vacation";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import CreateIcon from "@material-ui/icons/Create";

axios.defaults.baseURL = "http://localhost:3001/vacations";
let token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `bearer ${token}` };

interface AddVacationState {
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  price: number;
  image: string;
}

export default class addVacation extends Component<any, AddVacationState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: "",
      destination: "",
      startDate: "",
      endDate: "",
      price: 0,
      image: "",
    };
  }

  private setDescription = (args: ChangeEvent<HTMLInputElement>) => {
    const description = args.target.value;
    this.setState({ description });
  };

  private setDestination = (args: ChangeEvent<HTMLInputElement>) => {
    const destination = args.target.value;
    this.setState({ destination });
  };

  private setStartDate = (args: ChangeEvent<HTMLInputElement>) => {
    const startDate = args.target.value;
    this.setState({ startDate });
  };

  private setEndDate = (args: ChangeEvent<HTMLInputElement>) => {
    const endDate = args.target.value;
    this.setState({ endDate });
  };

  private setPrice = (args: ChangeEvent<HTMLInputElement>) => {
    const price = +args.target.value;
    this.setState({ price });
  };

  private setImage = (args: ChangeEvent<HTMLInputElement>) => {
    const image = args.target.value;
    this.setState({ image });
  };

  public newVacation = async () => {
    try {
      let vacation = new Vacation(
        this.state.description,
        this.state.destination,
        this.state.startDate,
        this.state.endDate,
        this.state.price,
        this.state.image
      );
      const response = await axios.post<Vacation>(
        "http://localhost:3001/vacations/addVacation",
        vacation
      );
      alert(this.state.description + " have been added succesfully !");
      console.log("get this:      " + response.data);
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  render() {
    return (
      <div className="editPage">
        <Typography className="icon" variant="h2" gutterBottom>
          <CreateIcon className="pen"></CreateIcon>
          Create New Vacation:
        </Typography>

        <form className="root" noValidate autoComplete="off">
          <TextField
            id="filled-secondary"
            label="description"
            color="secondary"
            variant="filled"
            onChange={this.setDescription}
          />
          <br></br>
          <br></br>

          <TextField
            id="date"
            label="Departure"
            type="date"
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.setStartDate}
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
            onChange={this.setEndDate}
          />
          <br></br>
          <br></br>

          <TextField
            id="filled-secondary"
            label="price"
            variant="filled"
            color="secondary"
            onChange={this.setPrice}
          />
          <br></br>
          <br></br>

          <TextField
            id="filled-secondary"
            label="image"
            variant="filled"
            color="secondary"
            onChange={this.setImage}
          />
          <br></br>
          <br></br>

          <TextField
            id="filled-secondary"
            label="destination"
            variant="filled"
            color="secondary"
            onChange={this.setDestination}
          />

          <br></br>
          <br></br>
          <Button
            onClick={this.newVacation}
            variant="contained"
            color="primary"
            size="small"
            className="button_e"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </form>
        <br></br>
        <Button
          variant="contained"
          color="primary"
          href={"/admin"}
          className="back"
        >
          Back
        </Button>
      </div>

      //     <div>
      //     <form className="form">
      //    <label> Add A New Vacation:  </label><br />
      //    <label>
      //       Description:
      //         <input type="text" value={this.state.description} onChange={this.setDescription} /> <br />
      //       </label>
      //       <label>
      //       Destination:
      //         <input type="text" value={this.state.destination} onChange={this.setDestination} /> <br />
      //       </label>
      //       <label>
      //         Start Date:
      //         <input type="date" value={this.state.start_date} onChange={this.set_start_date}/><br />
      //       </label>
      //       <label>
      //         End Date:
      //         <input type="date" value={this.state.end_date} onChange={this.set_end_date}/><br />
      //       </label>
      //       <label>
      //         Price:
      //         <input type="text" value={this.state.price} onChange={this.setPrice}/><br />
      //       </label>
      //       <label>
      //         Image:
      //         <input type="text" value={this.state.image} onChange={this.set_image}/><br />
      //       </label>
      //       <input type="button" value="create new vacation"  onClick={this.newVacation}/>

      //     </form>
      //     </div>
      // )
    );
  }
}
