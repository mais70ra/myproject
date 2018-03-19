import { createMuiTheme } from 'material-ui/styles';
import { grey, pink } from 'material-ui/colors';
// lightBlue, lightGreen
const theme = createMuiTheme({
  palette: {
    primary: {
      500: '#4096fd',
      main: '#4096fd'
    },
    secondary: {
      main: pink.A200
    }
  },
  custom: {
    contentBox: {
      container: {
        background: 'white',
        border: `1px solid ${grey[300]}`,
        paddingBottom: 16
      },
      titleBox: {
        background: grey[50],
        color: 'black',
        borderBottom: `1px solid ${grey[300]}`
      },
      title: {
        color: grey[600]
      }
    },
    login: {
      title: {
        color: grey[600]
      }
    }
  },
  overrides: {
    MuiButton: {
      raisedSecondary: {
        borderRadius: 5,
        boxShadow: 'none'
      },
      raisedPrimary: {
        borderRadius: 5,
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none'
        }
      }
    }
  }
});

export default theme;
