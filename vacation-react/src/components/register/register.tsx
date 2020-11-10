import "./register.css"
import Axios from 'axios';
import React, { Component , ChangeEvent } from 'react'
import {User} from "../../models/User"
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import CreateIcon from "@material-ui/icons/Create";

interface registered{
    users: User[],
    first_name:string,
    last_name:string,
    user_new_name:string,
    newPassword:string,
}

export default class register extends Component<any, registered> {
    constructor(props: any) {
        super(props);
        this.state = {users:[],first_name:"",last_name:"",user_new_name:"",newPassword:"" }
      }

      
private setFirstName = (args: ChangeEvent<HTMLInputElement>) => {
  const first_name = args.target.value;
  this.setState({first_name});
}
private setLastName = (args: ChangeEvent<HTMLInputElement>) => {
  const last_name = args.target.value;
  this.setState({last_name});
}
private setNewUserName = (args: ChangeEvent<HTMLInputElement>) => {
  const user_new_name = args.target.value;
  this.setState({user_new_name});
}
private setNewPassword = (args: ChangeEvent<HTMLInputElement>) => {
  const newPassword = args.target.value;
  this.setState({newPassword});
}

public newUser=async()=>{

    try {
        let user = new User(this.state.first_name,this.state.last_name,this.state.user_new_name,this.state.newPassword)
        const response =  await Axios.post<User>("http://localhost:3001/users",user);
        alert(this.state.user_new_name + " have been added succesfully !")
  } catch (err) {
        alert(err.message);
        console.log(err);
}

}
    render() {
        return (

          <div className="editPage">
          <Typography className="icon" variant="h2" gutterBottom>
            <CreateIcon className="pen"></CreateIcon>
            Registration
          </Typography>
  
          <form className="root" noValidate autoComplete="off">
            <TextField
              id="filled-secondary"
              label="First Name"
              color="secondary"
              variant="filled"
              onChange={this.setFirstName}
            />
            <br></br>
            <br></br>

            <TextField
              id="filled-secondary"
              label="Last Name"
              variant="filled"
              color="secondary"
              onChange={this.setLastName}
            />
            <br></br>
            <br></br>
  
            <TextField
              id="filled-secondary"
              label="User Name"
              variant="filled"
              color="secondary"
              onChange={this.setNewUserName}
            />
            <br></br>
            <br></br>
  
            <TextField
              id="filled-secondary"
              label="Password"
              variant="filled"
              color="secondary"
              onChange={this.setNewPassword}
            />
  
            <br></br>
            <br></br>
            <Button
              onClick={this.newUser}
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
            href={"/"}
            className="back"
          >
            Back
          </Button>
        </div>

          //   <div>
          //             <form className="form">
          //  <label> Registeration:  </label><br />
          //     <label>
          //       First Name:
          //       <input type="text"  value={this.state.first_name} onChange={this.setFirstName}/><br />
          //     </label>
          //     <label>
          //       Last Name:
          //       <input type="text" value={this.state.last_name} onChange={this.setLastName} /> <br />
          //     </label>
          //     <label>
          //       User Name:
          //       <input type="text" value={this.state.user_new_name} onChange={this.setNewUserName}/><br />
          //     </label>
          //     <label>
          //       Password:
          //       <input type="text" value={this.state.newPassword} onChange={this.setNewPassword}/><br />
          //     </label>
          //     <input type="button" value="create new user"  onClick={this.newUser}/>
             
          //   </form> 
          //   </div>
        )
    }
}
