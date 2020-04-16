import React from 'react';
import Header from './components/Header'
import Homeform from './components/Homefrom'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Postjobs from './components/Postjobs'
import Footer from './components/Footer'
import Faq from './components/Faq'
import Privacy from './components/Privacy'
import Profile from './Profile'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

var App=(props)=> {
  return (
    <div className="Apps">
      <BrowserRouter>
      <Header/>
      
      <Switch >
            <Route path='/' exact component={Homeform} />
            <Route path='/chk' exact component={Homeform} />
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            <Route path='/postjobs' component={Postjobs} />
            <Route path='/faq' component={Faq} />
            <Route path='/privacy' component={Privacy} />
            <Route path='/profile' component={Profile} />
        </Switch>
      <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
