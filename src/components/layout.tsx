import { Backdrop, Box, CircularProgress, Grow, Stack, useTheme } from '@mui/material';
import { ListMoviesPage, SearchMoviesPage } from '../pages';
import { Suspense, useEffect } from 'react';

import { MovieDetailComponent } from '../pages/components';
import ResponsiveAppBar from './ResponsiveAppBar';
import { useConfigAppContext } from '../state/configApp';
import { useMoviesContext } from '../state/movies';

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
            <Box py={2} px={1} sx={{ marginTop: { xs: 7, md: 8 }, flex: 1 }}>
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
