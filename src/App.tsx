import { Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "pages/Dashboard";
import UserFormEdit from "pages/UserFormEdit";
import UserFormCreate from "pages/UserFormCreate";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "3rem",
    },
  },
  palette: {
    primary: {
      light: "#6e74dc",
      main: "#3849aa",
      dark: "#00227a",
      contrastText: "#fff",
    },
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box className="app" sx={{ background: `${theme.palette.grey[100]}` }}>
          <main>
            <Container maxWidth="md">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/user-form" element={<UserFormCreate />} />
                <Route path="/user-form/:userId" element={<UserFormEdit />} />
              </Routes>
            </Container>
          </main>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
