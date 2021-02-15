import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';

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
            <Switch>
                <MainRoutes />
            </Switch>
          </Router>
      </MuiThemeProvider>
  );
}

export default App;
