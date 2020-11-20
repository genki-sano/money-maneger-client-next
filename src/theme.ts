import { createMuiTheme, Theme } from '@material-ui/core/styles'

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#008ede',
      main: '#029df4',
      light: '#35b1f6',
      contrastText: '#fff',
    },
  },
  spacing: 4,
})
