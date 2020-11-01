import React, {useEffect, useState} from "react";
import {month_names} from './Util';
import {useHistory} from "react-router";
import {Switch} from "@material-ui/core";
import axios from 'axios';

let ManageExam = (props) => {
    let history = useHistory();
    const [res, setRes] = useState(null);
    const disbleOrEnableExam = (id, flag, index) => {
        if (localStorage != null && !(localStorage.getItem("user") === null || localStorage.getItem("user") === undefined)) {
            let user = JSON.parse(localStorage.getItem("user"));
            axios.post('http://localhost:4000/user/update/exam', {
                    "user": user.uname,
                    "token": user.token,
                    "id": id,
                    "flag": flag
                }
            )
                .then((response) => {
                   
                    setRes(response.data.data)
                })
                .catch((errors) => {
                    console.log(errors);
                });

        }
    }
    useEffect(
        () => {
         if(res == null)   if (localStorage != null && !(localStorage.getItem("user") === null || localStorage.getItem("user") === undefined)) {
                let user = JSON.parse(localStorage.getItem("user"));

                axios.post('http://localhost:4000/user/getExams', {
                        "user": user.uname,
                        "token": user.token,
                    }
                )
                    .then((response) => {
                        setRes(response.data.data)
                    })
                    .catch((errors) => {
                        console.log(errors);
                    });

            }
        }, []
    )


    return <div>

        <div className="accordion"
             id="accordionExample">    {(res != null) ? Object.keys(res.months).map((month, index) => {
 
            return (<div key={'monthData_' + index} className="card m-auto p-1  w-75">
                <div className="card-header" id={"heading" + index}>
                    <h2 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse"
                                data-target={"#collapse" + index}
                                aria-expanded={true} aria-controls="collapseOne">
                            Total Test For month: {month_names[index]} Test Count: { res.months[month]}
                        </button>
                    </h2>
                </div>

                <div id={"collapse" + index} className="collapse" aria-labelledby="headingOne"
                     data-parent="#accordionExample">
                    {
                        res.exams.map((exam, index) => {
                            if (exam.month === month) {
                                return <div key={"examlink_" + index} className="card-body">
                                    <div className="card w-25">
                                        <div className="card-header">
                                            <h5 className="">Enable Exam</h5>  <Switch size="small"
                                                                                       id={"swith_" + exam.id}
                                                                                       checked={(exam.enableExam === 1) ? true : false}
                                                                                       onChange={(e) => {
                                                                                           disbleOrEnableExam(exam.id, e.target.checked, index)
                                                                                       }}
                                                                                       inputProps={{'aria-label': 'Enable Exam'}}/>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title"></h5>
                                            <p className="card-text"> {
                                                exam.name
                                            }</p>
                                            <a id={exam.id} href="#" onClick={() => history.push({
                                                pathname: '/exam/ShowTest',
                                                search: String(exam.name)
                                            })} className="card-link">Show Test</a>
                                        </div>
                                    </div>
                                </div>
                            }

                        })

                    }

                </div>
            </div>);
        }) : null
        }
        </div>

    </div>
        ;
}

export default ManageExam;
