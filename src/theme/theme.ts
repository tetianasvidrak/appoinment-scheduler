import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Comfortaa', cursive",
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          maxHeight: 200,
          overflowY: "auto",
          padding: "8px",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#bbb",
            borderRadius: "6px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#999",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#bbb transparent",
        },
      },
    },
  },
});

export default theme;
