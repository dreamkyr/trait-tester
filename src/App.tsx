import { Container, CssBaseline } from '@mui/material';

import './App.css';
import './services';
import { ThemeContextProvider } from './contexts';
import { BrowserRouter } from 'react-router-dom';
import { RootNavigator } from './navigators';

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth={false} sx={{ height: '100vh', overflow: 'auto' }}>
          <RootNavigator />
        </Container>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
