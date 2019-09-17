import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {SearchByWord} from "../pages/SearchByWord/SearchByWord";
import {UrlParse} from "../pages/UrlParse/UrlParse";
import {Header} from "../components/Header/Header";

function AppRouter() {
  return (
    <Router>
      <div className={'App'}>
        <Header/>

        <Route path="/" exact component={UrlParse}/>
        <Route path="/byWord/" component={SearchByWord} />
      </div>
    </Router>
  );
}

export default AppRouter;
