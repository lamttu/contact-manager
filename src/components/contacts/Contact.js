import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import "./contact.css";
import axios from "axios";
import { Link } from "react-router-dom";

class Contact extends Component {
  state = {
    isShown: false
  };

  onShowClick = () => {
    this.setState({
      isShown: !this.state.isShown
    });
  };
  onDeleteClick = async (id, dispatch) => {
    try {
      dispatch({ type: "SWITCH_LOADING" });
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: "SWITCH_LOADING" });
      dispatch({
        type: "DELETE_CONTACT",
        payload: id
      });
    } catch (e) {
      dispatch({ type: "SWITCH_LOADING" });
      dispatch({
        type: "DELETE_CONTACT",
        payload: id
      });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;

    return (
      <Consumer>
        {value => {
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <i onClick={this.onShowClick} className="fas fa-sort-down" />

                <i
                  onClick={this.onDeleteClick.bind(this, id, value.dispatch)}
                  className="fas fa-times"
                />

                <Link to={`/contact/edit/${id}`}>
                  <i className="fas fa-pencil-alt" />
                </Link>
              </h4>
              {this.state.isShown ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
export default Contact;
