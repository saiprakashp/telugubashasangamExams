import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

import { useHistory } from "react-router-dom";
import Routes from "./routes/Routes";

function App() {
    const [search, setsearch] = useState('');
    const [data, setData] = useState(null);
    const [showTestCreate, setShowTestCreate] = useState(false);
    const [error, setError] = useState('');
    let history = useHistory();

    useEffect(
        () => {
            if (localStorage.getItem("user") == null || localStorage.getItem("user") == undefined) {
                let user = {
                    'loginValid': false,
                    'uname': ''
                };
                localStorage.setItem("user", JSON.stringify(user));
                setData(user);
            } else {
                let user = JSON.parse(localStorage.getItem("user"));
                setData(user);
                if (user.loginValid) {
                    setShowTestCreate(true);
                }
            }

        }, [(data != null)]
    )

    const saveData = () => {
        if (document.getElementById("userName").value === 'syamala' && document.getElementById("pass").value === '1964') {
            localStorage.removeItem("user");
            let user = {
                'loginValid': true,
                'uname': 'syamala',
                'token': 'hUotCMLVN0M'
            };
            localStorage.setItem("user", JSON.stringify(user));
            setData(user);
            setError('Valid User');
            document.getElementById("closeLogin").click();
        } else {
            localStorage.removeItem("user");
            setError('In-Valid User');
        }
    }
const removeStorage=()=>{alert("You are about to logout")
         localStorage.removeItem("user");
         window.location.reload();
 
}
    return (

        <div className="App">

            <nav className="navbar navbar-expand-lg navbar-light bg-light w-auto">
                <a className="navbar-brand" href="/">Telugu Basha Sangam</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/exam/takeExam/">Take Exam
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        {(data != null && (data.loginValid === true || data.loginValid === 'true')) ? <>

                            {/* <div className="dropdown">
                                <a className="btn btn-sm text-primary mt-1 dropdown-toggle" type="button"
                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    Manage Users
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="/user/home">Home</a>
                                    <a className="dropdown-item" href="/user/manage">Manage User</a>
                                    <a className="dropdown-item" href="/logOut/">LogOut</a>
                                </div>
                            </div> */}
                            <div className="dropdown">
                                <a className="btn btn-sm text-primary mt-1 dropdown-toggle" type="button"
                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    Exams
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="/exam/takeExam/">Take Exam</a>
                                    <a className="dropdown-item" href="/exam/createExam/">Create Exam</a>
                                    <a className="dropdown-item" href="/exam/manageExam/">Manage Exam</a>
                                    <a className="dropdown-item" href="/user/exams/results">Show Exam Results</a>

                                </div>
                            </div>
                        </> : null}
                    </ul>
                    {
                        /*

<div className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Exam Code"
                               onChange={(e) => setsearch(e.target.value)} value={search}
                               aria-label="Search"/>
                        <a className="btn btn-outline-success my-2 my-sm-0" href={'/exam/takeExam?'+search} >Search Exam
                        </a>
                    </div>
                        */
                    }
                    <a className="ml-3 btn btn-sm btn-primary" data-toggle="modal"
                        data-target="#exampleModal">
                        Login
                    </a>
                    <a className="ml-3 btn btn-sm btn-danger"   onClick={()=>removeStorage()}
                       >
                        LogOut
                    </a>
                </div>
            </nav>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="alert alert-light" role="alert">
                                {error}</div>
                            <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                            <button type="button" id="closeLogin" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="form-group">
                                    <label>User name</label>
                                    <input type="text" className="form-control" id="userName"
                                        aria-describedby="emailHelp"></input>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" id="pass"></input>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a className="btn btn-secondary" data-dismiss="modal">Close</a>
                            <a className="btn btn-primary" onClick={() => saveData()}>Save changes</a>
                        </div>
                    </div>
                </div>
            </div>

            <Routes />
        </div>
    );
}

export default App;
