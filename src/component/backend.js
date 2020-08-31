import React, { Component } from 'react';
import axios from 'axios';
import './backend.css';

class Backend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      gender: '',
      status: '',
      date: '',
      photo: '',
    };
  }
  handleInput = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    const left = e.target.name;
    const value = e.target.value;
    this.setState({
      [left]: value,
    });
  };

  handleForm = (e) => {
    e.preventDefault();
    if (
      this.state.name === '' ||
      this.state.status !== 'active' ||
      this.state.status !== 'left' ||
      this.state.status !== 'onboard'
    ) {
      window.alert('Please Enter Name and Valid Status (Active/left/onboard');
      return;
    }
    window.alert('Message Send ! Thank You.');
    axios
      .post('/api/user', this.state)
      .then(() => {
        window.alert('Message Send ! Thank You.');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div style={{ marginBottom: '60px' }}>
        <form
          method="post"
          data-form-title="CONTACT US"
          style={{ margin: '100px 0px 0px 10px' }}
        >
          <input type="hidden" data-form-email="true" />
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              style={{ width: '280px', margin: 'auto', height: '40px' }}
              name="name"
              value={this.state.name}
              onChange={this.handleInput}
              required=""
              placeholder="Name"
              data-form-field="Name"
            />
          </div>
          <div className="form-group">
            <input
              type="age"
              className="form-control"
              style={{ width: '280px', margin: 'auto', height: '40px' }}
              name="age"
              value={this.state.age}
              onChange={this.handleInput}
              required=""
              placeholder="Age"
              data-form-field="age"
            />
          </div>
          <div className="form-group">
            <input
              type="status"
              className="form-control"
              style={{ width: '280px', margin: 'auto', height: '40px' }}
              name="status"
              value={this.state.status}
              onChange={this.handleInput}
              placeholder="Status"
              data-form-field="status"
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              style={{ width: '280px', margin: 'auto', height: '40px' }}
              name="gender"
              value={this.state.gender}
              onChange={this.handleInput}
              placeholder="Gender"
              data-form-field="gender"
            ></textarea>
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              style={{ width: '280px', margin: 'auto', height: '40px' }}
              name="date"
              value={this.state.date}
              onChange={this.handleInput}
              placeholder="On Boarding Date (dd/mm/yyyy)"
              data-form-field="date"
            ></textarea>
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              style={{ width: '280px', margin: 'auto', height: '40px' }}
              name="photo"
              value={this.state.photo}
              onChange={this.handleInput}
              placeholder="Profile Photo Link"
              data-form-field="photo"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              value="Reset"
              onClick={this.handleForm}
              className="btn btn-lg"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Backend;
