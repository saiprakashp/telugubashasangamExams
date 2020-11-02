import React, { useEffect, useState } from "react";
import { month_names, month_names_short } from "./Util";
import { testTemplate } from "./Util";
import axios from "axios";

const CreateExam = (props) => {
    let totalQue = 0;
    let examName = '';
    var inp = [];
    const [indents, setindents] = useState(null);
    const [res, setRes] = useState(null);
    const [month, setMonth] = useState(month_names_short[new Date().getMonth()]);
    useEffect(
        () => {
            setindents(testTemplate)
        }, [indents != null]

    )
    const saveTest = () => {
        let data;
        let questions = [];
        var date = new Date();

        if (indents != null && indents.length > 0) indents.map((val, index) => {
            questions.push({
                "queId": index,
                "questionTitle": document.getElementById("que_" + index + "").value,
                "opt1": document.getElementById("ans_" + index + "_1").value,
                "opt2": document.getElementById("ans_" + index + "_2").value,
                "opt3": document.getElementById("ans_" + index + "_3").value,
                "opt4": document.getElementById("ans_" + index + "_4").value,
                "ans": document.getElementById("fans_" + index + "").value
            });
        });

        ///user/saveExam

        if (localStorage != null && !(localStorage.getItem("user") === null || localStorage.getItem("user") === undefined)) {
            let user = JSON.parse(localStorage.getItem("user"));

            data = {
                "user": user.uname,
                "token": user.token,
                "month": (document.getElementById("month") != null) ? document.getElementById("month").value : month_names_short[date.getMonth()],
                "created_date": date,
                "updated_date": date,
                "name": (examName == null || (examName != null && examName === '') ? document.getElementById("examName").value : examName),
                "questions": indents.questions,
                "passquestion": (document.getElementById("passquestion") != null) ? document.getElementById("passquestion").value : 2,
            }
          
            axios.post('https://telugubashasangamba.herokuapp.com/user/saveExam', {
                ...data
            }
            )
                .then((response) => {
                    setRes(response.data.message)
                })
                .catch((errors) => {
                    console.log(errors);
                });

        }
    };
    const handleInputChange = (type, value, index) => {
        let data = { ...indents };

        switch (type) {
            case 'questionTitle':
                data.questions[index].questionTitle = value;
                setindents(data)
                break;
            case 'title':
                data.exams[0].name = value;
                setindents(data)
                break;
            case 'opt1':
                data.questions[index].opt1 = value;
                setindents(data)
                break;
            case 'opt2':
                data.questions[index].opt2 = value;
                setindents(data)
                break;
            case 'opt3':
                data.questions[index].opt3 = value;
                setindents(data)
                break;
            case 'opt4':
                data.questions[index].opt4 = value;
                setindents(data)
                break;
            case 'ans':
                data.questions[index].ans = value;
                setindents(data)
                break;

        }
    }

    const deleteData = (index) => {
        delete inp[index]
    }

    const loadTotalQuestions = () => {
        var data = testTemplate.questions;
        var json = { ...indents };

        if (json != null && json.questions != null) {
            let len = (json.questions.length <= 0) ? 0 : json.questions[json.questions.length - 1].queId;
            for (var i = 1; i <= totalQue; i++) {
                json.questions.push({
                    "queId": len + i,
                    "questionTitle": "",
                    "opt1": "",
                    "opt2": "",
                    "opt3": "",
                    "opt4": "",
                    "ans": ""
                });
            }
            totalQue = 0;
            setindents(json)

        }

    }
    return <div>
        <div className=" w-25 m-auto h-50 input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className=" mb-3 input-group-text" id="inputGroup-sizing-sm">Total Questions: </span>
            </div>
            <input type="number" id="totalQuestions" className=" mb-3 form-control" aria-label="Total Size"
                aria-describedby="inputGroup-sizing-sm" onChange={(e) => {
                    totalQue = parseInt(e.target.value)
                }}></input>
            <a className="ml-2 text-primary" onClick={() => loadTotalQuestions()}>Generate</a>
        </div>
        <div className=" w-25 m-auto h-50 input-group input-group-sm mb-3">

            <div className="input-group-prepend">
                <span className=" mb-3 input-group-text" id="inputGroup-sizing-sm">Exam Name: </span>
            </div>
            <input type="text" id="examName" className=" mb-3 form-control" aria-label="Total Size" required
                aria-describedby="inputGroup-sizing-sm" onChange={(e) => {
                    examName = (e.target.value)
                }}></input>
        </div>


        <div className="input-group mb-3 w-25 m-auto ">
            <div className="input-group-prepend">
                <label className="input-group-text">Month</label>
            </div>
            <select id="month" value={month} onChange={(e)=>setMonth(e.target.value)} className="custom-select" >
                <option value={'Choose'}>Choose...</option>
                {
                    month_names_short.map((val, key) => {
                        return <option key={key} value={val}>{val}</option>
                    })
                }
            </select>
        </div>
        <div className=" w-25 m-auto h-50 input-group input-group-sm mb-3">

            <div className="input-group-prepend">
                <span className=" mb-3 input-group-text" id="inputGroup-sizing-sm">Pass Marks: </span>
            </div>
            <input type="text" id="passquestion" className=" mb-3 form-control" aria-label="passquestion"
                aria-describedby="inputGroup-sizing-sm" ></input>
        </div>
        {(res!=null)?
                <div className="alert alert-dark container h-auto" >
              <h4><label><b>Response :</b> </label>{
                    res
                }</h4>
            </div>:null

        }

        <button className=" mt-2 mb-2 btn btn-primary text-white" onClick={() => saveTest()}>Save Test</button>
        <div className="mt-2 mb-3">  </div>

        {
            (indents != null) ? indents.questions
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


        <button className=" mt-2 mb-2 btn btn-primary text-white" onClick={() => saveTest()}>Save Test</button>
    </div>
}

export default CreateExam;
