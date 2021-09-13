import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router';
import { autoLogin } from './components/#store/actions/auth';

import Header from './components/Header/Header';
import Logout from './components/Logout/Logout';
import Login from './pages/Login/Login';
import Products from './pages/Products/Products';
import Search from './pages/Search/Search';



function App() {
  const isLogged = useSelector(store => store.auth.token)
  const dispatch = useDispatch()
  const history = useHistory()
  
  // * autologin
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      dispatch(autoLogin())
      history.push('/products')
    } // eslint-disable-next-line
  }, [])

  
  // * agar login bo'lmagan bo'lsa 
  let routes = (
    <Switch>
      <Route path="/" component={Login} />
    </Switch>
  );

  if(isLogged){
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/search" component={Search} />
        <Route path="/products" component={Products} />
      </Switch>
    )
  }else{
    routes = (
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    )
  }

  return (
    <div>
      <Header isLogin={isLogged}/>
      {routes}
    </div>
  );
}

export default App;
