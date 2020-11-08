import React, { useEffect, useState } from "react";
import { month_names } from './Util';
import { useHistory } from "react-router";
import { Switch } from "@material-ui/core";
import axios from 'axios';
import { SERVICE_URL } from "../utils/Services";

let ShowResults = (props) => {
    let history = useHistory();
    const [res, setRes] = useState(null);
    const [tests, setTests] = useState(null);
    const [examName, setExamName] = useState('Choose');

    useEffect(
        () => {
            if (res == null) if (localStorage != null && !(localStorage.getItem("user") === null || localStorage.getItem("user") === undefined)) {
                let user = JSON.parse(localStorage.getItem("user"));

                axios.post(SERVICE_URL+ '/user/getExams', {
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
    function fetchResults(exam) {

        axios.post(SERVICE_URL+ '/user/getSudenExams', {
            "examname": exam
        }
        )
            .then((response) => {
                let data = response.data;
                setTests(data.data)
            })
            .catch((errors) => {
                console.log(errors);
            });

    }


    return <div>

        <div className="input-group mb-3 w-25 m-auto ">
            <div className="input-group-prepend">
                <label className="input-group-text">Exam names</label>
            </div>
            <select id="month" value={examName} onChange={(e) => {
                setExamName(e.target.value)
                fetchResults(e.target.value)
            }} className="custom-select" >
                <option value={'Choose'}>Choose...</option>
                {
                    (res != null && res.exams != null) ?
                        res.exams.map((val, key) => {
                            return <option key={key} value={val.name}>Exam-Name {val.name} Month: {val.month}</option>
                        }) : null
                }
            </select></div>

        {(tests != null) ?
            <div>  <div className="alert alert-dark container h-auto" >
                {tests.length > 0 ? "Success" : "No Students Attempted"}
            </div>
                {
                    tests.map((val, key) => {
                    return <div key={key} className="card">
                            <div className="card-body">
                                <h3>Exam Name: {val.examname}</h3>
                                <h6>Student Name: {val.name}</h6>
                                <h6>Marks:</h6>
                                <p>Result: {val.marks.result}</p>
                                <p>Marks Scored: {val.marks.correct} / {val.marks.queLen}</p>
                            </div>
                        </div>
                    })
                }
            </div>
            : null

        }

    </div>
}
export default ShowResults;
