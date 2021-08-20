import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container} from 'react-bootstrap' 
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { CartScreen } from './screens/CartScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { UserListScreen } from './screens/UserListScreen';
import { UserEditScreen } from './screens/UserEditScreen';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <main className= 'py-3'>
          <Container>
            <Route  path='/register/' component={RegisterScreen}/>
            <Route  path='/profile' component={ProfileScreen}/>
            <Route  path='/login/' component={LoginScreen}/>
            <Route  path='/product/:id' component={ProductScreen}/>
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route exact path='/' component={HomeScreen}/>
          </Container>
        </main>
        <Footer />
      
      </div>
    </Router>
  );
}

export default App;
