import React from 'react';
import Header from './components/Header'
import Homeform from './components/Homeform'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Postjobs from './components/Postjobs'
import Footer from './components/Footer'
import Faq from './components/Faq'
import Privacy from './components/Privacy'
import Profile from './Profile'
import Featured from './components/Featured'
import PostCompanyEdit from './components/PostCompanyEdit'
import PostjobsEdit from './components/PostjobsEdit'
import Jobdescription from './components/Jobdescription'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'

var App = (props) => {
  return (
    <div className="Apps">
      <BrowserRouter>
        <Header />

        <Switch >
          <Route path='/' exact component={Homeform} />

          <Route path='/chk' component={Homeform} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/postjobs' component={Postjobs} />
          <Route path='/faq' component={Faq} />
          <Route path='/privacy' component={Privacy} />
          <Route path='/profile' component={Profile} />
          <Route path='/featured/:job_id' component={Featured} />
          <Route path='/company/:_id/edit' exact component={PostCompanyEdit} />
          <Route path='/job/:_id' exact component={Jobdescription} />
          <Route path='/job/:_id/edit' component={PostjobsEdit} />
        </Switch>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
