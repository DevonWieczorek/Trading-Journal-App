import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#33eb91',
			main: '#00e676',
			dark: '#00a152',
			contrastText: '#fff'
		}
	}
});

function App() {
  return (
      <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
                <MainRoutes />
            </Switch>
          </Router>
      </MuiThemeProvider>
  );
}

export default App;
