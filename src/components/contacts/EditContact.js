import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInput from "../form/TextInput";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    errors: {}
  };

  async componentDidMount() {
    const { contacts } = this.props.value;
    // Since this application is using JSON placeholder instead of a real back-end, edit form's state is populated by finding
    // the contact in the ContextAPI
    const contact = contacts.find(
      c => c.id === Number(this.props.match.params.id)
    );

    // If there is a back-end, the form's data will be populated using a get request to the database
    // const res = await axios.get(
    //   `https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`
    // );
    // const contact = res.data;

    this.setState({
      name: contact.name,
      phone: contact.phone,
      email: contact.email
    });
  }

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
    const updatedContact = {
      id: Number(this.props.match.params.id),
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email
    };

    try {
      dispatch({ type: "SWITCH_LOADING" });
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${
          this.props.match.params.id
        }`,
        updatedContact
      );
      dispatch({ type: "SWITCH_LOADING" });
      // Put request successful, change the dom
      dispatch({
        type: "UPDATE_CONTACT",
        payload: res.data
      });
    } catch (e) {
      dispatch({ type: "SWITCH_LOADING" });
      // Put request failed
      // User is trying to update a contact they've added themselves (not in the original JSON placeholder DB)
      // update the dom anyway
      dispatch({
        type: "UPDATE_CONTACT",
        payload: updatedContact
      });
    }

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
              <div className="card-header">Update Contact</div>
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
                    value="Update Contact"
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

export default props => (
  <Consumer>{value => <EditContact {...props} value={value} />}</Consumer>
);
