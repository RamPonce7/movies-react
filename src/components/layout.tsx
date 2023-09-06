
import { Backdrop, Box, CircularProgress, Grow, useTheme, Typography, Stack } from '@mui/material';
// import ResponsiveAppBar from './AppBar.component';
import { Suspense, useEffect } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import { ListMoviesPage } from '../pages/listMovies.page';
import { useConfigAppContext } from '../state/configApp/configAppContext';
import MovieDetailComponent from '../pages/components/movieDetail.component';
import { useMoviesContext } from '../state/movies/moviesContext';
import { SearchMoviesPage } from '../pages/searchMovies.page';

export const Layout = () => {
    const theme = useTheme()
    const { loading } = useConfigAppContext()
    const { isSearching } = useMoviesContext()


    useEffect(() => {
        document.body.style.backgroundColor = theme.palette.mode === 'dark' ? theme.palette.background.default : 'rgb(243,243,243)'
    }, [theme])


    return (
        <Suspense >
            <ResponsiveAppBar />
            <Box p={2} sx={{ marginTop: { xs: 7, md: 8 }, flex: 1 }}>
                {isSearching && (
                    <Grow in={isSearching}>
                        <Stack>
                            <SearchMoviesPage />
                        </Stack>


                    </Grow>

                )}

                {!isSearching && (

                    <ListMoviesPage />




                )}


                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <MovieDetailComponent />
            </Box>

            {/* <Footer /> */}
        </Suspense>

    )
}
