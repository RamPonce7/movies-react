import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { IMovie } from '../../interfaces/movies.interface';
import { environment } from '../../environment';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import { useMoviesContext } from '../../state/movies/moviesContext';

export const MovieCardComponent = ({ movie }: { movie: IMovie }) => {
    const { poster_path, vote_average } = movie
    const theme = useTheme()
    const { openMovieDetail } = useMoviesContext()
    return (
        <Grid item xs={6} sm={4} md={3} lg={2} borderRadius='10px'

            onClick={() => {
                openMovieDetail(movie)
            }}
        >
            <Box sx={{
                height: { xs: '260px', sm: '360px', md: '360px', lg: '320px', xl: '480px' },
                background: `url(${environment.images}${poster_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: theme.shadows[3],
                borderRadius: '10px'

            }}>

                <Stack sx={{

                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    height: '100%',
                    borderRadius: '10px',
                    background: 'linear-gradient(#0000005e, transparent)',
                    cursor: 'pointer',
                    ':hover': {
                        background: 'linear-gradient(#0000008f, transparent)'
                    }
                }}>
                    <Typography fontWeight={400} color={'white'} pt={1}>
                        {vote_average}
                    </Typography>
                    <StarIcon sx={{
                        color: yellow[500],
                        pr: 1,
                        pt: 1
                    }}>

                    </StarIcon>
                </Stack>

            </Box>
        </Grid>

        // <Typography variant='body1' key={index} color="text.primary">
        //     {title}
        // </Typography>

    )
}
