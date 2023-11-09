import { ThemeProvider, createTheme,responsiveFontSizes } from '@mui/material/styles';


const TemaGlobals = createTheme({
    palette: {
      primary: {
        main:'#022162'//#6200ea'
      },
      textColorTitle:"#424242",
      textColorTitle2:"#eeeeee",
      backgroundColorPage:"#f5f5f5",
      principalColor:'#022162',//"#6200ea",
      azul:"#2962ff"
      
    },
});

export const TemaGlobal = responsiveFontSizes(TemaGlobals)