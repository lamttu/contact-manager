import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInput from "../form/TextInput";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    errors: {}
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = async (dispatch, e) => {
    e.preventDefault();
    // Check if any field is empty
    if (this.state.name === "") {
      this.setState({
        errors: {
          name: "Name is required"
        }
      });
      return;
    }
    if (this.state.email === "") {
      this.setState({
        errors: {
          email: "Email is required"
        }
      });
      return;
    }
    if (this.state.phone === "") {
      this.setState({
        errors: {
          phone: "Phone is required"
        }
      });
      return;
    }
    const newContact = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email
    };

    dispatch({ type: "SWITCH_LOADING" });
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    dispatch({ type: "SWITCH_LOADING" });
    dispatch({
      type: "ADD_CONTACT",
      payload: res.data
    });

    // Clear state
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    // Redirect
    this.props.history.push("/");
  };

  render() {
    const { name, phone, email, errors } = this.state;
    return (
      <Consumer>
        {value => {
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form
                  action=""
                  onSubmit={this.onSubmitHandler.bind(this, value.dispatch)}
                >
                  <TextInput
                    label="Name"
                    name="name"
                    placeholder="Enter the contact's name"
                    onChangeHandler={this.onChangeHandler}
                    value={name}
                    error={errors.name}
                  />
                  <TextInput
                    label="Phone"
                    name="phone"
                    placeholder="Enter the contact's phone number"
                    onChangeHandler={this.onChangeHandler}
                    value={phone}
                    error={errors.phone}
                  />
                  <TextInput
                    label="Email"
                    name="email"
                    placeholder="Enter the contact's email"
                    onChangeHandler={this.onChangeHandler}
                    value={email}
                    type="email"
                    error={errors.email}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
