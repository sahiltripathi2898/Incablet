import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

export default function App() {
  const [customers, setcustomers] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(
      'https://5w05g4ddb1.execute-api.ap-south-1.amazonaws.com/dev/profile/listAll'
    );
    const sorted = response.data.list;
    sorted.sort((a, b) => {
      if (a.status === 'active' && b.status === 'active') {
        var start = a.date.split('/');
        var date1 = start[2] + start[1] + start[0];
        var end = b.date.split('/');
        var date2 = end[2] + end[1] + end[0];
        if (date1 > date2) return 1;
        else return -1;
      }
      if (a.status === 'active') return -1;

      if (a.status === 'left' && b.status === 'onboarded') return -1;
      if (a.status === 'left' && b.status === 'left') {
        var start = a.date.split('/');
        var date1 = start[2] + start[1] + start[0];
        var end = b.date.split('/');
        var date2 = end[2] + end[1] + end[0];
        if (date1 > date2) return 1;
        else return -1;
      }
      if (a.status === 'onboard' && b.status === 'onboard') {
        var start = a.date.split('/');
        var date1 = start[2] + start[1] + start[0];
        var end = b.date.split('/');
        var date2 = end[2] + end[1] + end[0];
        if (date1 > date2) return 1;
        else return -1;
      } else return 1;
    });
    setcustomers(sorted);
  };

  return (
    <div className="App">
      <h1>Status of all Members 🙇 </h1>
      <div>
        <button className="fetch-button" onClick={fetchData}>
          Get Status
        </button>
        <br />
      </div>

      <div className="books">
        {customers &&
          customers.map((customer, index) => {
            //const dateCreated = new Date(customer.date).toDateString();
            const dateCreated = customer.date;
            const gender = customer.gender === 'm' ? 'Male' : 'Female';
            const status = customer.status.toUpperCase();
            var light = '';
            if (status === 'ACTIVE') light = 'green';
            if (status === 'LEFT') light = 'orange';
            if (status === 'ONBOARDED') light = 'yellow';
            return (
              <div className="container" key={index}>
                <div className="each">
                  <div>
                    <img
                      style={{ borderRadius: '15px', marginTop: '10px' }}
                      src={customer.img}
                      height="200px"
                      width="200px"
                      alt="img"
                    ></img>
                  </div>
                  <div className="name">{customer.name}</div>
                </div>
                <div className="each">
                  <div className={`topic ${light}`}>{status}</div>
                  <div className="topic date">On-boarding : {dateCreated}</div>
                  <div className="topic age">Age : {customer.age}</div>
                  <div className="topic gender">Gender : {gender}</div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="backend"></div>
    </div>
  );
}
