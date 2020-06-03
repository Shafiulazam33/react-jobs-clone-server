import React, { useEffect } from 'react';
import Header from './components/Header'
import Homeform from './components/Homeform'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Admin from './components/Admin'
import Postjobs from './components/Postjobs'
import Footer from './components/Footer'
import Faq from './components/Faq'
import Privacy from './components/Privacy'
import Profile from './Profile'
import Featured from './components/Featured'
import PostCompanyEdit from './components/PostCompanyEdit'
import PostjobsEdit from './components/PostjobsEdit'
import Jobdescription from './components/Jobdescription'
import Adv from './components/Adv'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import ReactGA from 'react-ga';
import './App.css'
var App = () => {
  console.log("abuk2")
  useEffect(() => {
    console.log("abuk")
    ReactGA.initialize('UA-167933617-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <div className="Apps">
      <BrowserRouter>
        <Header />

        <Switch >
          <Route path='/' exact component={Homeform} />

          <Route path='/chk' component={Homeform} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/admin' component={Admin} />
          <Route path='/postjobs' component={Postjobs} />
          <Route path='/faq' component={Faq} />
          <Route path='/privacy' component={Privacy} />
          <Route path='/profile' component={Profile} />
          <Route path='/featured/:job_id' component={Featured} />
          <Route path='/company/:_id/edit' exact component={PostCompanyEdit} />
          <Route path='/job/:_id' exact component={Jobdescription} />
          <Route path='/job/:_id/edit' component={PostjobsEdit} />
          <Route path='/adv' component={Adv} />
        </Switch>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
