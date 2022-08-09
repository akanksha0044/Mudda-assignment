import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
// import loginpic from "./admitkard.jpg"
function Login() {
  const [width, setWidth] = useState(null);
  const [swidth, setSwidth] = useState(null);
  useEffect(() => {

    if (window.innerWidth > 1199) {
      setWidth('w-25 form-group');
      setSwidth('w-25 form-button form-submit');
    }
    else if (window.innerWidth > 767) {
      setWidth('w-50 form-group');
      setSwidth('w-50 form-button form-submit');
    }
    else {
      setWidth('w-100 form-group');
      setSwidth('w-100 form-button form-submit');
    }
    const setsize = () => {
      console.log(width);
      if (window.innerWidth > 1199) {
        setWidth('w-25 form-group');
        setSwidth('w-25 form-button form-submit');
      }
      else if (window.innerWidth > 767) {
        setWidth('w-50 form-group');
        setSwidth('w-50 form-button form-submit');
      }
      else {
        setWidth('w-100 form-group');
        setSwidth('w-100 form-button form-submit');
      }
    }
    window.addEventListener('resize', setsize);
    return () => window.removeEventListener('resize', setsize);
  }, [window.innerWidth])


  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone,
        password
      })
    });
    const data = await res.json();
    if (res.status === 202) {
      window.alert("Login Successfull");
      navigate('/UserDetails')
    }
    else if (res.status === 400) {
      window.alert("phone or password is incorrect");
    }
    else if (res.status === 401) {
      window.alert("Please fill all the details");
    }
  }
  return (
    <>
      <section className='log-in'>
        <div className="container mt-5">
          <div className="login-content">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="login-pic py-5">
                  <figure>
                    {/* <img src={loginpic} alt="loginpic" style={{ width: '500px', height: '300px' }} /> */}
                  </figure>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 py-5">
                <div className="Login-form">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <h2 className="form-title">Log In</h2></div>
                  <form method="POST" className='register-form' id='register-form'>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <label htmlFor='phone'>
                        <i className='zmdi zmdi-phone material-icons-name'></i>
                      </label>
                      <input className={width ? width : 'w-50 form-group'} type="phone" name="phone" id="phone" autoComplete="off"
                        value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Your phone" style={{ color: "black" }}></input>
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <label htmlFor='password'>
                        <i className='zmdi zmdi-lock material-icons-name'></i>
                      </label>
                      <input className={width ? width : 'w-50 form-group'} type="password" name="password" id="password" autoComplete="off"
                        value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" style={{ color: "black" }}></input>
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pb-5">
                      <input className={swidth ? swidth : 'w-50 form-button form-submit'} type="submit" name="login" id="login" value="Log In"
                        onClick={loginUser} />
                    </div>

                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login