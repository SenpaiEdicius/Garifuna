import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import  PrivateRoute  from './componentes/SecureRoutes/SecureRoute';
import { setJWTBearer, setLocalStorage, getLocalStorage, removeLocalStorage } from './componentes/Utilities/Utilities';

import Home from './componentes/Pages/Public/Home/Home';
import Login from './componentes/Pages/Public/Login/Login';
import Courses from './componentes/Pages/Public/Courses/Courses';
import Subscription from './componentes/Pages/Public/Subscription/Subscription';
import Register from './componentes/Pages/Public/Register/Register';
import Signin from './componentes/Pages/Public/SignIn/SignIn';
import Sobre from './componentes/Pages/Public/Sobre/Sobre';

import CreateCourse from './componentes/Pages/Private/Admin/Courses/Create';
import UpdateCourse from './componentes/Pages/Private/Admin/Courses/Update';
import DeleteCourse from './componentes/Pages/Private/Admin/Courses/Delete';
import AddPayment from './componentes/Pages/Private/Admin/Payment/AddPayment';
import UpdatePayment from './componentes/Pages/Private/Admin/Payment/UpdatePayment';
import DeletePayment from './componentes/Pages/Private/Admin/Payment/DeletePayment';
import UpdateUser from './componentes/Pages/Private/User/UpdateUser';
import User from './componentes/Pages/Private/User/User';

class App extends Component{
  constructor(){
    super();
    this.state = {
      user: getLocalStorage('user')||{},
      jwt: getLocalStorage('jwt')||'',
      id: getLocalStorage('id')||'',
      type: getLocalStorage('type')||'',
      isLogged: false
    }
    if(this.state.jwt!==''){
      this.state.isLogged=true;
      setJWTBearer(this.state.jwt);
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  login(user){
    const {jwt, ...fuser} = user;
    this.setState({
      ...this.state,
      isLogged:true,
      user: fuser,
      id: fuser.user._id,
      type:fuser.user.userType,
      jwt: jwt
    });
    setJWTBearer(jwt);
    setLocalStorage('jwt', jwt);
    setLocalStorage('user', fuser);
    setLocalStorage('id', this.state.id);
    setLocalStorage('type',this.state.type)
  }

  logout(){
    removeLocalStorage('jwt');
    removeLocalStorage('user');
    removeLocalStorage('id');
    this.setState({
      ...this.state,
      isLogged:false,
      user:{},
      jwt:''
    });
  }
  render(){
    const auth = {
      isLogged:this.state.isLogged,
      user:this.state.user,
      id: this.state.id,
      type:this.state.type,
      logout: this.logout,
    };
    console.log(this.state.type)
    return (
      <Router>
        <Switch>
          <Route render={(props) => { return (<Home {...props} auth={auth} />) }} path="/" exact />
          <Route render={(props) => { return (<Login {...props} auth={auth} login={this.login} />)}} path="/login" exact/>
          <Route render={(props) => { return (<Signin {...props} auth={auth}/>) }} path="/signin" exact />
          <Route render={(props) => { return (<Courses {...props} auth={auth} />) }} path="/courses" exact/>
          <Route render={(props) => { return (<Subscription {...props} auth={auth} />) }} path="/subscription" exact/>
          <Route render={(props) => { return (<Register {...props} auth={auth}/>) }} path="/register:id" component={Register}  exact/>
          <Route render={(props) => { return (<Sobre {...props} auth={auth} />) }} path="/sobre" exact/>

          <PrivateRoute component={CreateCourse} path="/create" exact auth={auth}/>
          <PrivateRoute component={UpdateCourse} path="/update:id" exact auth={auth}/>
          <PrivateRoute component={DeleteCourse} path="/delete:id" exact auth={auth}/>
          <PrivateRoute component={AddPayment} path="/addpayment" exact auth={auth}/>
          <PrivateRoute component={UpdatePayment} path="/updatepayment:id" exact auth={auth}/>
          <PrivateRoute component={DeletePayment} path="/deletepayment:id" exact auth={auth}/>
          <PrivateRoute component={UpdateUser} path="/updateuser:id" exact auth={auth}/>
          <PrivateRoute component={User} path="/user:id" exact auth={auth}/>
        </Switch>
      </Router>
      );  
  }
}

export default App;
