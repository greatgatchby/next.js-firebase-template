import '../styles/globals.css'
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import initAuth from '../functions/initAuth'
import {withAuthUser} from "next-firebase-auth"; // the module you created above

initAuth()
const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#161616',
    },
    secondary: {
      main: '#f5009f',
      color: '#161616',
    },
    error: {
      main: '#ff1100',
    },
  },
})
function MyApp({ Component, pageProps }) {
  return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
  )
}

export default withAuthUser()(MyApp)
