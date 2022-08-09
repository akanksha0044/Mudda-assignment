//rfce
import React, { useEffect, useState } from 'react'
import {
  useLocation
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Media from 'react-media'

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [button, setButton] = useState('');
  const [cuser, setCuser] = useState([{ name: "no user found" }]);
  const [Width, setWidth] = useState(null);
  const [Height, setHeight] = useState(null);
  const [update, setUpdate] = useState(null);
  const [ubutton, setUbutton] = useState(null);
  useEffect(() => {
    // console.log("path" + location.pathname);
    if (location.pathname === "/") {
      setUpdate('1');
      setUbutton('Login details');
    }
    if (location.pathname === "/" || location.pathname === "/Adduser") {
      setButton("Register");
      if (location.pathname !== "/") {
        setUpdate(null);
      }
    }
    else {
      setButton("Logout");
      setUpdate('1');
      setUbutton('Update');
    }

    if (window.innerWidth > 311) {
      setWidth('120px');
      setHeight('70px');
    }
    else if (window.innerWidth > 250) {
      setWidth('80px');
      setHeight('70px');
    }
    else {
      setWidth('70px');
      setHeight('70px');
    }
    const setsize = () => {
      // console.log(width);
      if (window.innerWidth > 311) {
        setWidth('120px');
        setHeight('70px');
      }
      else if (window.innerWidth > 250) {
        setWidth('80px');
        setHeight('70px');
      }
      else {
        setWidth('70px');
        setHeight('70px');
      }
    }
    window.addEventListener('resize', setsize);
    return () => window.removeEventListener('resize', setsize);
  }, [window.innerWidth, location.pathname])


  const setfunction = async () => {
    console.log(button);
    if (location.pathname === "/") {
      navigate('/Adduser');
    }
    else if (location.pathname !== "/Adduser") {
      try {
        const res = await fetch('/logout', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        if (res.status === 200) {
          window.alert("Logout successfully");
          window.alert("Redirecting to Login page");
          navigate('/');
        }
        else {
          window.alert("Server error: Can't login");
        }
      } catch (err) {
        console.log(err);
      }

    }
  }
  const updateuser = async () => {
    if (location.pathname !== "/") {
      window.alert("Redirecting to Update page");
      navigate('/UpdateUser');
    }
    else {
      window.open("https://drive.google.com/file/d/1GrTtyL8OF9UsnACpgPOorHBbjBz3IEqV/view?usp=sharing");
    }
  }
  return (
    <nav className={`navbar navbar-expand-lg`} key='1' style={{ marginTop: '10px' }} >
      <div className="container-fluid" key='2'>
        <div className="w-100 row" key='3'>
          <div className=" col-6 col-sm-8 col-md-9 col-lg-10 col-xl-10" key='4' align='left'>
            {/* <img src={require('./admitkard.jpg')} style={{ height: Height, width: Width, position: 'relative', borderRadius: '15%' }} alt="not found" key='5'></img> */}
          </div>
          <Media query="(min-width:308px)" key='20'>
            {matches => {
              return matches ? <div className="col col-sm col-md col-lg col-xl" align='right' key='13' style={{ display: update ? 'block' : 'none' }}>
                <button type="button" className="edit" style={{ marginLeft: 'auto' }} key='15' onClick={updateuser}>{ubutton}</button>
              </div> : <div className="col col-sm col-md col-lg col-xl" align='right' key='13' style={{ display: update ? 'block' : 'none' }}>
                <button type="button" className="edit" style={{ marginLeft: 'auto', fontSize: '8px' }} key='15' onClick={updateuser}>{ubutton}</button>
              </div>
            }}
          </Media>
          <Media query="(min-width:308px)" key='20'>
            {matches => {
              return matches ? <div className="col col-sm col-md col-lg col-xl" align='right' key='13'>
                <button type="button" className="edit" style={{ marginLeft: 'auto' }} key='15' onClick={setfunction}>{button}</button>
              </div> : <div className="col col-sm col-md col-lg col-xl" align='right' key='13'>
                <button type="button" className="edit" style={{ marginLeft: 'auto', fontSize: '8px' }} key='15' onClick={setfunction}>{button}</button>
              </div>
            }}
          </Media>


        </div>

      </div>
    </nav >
  )
}

export default Navbar






















// //rfce
// import React from 'react'
// import {
//   Link
// } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className={` navbar navbar-expand-lg `} style={{ backgroundColor: 'dark', height: '10%' }} >
//       <div className="container-fluid">
//         <img className=" class=navbar-brand img-fluid" src={require('./spot.jpeg')} alt="not found" style={{ position: 'relative' }}></img>
//         <div className="d-flex flex-column bd-highlight mb-3" style={{ position: 'relative', paddingLeft: '' }}>
//           <h1 style={{ fontSize: '3em' }}> Your Spottabl Team</h1>
//           <h3 style={{ fontSize: '2em' }}> Spottabl supports you all throughout</h3>
//         </div>

//       </div>
//     </nav >
//   )
// }

// export default Navbar

