import { Button, Grid, Stack, Typography } from "@mui/material"
import { useMoviesContext } from "../state/movies/moviesContext"
import { MovieCardComponent } from "./components/movieCard.component"

import { useEffect } from "react";
import { useConfigAppContext } from "../state/configApp/configAppContext";
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import { useLangContext } from "../state/lang/langContext";
import { grey } from "@mui/material/colors";

export const SearchMoviesPage = () => {
    const { moviesSearching: movies, loadNextPageSearching: loadNextPage, onMaxPage, stopSearching, setPatternToSearch } = useMoviesContext()
    const { loading } = useConfigAppContext()
    const { w } = useLangContext()

    const handleScroll = () => {

        if (window.innerHeight + document.documentElement.scrollTop <= document.documentElement.offsetHeight - 15 || loading) {
            return;
        }
        if (!onMaxPage) {
            loadNextPage()
        }

    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadNextPage]);


    return (
        <>
            {movies.length > 0 && (
                <Grid container spacing={2}>
                    {movies.map((movie, index) => (<MovieCardComponent movie={movie} key={index} />))}
                </Grid>)}

            {movies.length === 0 && !loading && (
                <Stack sx={{
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    flexGrow: 1,
                    justifyContent: 'center',
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    gap: 1
                }}>

                    <TheaterComedyIcon sx={{
                        color: grey[400],
                        fontSize: '5rem'
                    }} />

                    <Typography variant="h5" color='text.primary'>
                        {w('noResults')}
                    </Typography>
                    <Button variant="text" onClick={() => {
                        stopSearching()
                        setPatternToSearch('')
                    }}>{w('goBack')}</Button>

                </Stack>
            )
            }
        </>

    )
}
