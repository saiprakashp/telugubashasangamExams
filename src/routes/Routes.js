import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import TakeExam from "../exams/TakeExam";
import CreateExam from "../exams/CreateExam";
import ManageExam from "../exams/ManageExam";
import ManageAssignment from "../assignement/ManageAssignment";
import UserHome from "../users/UserHome";
import LogOut from "../users/LogOut";
import ManageUser from "../users/ManageUser";
import ShowTest from "../exams/ShowTest";
import ShowResults from "../exams/ShowResults";


export default function Routes(props) {

    return (
        <Router>
            <div>
                <Switch>

                    <Route   path="/exam/takeExam/" component={TakeExam}>
                    </Route>
                    <LoginValid exact path="/exam/createExam/" componenet={CreateExam}>
                    </LoginValid>
                    <LoginValid exact path="/exam/manageExam/" componenet={ManageExam}>
                    </LoginValid>
                    <LoginValid exact path="/assignemnt/manageAssignment" componenet={ManageAssignment}>
                    </LoginValid>
                    <LoginValid   path="/exam/ShowTest" componenet={ShowTest}>
                    </LoginValid>
                       <Route exact path="/logOut/" component={LogOut}>
                    </Route>
                    <LoginValid exact path="/user/home" componenet={UserHome}>
                    </LoginValid>
                    <LoginValid exact path="/user/manage" componenet={ManageUser}>
                    </LoginValid>
                    <LoginValid exact path="/user/exams/results" componenet={ShowResults}>
                    </LoginValid>
             
                       </Switch>
            </div>
        </Router>
    );
}


function LoginValid(props) {
    let allow=true;
  if (localStorage != null && (localStorage.getItem("user") === null || localStorage.getItem("user") === undefined)) {
      let user= JSON.parse( localStorage.getItem("user"));
      if(user==null)
     {
        allow=false
     } else{
        allow=user.loginValid;
     }
    }
    return (
        <Route
            render={({location}) =>
                allow? (
                <props.componenet/>
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: {from: location}
                    }}
                />
            )
            }
        />
    );
}
