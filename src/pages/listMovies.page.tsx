import { Box, Grid, useTheme } from "@mui/material"
import { useMoviesContext } from "../state/movies/moviesContext"
import { MovieCardComponent } from "./components/movieCard.component"

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { grey } from "@mui/material/colors";

export const ListMoviesPage = () => {
    const { movies, loadNextPage } = useMoviesContext()
    const theme = useTheme()

    // useEffect(() => {
    //     loadMoviesByPage(page)
    // }, [])


    return (
        <Grid container spacing={2}>
            {movies.map((movie, index) => (<MovieCardComponent movie={movie} key={index} />))}
            <Grid item xs={6} sm={4} md={3} lg={2}
            >
                <Box sx={{
                    boxShadow: theme.shadows[3],
                    height: { xs: '260px', sm: '360px', md: '360px', lg: '320px', xl: '480px' },
                    background: theme.palette.mode === 'dark' ? grey[800] : grey[300],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    ':hover': {
                        background: theme.palette.mode === 'dark' ? grey[700] : grey[400],
                    }
                }}
                    onClick={() => {
                        loadNextPage()
                    }}
                >
                    <AddCircleIcon sx={{
                        color: theme.palette.mode === 'light' ? grey[800] : grey[300],
                        fontSize: 80
                    }} />

                </Box>

            </Grid>
        </Grid>

    )
}
