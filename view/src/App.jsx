import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#33c9dc',
			main: '#FF5722',
			dark: '#d50000',
			contrastText: '#fff'
		}
	}
});

function App() {
  return (
      <MuiThemeProvider theme={theme}>
          <Router>
              <div>
                 <Switch>
                     <Route exact path="/login" component={Login}/>
                     <Route exact path="/signup" component={SignUp}/>
                     <Route exact path="/" component={Home}/>
                 </Switch>
              </div>
          </Router>
      </MuiThemeProvider>
  );
}

export default App;
