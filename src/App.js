import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { districtsData, statesData } from './utils/list';

function App() {

  // data useState hook to store the data 
  const [data, setData] = useState([]);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // getData function to fetch the data from the API
  const getData = () => {
    
    // fetch get request to the API endpoint 
    fetch('http://localhost:3000/register/all')
    .then(response => response.json())
    .then(json => setData(json?.users))
    .catch(error => console.log(error))
  }

  // clear filter button
  const clearFilter = () => {
    setState('')
    setDistrict('')
    setStartDate('')
    setEndDate('')
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {/* Title */}
        <h1>Bharat Sarkar Schemes</h1>
      </header>

      {/* Table */}
      <div className="table">
        {/* clear filter button */}
        <div className="clear-filter">
          <button className='clear__filter' type='button' onClick={clearFilter}>Clear Filter</button>
        </div>
        {/* filter options */}
        <div className="filter">
          <div className="filter__item">
            <label htmlFor="state">State</label>
            <select 
            onChange={(e) => setState(e.target.value)}
            value={state}
            name="state" 
            id="state">
              <option value="" disabled>Select State</option>
              {
                statesData.map((state, index) => (
                  <option key={index} value={state?.value}>{state?.value}</option>
                ))
              }
              <option value="all">All</option>
            </select>
          </div>
          {/* District */}
          <div className="filter__item">
            <label htmlFor="state">District</label>
            <select
            onChange={(e) => setDistrict(e.target.value)} 
            value={district}
            name="state" 
            id="state">
              <option value="" disabled>Select District</option>
              {
                districtsData[state]?.map((state, index) => (
                  <option key={index} value={state?.value}>{state?.value}</option>
                ))
              }
            </select>
          </div>

          {/* Select date from start to end */}
          <div className="filter__item">
            <label htmlFor="state">Start Date</label>
            <input 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date" />
          </div>
          <div className="filter__item">
            <label htmlFor="state">End Date</label>
            <input 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date" />
          </div>
        </div>
          
        <table>
          <thead>
            <tr>
              {/* Name */}
              <th>Name</th>
              {/* Phone Number */}
              <th>Phone Number</th>
              {/* State */}
              <th>State</th>
              {/* District */}
              <th>District</th>
              {/* City */}
              <th>City</th>
              {/* Mandal */}
              <th>Mandal</th>
              {/* Date */}
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* filter data by state district and date */}
            {
              data?.filter((item) => state ? item?.state?.trim() === state : item)
              .filter((item) => district ? item?.district?.trim() === district : item)
              .filter((item) => startDate ? new Date(item?.timestamp) >= new Date(startDate) : item)
              .filter((item) => endDate ? new Date(item?.timestamp) <= new Date(endDate) : item)
              ?.map((user, index) => (
              <tr>
                {/* Name */}
                <td>{user?.name}</td>
                {/* Phone Number */}
                <td>{user?.phonenumber}</td>
                {/* State */}
                <td>{user?.state}</td>
                {/* District */}
                <td>{user?.district}</td>
                {/* City */}
                <td>{user?.city}</td>
                {/* Mandal */}
                <td>{user?.mandal}</td>
                {/* Date */}
                <td>{user?.timestamp.split('T')[0]}</td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
