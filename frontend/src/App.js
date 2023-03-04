import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import About from './components/About';
import Users from './components/Users';
import Navbar from './components/Navbar';

function App() {
  return (
    
   <div>
     <Router>
       <Navbar></Navbar>
       <div className="container p-4">
         <Switch>
            <Route path='/about' component={About}></Route>
            <Route path='/' component={Users}></Route>
         </Switch>
       </div>
     </Router>
    
     </div>
  );
}

export default App;
