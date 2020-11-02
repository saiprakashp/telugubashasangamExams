import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

let ShowTest = (props) => {
    let location = useLocation();
    let testid = null;
    let totalQue = 0;
    const [jsonData, setJson] = useState(null)
    const [arr, setArr] = useState(null);
    const [res, setRes] = useState(null);
    const handleInputChange = (type, value, index) => {
        let data = { ...jsonData };
        switch (type) {
            case 'passquestion':
                data.exams[0].passquestion = value;
                setJson(data)
            break;
            case 'questionTitle':
                data.exams[0].questions[index].questionTitle = value;
                setJson(data)
                break;
            case 'title':
                data.exams[0].name = value;
                setJson(data)
                break;
            case 'opt1':
                data.exams[0].questions[index].opt1 = value;
                setJson(data)
                break;
            case 'opt2':
                data.exams[0].questions[index].opt2 = value;
                setJson(data)
                break;
            case 'opt3':
                data.exams[0].questions[index].opt3 = value;
                setJson(data)
                break;
            case 'opt4':
                data.exams[0].questions[index].opt4 = value;
                setJson(data)
                break;
            case 'ans':
                data.exams[0].questions[index].ans = value;
                setJson(data)
                break;

        }
    }
    useEffect(
        () => {
            if (jsonData == null && localStorage != null && !(localStorage.getItem("user") === null || localStorage.getItem("user") === undefined)) {
                let user = JSON.parse(localStorage.getItem("user"));
                testid = (location.search != null) ? (location.search.substr(1, location.search.length)) : '';
                axios.post('https://telugubashasangamba.herokuapp.com/user/exam/getExam', {
                    "user": user.uname,
                    "token": user.token,
                    "examname": testid
                }
                )
                    .then((response) => {
                        let data = response.data.data;
                        setJson(data)
                    })
                    .catch((errors) => {
                        console.log('useEffect  ', errors);
                    });


            }
        }, []
    )
    const saveTest = () => {
        if (localStorage != null && !(localStorage.getItem("user") === null || localStorage.getItem("user") === undefined)) {
            let user = JSON.parse(localStorage.getItem("user"));
            var data = jsonData.exams[0];
            data['token'] = user.token
            data['user'] = user.uname

            axios.post('https://telugubashasangamba.herokuapp.com/user/updateExam', {
                data
            }
            )
                .then((response) => {
                  //  console.log('saveTest  ', response);
                    setRes(response.data.message)
                })
                .catch((errors) => {
                  //  console.log('saveTest  ', errors);
                });


        }
    };
    const addData = (count) => {
        var json = {...jsonData};
        var data = [];

        if (json != null && json.exams != null) {

            let len = json.exams[0].questions[json.exams[0].questions.length - 1].queId;
            for (var i = 1; i <= totalQue; i++) {
                json.exams[0].questions.push({
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
            console.log('json  ', json)
            setJson(json)

        }
    }
    function loadTotalQuestions() {
        var json = jsonData;

    }

    return <div>
        <button className=" mt-2 mb-2 btn btn-primary text-white" onClick={() => saveTest()}>Save Test</button>
        <div className=" w-25 m-auto h-50 input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className=" mb-3 input-group-text" id="inputGroup-sizing-sm">Total Questions: </span>
            </div>
            <input type="number" id="totalQuestions" className=" mb-3 form-control" aria-label="Total Size"
                aria-describedby="inputGroup-sizing-sm" onChange={(e) => {
                    totalQue = parseInt(e.target.value)
                }}></input>
            <a className="ml-2 text-primary" onClick={() => addData()}>Generate</a>
        </div>
        <div className="mt-2 mb-3">
            {(jsonData != null && jsonData.exams[0] != null) ?
                <div>
                    <div key={'Title'} className=" w-25 m-auto h-50 input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className=" mb-3 input-group-text" id="inputGroup-sizing-sm">Exam Name: </span>
                        </div>
                        <input type="text" id="examName" className=" mb-3 form-control" aria-label="Total Size"
                            value={jsonData.exams[0].name}
                            onChange={(e) => {
                                handleInputChange('title', e.target.value, -1)
                            }}
                            aria-describedby="inputGroup-sizing-sm"></input>

                    </div>
                    <br />

                </div> : null
            }

            <div className=" w-25 m-auto h-50 input-group input-group-sm mb-3">

                <div className="input-group-prepend">
                    <span className=" mb-3 input-group-text" id="inputGroup-sizing-sm">Pass Marks: </span>
                </div>
                <input type="text" id="passquestion" className=" mb-3 form-control" aria-label="passquestion"
                    value={(jsonData != null && jsonData.exams[0] != null && jsonData.exams[0].passquestion)?jsonData.exams[0].passquestion:0}
                    onChange={(e) => handleInputChange('passquestion', e.target.value, 0)}
                    aria-describedby="inputGroup-sizing-sm"  ></input>
            </div>
            {(res!=null)?
                <div className="alert alert-dark container h-auto" >
              <h4><label><b>Response :</b> </label>{
                    res
                }</h4>
            </div>:null

        }
            {
                (jsonData != null && jsonData.exams[0] != null && jsonData.exams[0].questions) ? jsonData.exams[0].questions
                    .map(
                        (value, index) => {
                            return (<div key={index} className="card w-50   m-auto h-auto">
                                <div className="card-body">
                                    <div><small className="align-top">{"Q" + value.queId + ") "}</small>
                                        <textarea id={"que_" + value.queId} rows="5" cols="40" value={value.questionTitle}
                                            onChange={(e) => handleInputChange('questionTitle', e.target.value, index)}
                                            className="card-title text-sm-left font-weight-bold " />
                                    </div>
                                    <div className="input-group" id="test">
                                        <div className="input-group-prepend w-100">
                                            <input type="radio" name={"ans_" + value.queId} value={1}
                                                aria-label="Radio button for following text input"></input>
                                            <input type="text" id={"ans_" + value.queId + "_1"}
                                                onChange={(e) => handleInputChange('opt1', e.target.value, index)}
                                                value={value.opt1}
                                                className=" ml-2 w-100 form-control"
                                                aria-label="Text input with radio button"
                                            ></input>

                                        </div>
                                        <div className="mt-1 input-group-prepend w-100">
                                            <input type="radio" name={"ans_" + value.queId} value={2}
                                                aria-label="Radio button for following text input"></input>
                                            <input type="text" id={"ans_" + value.queId + "_2"}
                                                className=" ml-2 w-100 form-control"
                                                value={value.opt2}
                                                onChange={(e) => handleInputChange('opt2', e.target.value, index)}
                                                aria-label="Text input with radio button"
                                            ></input>

                                        </div>
                                        <div className="mt-1 input-group-prepend w-100">
                                            <input type="radio" name={"ans_" + value.queId} value={3}
                                                aria-label="Radio button for following text input"></input>
                                            <input type="text" id={"ans_" + value.queId + "_3"}
                                                className=" ml-2 w-100 form-control"
                                                onChange={(e) => handleInputChange('opt3', e.target.value, index)}
                                                value={value.opt3}
                                                aria-label="Text input with radio button"
                                            ></input>

                                        </div>
                                        <div className="mt-1 input-group-prepend w-100">
                                            <input type="radio" name={"ans_" + value.queId} value={4}
                                                aria-label="Radio button for following text input"></input>
                                            <input type="text" id={"ans_" + value.queId + "_4"}
                                                className=" ml-2 w-100 form-control"
                                                value={value.opt4}
                                                onChange={(e) => handleInputChange('opt4', e.target.value, index)}
                                                aria-label="Text input with radio button"
                                            ></input>

                                        </div>
                                        <div className="mt-1 input-group-prepend w-100">
                                            <label>Answer: </label>
                                            <input type="text" id={"fans_" + value.queId}
                                                className=" ml-2 w-100 form-control"
                                                value={value.ans}
                                                onChange={(e) => handleInputChange('ans', e.target.value, index)}
                                                aria-label="Text input with radio button"
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    ) : null
            }

        </div>
        <button className=" mt-2 mb-2 btn btn-primary text-white" onClick={() => saveTest()}>Save Test</button>
    </div>
}

export default ShowTest;
