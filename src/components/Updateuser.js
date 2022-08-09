import React, { useState, useEffect, useMemo } from 'react'
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom'
import Multiselect from 'multiselect-react-dropdown';
import countryList from 'react-select-country-list'

function Adduser() {
  const [course, setCourse] = useState(null);
  const [date, setDate] = useState(null);
  const [country, setCountry] = useState({});
  const [width, setWidth] = useState(null);
  const [swidth, setSwidth] = useState(null);
  useEffect(() => {
    if (window.innerWidth > 767) {
      setWidth('w-50 form-group');
      setSwidth('w-50 form-button');
    }
    else {
      setWidth('w-100 form-group');
      setSwidth('w-100 form-button');
    }
    const setsize = () => {
      console.log(width);
      if (window.innerWidth > 767) {
        setWidth('w-50 form-group');
        setSwidth('w-50 form-button');
      }
      else {
        setWidth('w-100 form-group');
        setSwidth('w-100 form-button');
      }
    }
    window.addEventListener('resize', setsize);
    return () => window.removeEventListener('resize', setsize);
  }, [window.innerWidth])
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fname: "", lname: "", phone: ""
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });//spread operator
  }
  const pushdata = async (e) => {
    e.preventDefault();
    // window.alert(props.location.data);
    const { fname, lname, phone } = user;//destructuring
    const res = await fetch("/updateuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fname, lname, phone, course, country, date
      })
    });
    const data = await res.json();
    if (res.status === 201) {
      window.alert("Details Successfully Updated");
      navigate(`/`);

    }
    else if (res.status === 401) {
      window.alert("Please fill all the details");
    }
    else if (res.status === 405) {
      window.alert("Phone number is not valid");
    }
    else if (res.status === 501) {
      window.alert("Failed to add user");
    }
  }
  const day = (new Date().getDate());
  const month = (new Date().getMonth() < 10 ? "0" + new Date().getMonth() : new Date().getMonth());
  const year = (new Date().getFullYear());
  const dates = `${year}-${month}-${day}`;
  console.log(dates);
  const options = useMemo(() => countryList().getLabels(), []);
  return (
    <>
      <section className=' log-in'>
        <div className="container mt-5">
          <div className="login-content">
            <div className="row">
              <div className="Login-form">
                <h2 className="form-title">Update Details</h2>
                <form method="POST" className='register-form' id='register-form'>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='fname'>
                      <i className='zmdi zmdi-name material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="fname" id="fname" autoComplete="off"
                      value={user.fname} onChange={handleInputs} placeholder="Enter the First Name" style={{ color: "black" }}></input>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='lname'>
                      <i className='zmdi zmdi-lname material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="lname" id="lname" autoComplete="off"
                      value={user.lname} onChange={handleInputs} placeholder="Enter the Last Name" style={{ color: "black" }}></input>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <select className={width ? width : 'w-50 form-group'} aria-label='Default select example' style={{ color: "black" }} onChange={(e) => setCourse(e.target.value)} >
                      <option value="" selected>Select the course level</option>
                      <option value="UG">UG</option>
                      <option value="PG">PG</option>
                    </select>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <Multiselect className={width ? width : 'w-50 form-group'} style={{ color: "black" }}
                      isObject={false}
                      onKeyPressFn={function noRefCheck() { }}
                      onRemove={function noRefCheck(e) { setCountry(e) }}
                      onSearch={function noRefCheck() { }}
                      onSelect={function noRefCheck(e) { setCountry(e) }}
                      options={options}
                      showCheckbox
                      placeholder="Country Preference"
                    />
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='phone'>
                      <i className='zmdi zmdi-phone material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="text" name="phone" id="phone" autoComplete="off"
                      value={user.phone} onChange={handleInputs} placeholder="Enter Your Phone Number" style={{ color: "black" }}></input>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <label htmlFor='date'>
                      <i className='zmdi zmdi-date material-icons-name'></i>
                    </label>
                    <input className={width ? width : 'w-50 form-group'} type="date" max={dates} min="1900-01-01" name="date" id="date" autoComplete="off"
                      onChange={(e) => { setDate((e.target.value)) }} placeholder="Date of birth" style={{ color: "black" }} ></input>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <input className={swidth ? swidth : 'w-50 form-button'} type="submit" name="login" id="login" value="Submit"
                      onClick={pushdata} />
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default Adduser