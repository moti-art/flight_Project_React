import React, { Component, ChangeEvent } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import CreateIcon from "@material-ui/icons/Create";
import "./admin.css";
import { Vacation } from "../../models/Vacation";

interface EditVacationState {
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  price: number;
  image: string;
  id: number;
}

export default class editVacation extends Component<any, EditVacationState> {
  constructor(prop: any) {
    super(prop);
    this.state = {
      description: "",
      destination: "",
      startDate: "",
      endDate: "",
      price: 0,
      image: "",
      id: this.props.match.params.id,
    };
  }

  public handleSumbit = async () => {
    try {
      let edited_vacation = new Vacation(
        this.state.description,
        this.state.destination,
        this.state.startDate,
        this.state.endDate,
        this.state.price,
        this.state.image,
        this.state.id,
      );
      const response = await axios.put<Vacation[]>(
        `http://localhost:3001/vacations/editVacation/${this.props.match.params.id}`,
        edited_vacation
      );
      alert(`Vacation ID ${this.state.id} been edited !`);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
  private setDescription = (args: ChangeEvent<HTMLInputElement>) => {
    const description = args.target.value;
    this.setState({ description });
  };
  private setDestination = (args: ChangeEvent<HTMLInputElement>) => {
    const destination = args.target.value;
    this.setState({ destination });
  };
  private setStart_date = (args: ChangeEvent<HTMLInputElement>) => {
    const startDate = args.target.value;
    this.setState({ startDate });
  };
  private setEnd_date = (args: ChangeEvent<HTMLInputElement>) => {
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
  render() {
    return (
      <div className="editPage">
        <Typography className="icon" variant="h2" gutterBottom>
          <CreateIcon className="pen"></CreateIcon>
          Edit Vactaion ID {this.state.id}
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
            onChange={this.setStart_date}
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
            onChange={this.setEnd_date}
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
            onClick={this.handleSumbit}
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
    );
  }
}
