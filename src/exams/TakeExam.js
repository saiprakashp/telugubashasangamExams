import React, { createRef, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from 'axios';
import { SERVICE_URL } from "../utils/Services";

let TakeExam = (props) => {
    let location = useLocation();
    let testid = null;
    let totalQue = 0;
    const [jsonData, setJson] = useState(null)
    const [arr, setArr] = useState(null);
    const [showAns, setShowNas] = useState(false);
    const [queLen, setQueLen] = useState(-1);
    const [currentAttemp, setcurrentAttemp] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showRes, setShowRes] = useState(null);
    const handleInputChange = (type, value, index, id) => {
        let data = { ...jsonData };
        let ans = { ...answers };
        document.getElementById("opt_1_" + id).disabled = true
        document.getElementById("opt_2_" + id).disabled = true
        document.getElementById("opt_3_" + id).disabled = true
        document.getElementById("opt_4_" + id).disabled = true
         
        switch (type) {
            case 'ans1': ans[index].ans = 1; setAnswers(ans)
                break;
            case 'ans2': ans[index].ans = 2; setAnswers(ans)
                break;
            case 'ans3': ans[index].ans = 3; setAnswers(ans)
                break;
            case 'ans4': ans[index].ans = 4; setAnswers(ans)
                break;

        }
        let attemp=currentAttemp+1;

        console.log(attemp)
        if(attemp==queLen){
           
            saveTest();  
        }
        setcurrentAttemp(attemp)
    }
    useEffect(
        () => {
            if (jsonData == null && localStorage != null && !(localStorage.getItem("user") === null || localStorage.getItem("user") === undefined)) {
                let user = JSON.parse(localStorage.getItem("user"));
                testid = (location.search != null) ? (location.search.substr(1, location.search.length)) : '';
                axios.post(SERVICE_URL+ '/user/exam/gettest', {
                    "user": user.uname,
                    "token": user.token,
                    "examname": testid
                }
                )
                    .then((response) => {
                        let data = response.data.data;
                        let ans = []
                        let len = (data[0] != null && data[0].questions != null  ) ? data[0].questions.length : -1;
                        setQueLen(len);
                        for (var i = 1; i <= len; i++) {
                            ans.push({
                                id: i, ans: -1
                            })
                        } 
                        setJson(data[0])
                        setAnswers(ans)
                    })
                    .catch((errors) => {
                        console.log('useEffect  ', errors);
                    });


            }
        }, []
    )
    const saveTest = () => {

        if (document.getElementById("studName") == null || (document.getElementById("studName") != null && document.getElementById("studName").value === '')) {
            alert('Write Your Name')
        } else {
            let report = {
                result: "Fail",
                message: "NA",
                correct: 0,
                incorract: 0,
                quelen:queLen
            }

            jsonData.questions.map((val, key) => {
                document.getElementById("opt_1_" + val.queId).disabled = true
                document.getElementById("opt_2_" + val.queId).disabled = true
                document.getElementById("opt_3_" + val.queId).disabled = true
                document.getElementById("opt_4_" + val.queId).disabled = true
                if (val.ans == answers[key].ans) {
                    report.correct += 1;
                } else {
                    report.incorract += 1;
                }
            })

            if (report.correct === queLen) {
                report.result = "Pass"
            }

         
            axios.post(SERVICE_URL+ '/user/save/test', {
                "user":  document.getElementById("studName").value,
                "name":jsonData.name,
                "attempts": 1,
                "marks": report,
                "saveEnabled": 1,
                "school": "NA",
                "examname": jsonData.name
            }
            )
                .then((response) => {
                    report.message='Your Exam results are saved and shared with your teacher';
                    setShowRes(report)
                    setShowNas(true)

                })
                .catch((errors) => {
                    report = {
                        result: "NA",
                        message: "NA",
                        correct: 0,
                        incorract: 0,
                        quelen:queLen
                    }
                    report.message='Contact Your Class Teacher Exam Not Saved';
                    setShowRes(report)
                });

        }


    };
    const addData = (count) => {
        var json = jsonData;
        var data = [];

        if (json != null && json.exams != null) {

            let len = json.questions[0].questions.questions[json.questions[0].questions.questions.length - 1].queId;
            for (var i = 1; i <= totalQue; i++) {
                json.questions[0].questions.questions.push({
                    "queId": len + 1,
                    "questionTitle": "",
                    "opt1": "",
                    "opt2": "",
                    "opt3": "",
                    "opt4": "",
                    "ans": ""
                });
            }
            totalQue = 0;
            setJson(json)

        }
    }
    function loadTotalQuestions() {
        var json = jsonData;

    }

    return <div>
        <button className=" mt-2 mb-2 btn btn-primary text-white" disabled={showRes!=null}  onClick={() => saveTest()}>Save Test</button>
        <div className="mt-2  mb-3">
            <div className=" w-auto m-auto h-50 input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className=" mb-3 input-group-text" id="inputGroup-sizing-sm">Student name: </span>
                </div>
                <input type="text" id="studName" className=" mb-3  form-control" aria-label="studName"
                    aria-describedby="inputGroup-sizing-sm"  ></input>
            </div>


            {(jsonData != null) ?
                <div>
                    <div key={'Title'} className=" w-auto m-auto h-50 input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className=" mb-3 input-group-text" id="inputGroup-sizing-sm">Exam Name: </span>
                        </div>
                        <input type="text" id="examName" className=" mb-3 form-control" aria-label="Total Size" disabled
                            value={jsonData.name}
                            onChange={(e) => {
                                handleInputChange('title', e.target.value, -1)
                            }}
                            aria-describedby="inputGroup-sizing-sm"></input>

                    </div>
                    <br />

                </div> : null
            }

            <div className=" w-auto m-auto h-50 input-group input-group-sm mb-3">

                <div className="input-group-prepend">
                    <span className=" mb-3 input-group-text" id="inputGroup-sizing-sm">Pass Marks: </span>
                </div>
                <input type="text" id="passquestion" className=" mb-3 form-control" disabled onChange={(e) => e.target.value} value={queLen}></input>
            </div>

        {(showRes!=null)?
                <div className="alert alert-dark container h-auto" >
               <h4><label><b>Marks Scored:</b> </label>{
                    showRes.correct
                } / {
                   queLen
                }</h4>
               <h4><label><b> Status :</b> </label>{
                    showRes.message
                }</h4>
            </div>:null

        }

            {
                (jsonData != null && jsonData.questions != null && jsonData.questions) ? jsonData.questions
                    .map(
                        (value, index) => {
                            return (<div key={index} className="card w-auto m-auto h-auto">
                                <div className="card-body">
                                    <div><small className="align-top">{"Q" + value.queId + ") "}</small>
                                        <textarea id={"que_" + value.queId} rows="5" cols="80" value={value.questionTitle} disabled
                                            onChange={(e) => handleInputChange('questionTitle', e.target.value, index)}
                                            className="card-title text-sm-left font-weight-bold " />
                                    </div>
                                    <div className="input-group" id="test">
                                        <div className="input-group-prepend w-100">
                                            <input type="radio" name={"ans_" + value.queId} id={"opt_1_" + value.queId} value={1} onChange={(e) => handleInputChange('ans1', e.target, index, value.queId)}
                                                aria-label="Radio button for following text input"></input>
                                            <input type="text" id={"ans_" + value.queId + "_1"}
                                                onChange={(e) => handleInputChange('opt1', e.target.value, index)}
                                                value={value.opt1} disabled
                                                className=" ml-2 w-100 form-control"
                                                aria-label="Text input with radio button"
                                            ></input>

                                        </div>
                                        <div className="mt-1 input-group-prepend w-100">
                                            <input type="radio" name={"ans_" + value.queId} id={"opt_2_" + value.queId} value={2} onChange={(e) => handleInputChange('ans2', e.target, index, value.queId)}
                                                aria-label="Radio button for following text input"></input>
                                            <input type="text" id={"ans_" + value.queId + "_2"}
                                                className=" ml-2 w-100 form-control"
                                                value={value.opt2} disabled
                                                onChange={(e) => handleInputChange('opt2', e.target.value, index)}
                                                aria-label="Text input with radio button"
                                            ></input>

                                        </div>
                                        <div className="mt-1 input-group-prepend w-100">
                                            <input type="radio" name={"ans_" + value.queId} id={"opt_3_" + value.queId} value={3} onChange={(e) => handleInputChange('ans3', e.target, index, value.queId)}
                                                aria-label="Radio button for following text input"></input>
                                            <input type="text" id={"ans_" + value.queId + "_3"}
                                                className=" ml-2 w-100 form-control"
                                                onChange={(e) => handleInputChange('opt3', e.target.value, index)}
                                                value={value.opt3} disabled
                                                aria-label="Text input with radio button"
                                            ></input>

                                        </div>
                                        <div className="mt-1 input-group-prepend w-100">
                                            <input type="radio" name={"ans_" + value.queId} id={"opt_4_" + value.queId} value={4} onChange={(e) => handleInputChange('ans4', e.target, index, value.queId)}
                                                aria-label="Radio button for following text input"></input>
                                            <input type="text" id={"ans_" + value.queId + "_4"}
                                                className=" ml-2 w-100 form-control"
                                                value={value.opt4} disabled
                                                onChange={(e) => handleInputChange('opt4', e.target.value, index)}
                                                aria-label="Text input with radio button"
                                            ></input>

                                        </div>
                                        {
                                            (showAns) ? <div className="mt-1 input-group-prepend w-100">
                                                <label>Answer: </label>
                                                <input type="text" id={"fans_" + value.queId}
                                                    className=" ml-2 w-100 form-control"
                                                    value={value.ans} disabled
                                                    onChange={(e) => handleInputChange('ans', e.target.value, index)}
                                                    aria-label="Text input with radio button"
                                                ></input>
                                            </div> : null
                                        }
                                    </div>
                                </div>
                            </div>)
                        }
                    ) : null
            }

        </div>
        <button className=" mt-2 mb-2 btn btn-primary text-white" disabled={showRes!=null} onClick={() => saveTest()}>Save Test</button>
    </div>
}

export default TakeExam;
