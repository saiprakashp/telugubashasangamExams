import React from "react";


let createExam = (props) => {
    let totalQue = 0;
    var indents = [];
    const saveTest = () => {

    };
    const loadTotalQuestions = () => {

        var p = [];
        totalQue=(totalQue===0)?5:totalQue;
        for(var i=0;i<totalQue;i++){
            p.push(i);
        }
        p.map(
            (value, index) => {
                indents.push(<div key={index} className="card w-25  p-1 m-auto h-50">
                    <div className="card-body">
                        <div><small className="align-top">{"Q" + index + ") "}</small>
                            <textarea id={"que_" + index} rows="5" cols="40"
                                      className="card-title text-sm-left font-weight-bold "/>
                        </div>
                        <div className="input-group" id="test">
                            <div className="input-group-prepend w-100">
                                <input type="radio" name={"ans_" + index} value={1}
                                       aria-label="Radio button for following text input"></input>
                                <input type="text" id={"ans_" + index + "_1"} className=" ml-2 w-100 form-control"
                                       aria-label="Text input with radio button"
                                ></input>

                            </div>
                            <div className="mt-1 input-group-prepend w-100">
                                <input type="radio" name={"ans_" + index} value={2}
                                       aria-label="Radio button for following text input"></input>
                                <input type="text" id={"ans_" + index + "_2"} className=" ml-2 w-100 form-control"
                                       aria-label="Text input with radio button"
                                ></input>

                            </div>
                            <div className="mt-1 input-group-prepend w-100">
                                <input type="radio" name={"ans_" + index} value={3}
                                       aria-label="Radio button for following text input"></input>
                                <input type="text" id={"ans_" + index + "_3"} className=" ml-2 w-100 form-control"
                                       aria-label="Text input with radio button"
                                ></input>

                            </div>
                            <div className="mt-1 input-group-prepend w-100">
                                <input type="radio" name={"ans_" + index} value={4}
                                       aria-label="Radio button for following text input"></input>
                                <input type="text" id={"ans_" + index + "_4"} className=" ml-2 w-100 form-control"
                                       aria-label="Text input with radio button"
                                ></input>

                            </div>
                            <div className="mt-1 input-group-prepend w-100">
                                <label>Answer: </label>
                                <input type="text" id={"fans_" + index} className=" ml-2 w-100 form-control"
                                       aria-label="Text input with radio button"
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        );
        return indents;
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
        {loadTotalQuestions()}
        <button className=" mt-2 mb-2 btn btn-primary text-white" onClick={() => saveTest()}>Save Test</button>
    </div>
}

export default createExam;