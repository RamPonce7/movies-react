import { useRoutes } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";
import { useMemo } from "react";

import { createTheme } from "@mui/material";
import { useConfigAppContext } from "./state/configApp/configAppContext";
import { Layout } from "./components";

const MoviesRouter = () => {
    const { typeTheme } = useConfigAppContext()
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: typeTheme === 'D' ? 'dark' : 'light',
                    primary: {
                        main: '#b71c1c',
                    },
                    secondary: {
                        main: '#f50057',
                    },
                },
            }),
        [typeTheme],
    );
    const routes = useRoutes([
        {
            path: '/projects/movies_react/',
            element: (
                <ThemeProvider theme={theme}>
                    <Layout />
                </ThemeProvider>
            ),
        }

    ]);
    return routes
}

export default MoviesRouter
