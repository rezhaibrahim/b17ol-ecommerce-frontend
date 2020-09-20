import React from "react";
import HomePage from "./components/homePage";
import AdminPage from "./components/adminPage";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    
   <Router>
     <Switch>
       <Route path="/" component={HomePage} exact />
       <Route path="/admin" component={AdminPage} exact />
     </Switch>
   </Router>
    
  );
}

export default App;
