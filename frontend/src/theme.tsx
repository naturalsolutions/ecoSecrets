import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#8BD3BB',
      main: '#2FA37C',
      dark: '#1D7554',
      contrastText: '#fff',
    },
    secondary: {
      light: '#D7CCC8',
      main: '#BCAAA4',
      dark: '#A1887F',
      contrastText: '#fff',
    },
  },
});

export {theme};