import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Media from 'react-media'
function Userdetails() {
  const [cuser, setCuser] = useState([{ name: 'no user' }]);
  const navigate = useNavigate();
  const [display, setDisplay] = useState('none');
  const [email, setEmail] = useState('');
  const [userdata, setUserdata] = useState([]);
  const [containerclass, setClass] = useState('container emp-profile');
  useEffect((e) => {
    if (display === ('none')) {
      setClass('w-50 container emp-profile');
    }
    else {
      setClass('container emp-profile');
    }
  }, [display]);
  const getuserdetails = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/getuserdetails', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      });
      const data = await res.json();
      if (res.status === 202) {
        setUserdata(data);
        setDisplay('block');
        data[0].country.map((e) => {
          console.log(e);
        })
        // console.log(data[0].country.length);
      }
      else if (res.status === 401) {
        window.alert("Please enter the email");
      }
      else {
        window.alert("No user found");
        setDisplay('none');
      }
    } catch (err) {
      console.log(err);
    }
  }


  // const updateUser = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const uniqueId = e.uniqueId;
  //     const res = await fetch('/update', {
  //       method: "POST",
  //       headers:
  //       {
  //         "Content-Type": "application/json"
  //       },
  //     });
  //     const data = await res.json();
  //     if (res.status === 200) {
  //       window.alert("Redirecting to update page");
  //       navigate(`/UpdateUser?uniqueid=${luserId}`);
  //     }
  //     else if (res.status === 201) {
  //       window.alert("Only admin or user itself can edit the date");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  return (
    <>
      <Media query="(min-width:1000px)" key='8'>
        {matches => {
          return matches ?
            <div className={containerclass ? containerclass : 'container emp-profile'} style={{ background: 'white', width: 'fit-content', height: '440px' }}>
              <form method="" >
                <div className='row' style={{ marginTop: '30px' }}>
                  {/* <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <label htmlFor='email'>
                      <i className='zmdi zmdi-email material-icons-name'></i>
                    </label>
                    <input className={'w-100 form-group'} type="email" name="email" id="email" autoComplete="off"
                      placeholder="Enter User's Email" onChange={(e) => setEmail(e.target.value)} style={{ color: "black" }}></input>
                  </div>
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" align='left'>
                    <input type="submit" className="edit1" value="Check" onClick={getuserdetails} />
                  </div> */}
                  <div className='m-auto'>
                    <h1 className='m-auto'>Welcome, This is Home Page</h1>
                  </div>
                  <div className='col-5 col-sm-4 col-md-3 col-lg-3 col-xl-3' style={{ display: display ? display : 'none' }}>
                    <div className='usericons' style={{ width: '150px', height: '150px', lineHeight: '150px' }}>
                      {
                        userdata.length !== 0 ? userdata.map((userdata) => {
                          return userdata.fname[0] + userdata.lname[0];
                        }) : cuser.map(() => { return 'fetching...' })
                      }
                    </div>
                  </div>
                  <div className='col col-sm col-md-6 col-lg-7 col-xl-7' style={{ display: display ? display : 'none' }}>
                    <div className='profile-head' style={{ marginTop: '90px' }} align='left'>
                      <h1>
                        {
                          userdata.length !== 0 ? userdata.map((userdata) => {
                            return userdata.fname + ' ' + userdata.lname;
                          }) : cuser.map(() => { return 'fetching...' })
                        }
                      </h1>
                    </div>
                  </div>

                  <div className="col-12 col-sm-12 col-md-8 pl-5 about-info" style={{ display: display ? display : 'none' }}>
                    <div className='teb-content'>
                      <div className='tab-pane show active' id="home" style={{ marginLeft: '2%' }}>
                        <div className='row'>
                          <div className='col-5 col-sm-5 col-md-5'>
                            <label><h3>Email</h3></label>
                          </div>
                          <div className='col-7 col-sm-7 col-md-7'>
                            <h4>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {
                                  return userdata.email;
                                }) : cuser.map(() => { return 'fetching...' })
                              }
                            </h4>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-5 col-sm-5 col-md-5'>
                            <label><h3>Phone</h3></label>
                          </div>
                          <div className='col-7 col-sm-7 col-md-7'>
                            <h4>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {
                                  return userdata.phone;
                                }) : cuser.map(() => { return 'fetching...' })
                              }
                            </h4>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-5 col-sm-5 col-md-5'>
                            <label><h3>Course</h3></label>
                          </div>
                          <div className='col-7 col-sm-7 col-md-7'>
                            <h4>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {
                                  return userdata.course;
                                }) : cuser.map(() => { return 'fetching...' })
                              }
                            </h4>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-5 col-sm-5 col-md-5'>
                            <label><h3>Country</h3></label>
                          </div>
                          <div className='col-7 col-sm-7 col-md-6'>
                            <h4>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {

                                  return userdata.country.map((e) => {
                                    return e;
                                  }).join(', ');

                                }) : cuser.map(() => { return 'fetching...' })
                              }
                            </h4>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-5 col-sm-5 col-md-5'>
                            <label><h3>Date</h3></label>
                          </div>
                          <div className='col-7 col-sm-7 col-md-7'>
                            <h4>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {
                                  return userdata.date ? userdata.date.slice(0, 10).split('-').reverse().join('/') : 'NA';
                                }) : cuser.map(() => { return 'fetching...' })
                              }
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div> :
            <Media query="(min-width:450px)" key='7'>
              {matches => {
                return matches ?
                  <div className={containerclass ? containerclass : 'container emp-profile'} style={{ background: 'white', width: 'fit-content', height: '440px' }}>
                    <form method="" >
                      <div className='row' style={{ marginTop: '30px' }}>
                        <div className='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9'>
                          <label htmlFor='email'>
                            <i className='zmdi zmdi-email material-icons-name'></i>
                          </label>
                          <input className={'w-100 form-group'} type="email" name="email" id="email" autoComplete="off"
                            placeholder="Enter User's Email" onChange={(e) => setEmail(e.target.value)} style={{ color: "black" }}></input>
                        </div>
                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" align='left'>
                          <input type="submit" className="edit" value="Check" onClick={getuserdetails} />
                        </div>
                        <div className='col-5 col-sm-4 col-md-3 col-lg-3 col-xl-3' style={{ display: display ? display : 'none' }}>
                          <div className='usericons' style={{ width: '150px', height: '150px', lineHeight: '150px' }}>
                            {
                              userdata.length !== 0 ? userdata.map((userdata) => {
                                return userdata.fname[0] + userdata.lname[0];
                              }) : cuser.map(() => { return 'fetching...' })
                            }
                          </div>
                        </div>
                        <div className='col col-sm col-md-6 col-lg-7 col-xl-7' style={{ display: display ? display : 'none' }}>
                          <div className='profile-head' style={{ marginTop: '90px', marginLeft: '2px' }}>
                            <h1>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {
                                  return userdata.fname + ' ' + userdata.lname;
                                }) : cuser.map(() => { return 'fetching...' })
                              }
                            </h1>
                            <h3>
                              {
                                userdata.length !== 0 ? userdata.map((userdata) => {
                                  return userdata.designation;
                                }) : cuser.map(() => { return 'fetching...' })
                              } </h3>
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-8 pl-5 about-info" style={{ display: display ? display : 'none' }}>
                          <div className='teb-content'>
                            <div className='tab-pane show active' id="home" style={{ marginLeft: '2%' }}>
                              <div className='row'>
                                <div className='col-5 col-sm-5 col-md-5'>
                                  <label><h3>Email</h3></label>
                                </div>
                                <div className='col-7 col-sm-7 col-md-7'>
                                  <h4>
                                    {
                                      userdata.length !== 0 ? userdata.map((userdata) => {
                                        return userdata.email;
                                      }) : cuser.map(() => { return 'fetching...' })
                                    }
                                  </h4>
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-5 col-sm-5 col-md-5'>
                                  <label><h3>Phone</h3></label>
                                </div>
                                <div className='col-7 col-sm-7 col-md-7'>
                                  <h4>
                                    {
                                      userdata.length !== 0 ? userdata.map((userdata) => {
                                        return userdata.phone;
                                      }) : cuser.map(() => { return 'fetching...' })
                                    }
                                  </h4>
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-5 col-sm-5 col-md-5'>
                                  <label><h3>Course</h3></label>
                                </div>
                                <div className='col-7 col-sm-7 col-md-7'>
                                  <h4>
                                    {
                                      userdata.length !== 0 ? userdata.map((userdata) => {
                                        return userdata.course;
                                      }) : cuser.map(() => { return 'fetching...' })
                                    }
                                  </h4>
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-5 col-sm-5 col-md-5'>
                                  <label><h3>Country</h3></label>
                                </div>
                                <div className='col-7 col-sm-7 col-md-6'>
                                  <h4>
                                    {
                                      userdata.length !== 0 ? userdata.map((userdata) => {

                                        return userdata.country.map((e) => {
                                          return e;
                                        }).join(', ');

                                      }) : cuser.map(() => { return 'fetching...' })
                                    }
                                  </h4>
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-5 col-sm-5 col-md-5'>
                                  <label><h3>Date</h3></label>
                                </div>
                                <div className='col-7 col-sm-7 col-md-7'>
                                  <h4>
                                    {
                                      userdata.length !== 0 ? userdata.map((userdata) => {
                                        return userdata.date ? userdata.date.slice(0, 10).split('-').reverse().join('/') : 'NA';
                                      }) : cuser.map(() => { return 'fetching...' })
                                    }
                                  </h4>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div> :
                  <Media query="(min-width:405px)" key='20'>
                    {matches => {
                      return matches ? <div className={containerclass ? containerclass : 'container emp-profile'} style={{ background: 'white', width: 'fit-content', height: '440px' }}>
                        <form method="">
                          <div className='row' style={{ marginTop: '30px' }}>
                            <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8'>
                              <label htmlFor='email'>
                                <i className='zmdi zmdi-email material-icons-name'></i>
                              </label>
                              <input className={'w-100 form-group'} type="email" name="email" id="email" autoComplete="off"
                                placeholder="Enter User's Email" onChange={(e) => setEmail(e.target.value)} style={{ color: "black" }}></input>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align='left'>
                              <input type="submit" className="edit" value="Check" onClick={getuserdetails} />
                            </div>
                            <div className='col-5 col-sm-4 col-md-3 col-lg-3 col-xl-3' style={{ display: display ? display : 'none' }}>
                              <div className='usericons' style={{ width: '120px', height: '120px', lineHeight: '120px' }}>
                                {
                                  userdata.length !== 0 ? userdata.map((userdata) => {
                                    return userdata.fname[0] + userdata.lname[0];
                                  }) : cuser.map(() => { return 'fetching...' })
                                }
                              </div>
                            </div>
                            <div className='col col-sm col-md-6 col-lg-7 col-xl-7' style={{ display: display ? display : 'none' }}>
                              <div className='profile-head' style={{ marginTop: '50px', marginLeft: '2px' }}>
                                <h1>
                                  {
                                    userdata.length !== 0 ? userdata.map((userdata) => {
                                      return userdata.fname + ' ' + userdata.lname;
                                    }) : cuser.map(() => { return 'fetching...' })
                                  }
                                </h1>
                                <h3>
                                  {
                                    userdata.length !== 0 ? userdata.map((userdata) => {
                                      return userdata.designation;
                                    }) : cuser.map(() => { return 'fetching...' })
                                  } </h3>
                              </div>
                            </div>

                            <div className="col-12 col-sm-12 col-md-8 pl-5 about-info" style={{ display: display ? display : 'none' }}>
                              <div className='teb-content'>
                                <div className='tab-pane show active' id="home" style={{ marginLeft: '2%' }}>
                                  <div className='row'>
                                    <div className='col-5 col-sm-5 col-md-5'>
                                      <label><h3>Email</h3></label>
                                    </div>
                                    <div className='col-7 col-sm-7 col-md-7'>
                                      <h5>
                                        {
                                          userdata.length !== 0 ? userdata.map((userdata) => {
                                            return userdata.email;
                                          }) : cuser.map(() => { return 'fetching...' })
                                        }
                                      </h5>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-5 col-sm-5 col-md-5'>
                                      <label><h3>Phone</h3></label>
                                    </div>
                                    <div className='col-7 col-sm-7 col-md-7'>
                                      <h5>
                                        {
                                          userdata.length !== 0 ? userdata.map((userdata) => {
                                            return userdata.phone;
                                          }) : cuser.map(() => { return 'fetching...' })
                                        }
                                      </h5>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-5 col-sm-5 col-md-5'>
                                      <label><h3>Course</h3></label>
                                    </div>
                                    <div className='col-7 col-sm-7 col-md-7'>
                                      <h5>
                                        {
                                          userdata.length !== 0 ? userdata.map((userdata) => {
                                            return userdata.course;
                                          }) : cuser.map(() => { return 'fetching...' })
                                        }
                                      </h5>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-5 col-sm-5 col-md-5'>
                                      <label><h3>Country</h3></label>
                                    </div>
                                    <div className='col-7 col-sm-7 col-md-6'>
                                      <h5>
                                        {
                                          userdata.length !== 0 ? userdata.map((userdata) => {

                                            return userdata.country.map((e) => {
                                              return e;
                                            }).join(', ');

                                          }) : cuser.map(() => { return 'fetching...' })
                                        }
                                      </h5>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-5 col-sm-5 col-md-5'>
                                      <label><h3>Date</h3></label>
                                    </div>
                                    <div className='col-7 col-sm-7 col-md-7'>
                                      <h5>
                                        {
                                          userdata.length !== 0 ? userdata.map((userdata) => {
                                            return userdata.date ? userdata.date.slice(0, 10).split('-').reverse().join('/') : 'NA';
                                          }) : cuser.map(() => { return 'fetching...' })
                                        }
                                      </h5>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div> :
                        <div className={containerclass ? containerclass : 'container emp-profile'} style={{ background: 'white', width: 'fit-content', height: '440px' }}>
                          <form method="">
                            <div className='row' style={{ marginTop: '30px' }}>
                              <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8'>
                                <label htmlFor='email'>
                                  <i className='zmdi zmdi-email material-icons-name'></i>
                                </label>
                                <input className={'w-100 form-group'} type="email" name="email" id="email" autoComplete="off"
                                  placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ color: "black" }}></input>
                              </div>
                              <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" align='left'>
                                <input type="submit" className="edit" value="Check" onClick={getuserdetails} style={{ fontSize: '6px' }} />
                              </div>
                              <div className='col-5 col-sm-4 col-md-3 col-lg-3 col-xl-3' style={{ display: display ? display : 'none' }}>
                                <div className='usericons' style={{ width: '100px', height: '100px', lineHeight: '100px' }}>
                                  {
                                    userdata.length !== 0 ? userdata.map((userdata) => {
                                      return userdata.fname[0] + userdata.lname[0];
                                    }) : cuser.map(() => { return 'fetching...' })
                                  }
                                </div>
                              </div>
                              <div className='col col-sm col-md-6 col-lg-7 col-xl-7' style={{ display: display ? display : 'none' }}>
                                <div className='profile-head' style={{ marginTop: '50px', marginLeft: '2px' }}>
                                  <h1>
                                    {
                                      userdata.length !== 0 ? userdata.map((userdata) => {
                                        return userdata.fname + ' ' + userdata.lname;
                                      }) : cuser.map(() => { return 'fetching...' })
                                    }
                                  </h1>
                                  <h3>
                                    {
                                      userdata.length !== 0 ? userdata.map((userdata) => {
                                        return userdata.designation;
                                      }) : cuser.map(() => { return 'fetching...' })
                                    } </h3>
                                </div>
                              </div>

                              <div className="col-12 col-sm-12 col-md-8 pl-5 about-info" style={{ display: display ? display : 'none' }}>
                                <div className='teb-content'>
                                  <div className='tab-pane show active' id="home" style={{ marginLeft: '2%' }}>
                                    <div className='row'>
                                      <div className='col-5 col-sm-5 col-md-5'>
                                        <label><h3>Email</h3></label>
                                      </div>
                                      <div className='col-7 col-sm-7 col-md-7'>
                                        <h6>
                                          {
                                            userdata.length !== 0 ? userdata.map((userdata) => {
                                              return userdata.email;
                                            }) : cuser.map(() => { return 'fetching...' })
                                          }
                                        </h6>
                                      </div>
                                    </div>
                                    <div className='row'>
                                      <div className='col-5 col-sm-5 col-md-5'>
                                        <label><h3>Phone</h3></label>
                                      </div>
                                      <div className='col-7 col-sm-7 col-md-7'>
                                        <h6>
                                          {
                                            userdata.length !== 0 ? userdata.map((userdata) => {
                                              return userdata.phone;
                                            }) : cuser.map(() => { return 'fetching...' })
                                          }
                                        </h6>
                                      </div>
                                    </div>
                                    <div className='row'>
                                      <div className='col-5 col-sm-5 col-md-5'>
                                        <label><h3>Course</h3></label>
                                      </div>
                                      <div className='col-7 col-sm-7 col-md-7'>
                                        <h6>
                                          {
                                            userdata.length !== 0 ? userdata.map((userdata) => {
                                              return userdata.course;
                                            }) : cuser.map(() => { return 'fetching...' })
                                          }
                                        </h6>
                                      </div>
                                    </div>
                                    <div className='row'>
                                      <div className='col-5 col-sm-5 col-md-5'>
                                        <label><h3>Country</h3></label>
                                      </div>
                                      <div className='col-7 col-sm-7 col-md-6'>
                                        <h6>
                                          {
                                            userdata.length !== 0 ? userdata.map((userdata) => {

                                              return userdata.country.map((e) => {
                                                return e;
                                              }).join(', ');

                                            }) : cuser.map(() => { return 'fetching...' })
                                          }
                                        </h6>
                                      </div>
                                    </div>
                                    <div className='row'>
                                      <div className='col-5 col-sm-5 col-md-5'>
                                        <label><h3>Date</h3></label>
                                      </div>
                                      <div className='col-7 col-sm-7 col-md-7'>
                                        <h6>
                                          {
                                            userdata.length !== 0 ? userdata.map((userdata) => {
                                              return userdata.date ? userdata.date.slice(0, 10).split('-').reverse().join('/') : 'NA';
                                            }) : cuser.map(() => { return 'fetching...' })
                                          }
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                    }}
                  </Media>

              }}
            </Media>
        }}
      </Media>
    </>
  )
}

export default Userdetails
