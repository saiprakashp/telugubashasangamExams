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
import App from "../App";
import takeExam from "../exams/takeExam";
import createExam from "../exams/createExam";
import manageExam from "../exams/manageExam";
import manageAssignment from "../assignement/manageAssignemnt";
import userHome from "../users/userHome";
import logOut from "../users/logOut";
import manageUser from "../users/manageUser";


export default function Routes(props) {

    return (
        <Router>
            <div>
                <Switch>

                    <Route exact path="/exam/takeExam/" component={takeExam}>
                    </Route>
                    <LoginValid exact path="/exam/createExam/" componenet={createExam}>
                    </LoginValid>
                    <LoginValid exact path="/exam/manageExam/" componenet={manageExam}>
                    </LoginValid>
                    <LoginValid exact path="/assignemnt/manageAssignment" componenet={manageAssignment}>
                    </LoginValid>
                    <Route exact path="/logOut/" component={logOut}>
                    </Route>
                    <LoginValid exact path="/user/home" componenet={userHome}>
                    </LoginValid>
                    <LoginValid exact path="/user/manage" componenet={manageUser}>
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
      allow=user.loginValid;
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
