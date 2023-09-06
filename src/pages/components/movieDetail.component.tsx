import Box from '@mui/material/Box';

import { useMoviesContext } from '../../state/movies/moviesContext';
import { Chip, IconButton, Modal, Paper, Stack, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { environment } from '../../environment';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';

const MovieDetailComponent = () => {
    const { closeMovieDetail, movieDetailOpened, movieDetail: movie, } = useMoviesContext()
    const theme = useTheme()
    if (movie === undefined) return (<></>)


    const { backdrop_path, title, overview, poster_path, release_date, vote_average, genres } = movie


    const MovieDetail = () => (
        <Paper

            sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90vw', sm: '640px', md: '640px', lg: '640px' },
                borderRadius: '10px',
                boxShadow:
                    theme.palette.mode === 'dark'
                        ? 'inset 2px 2px 11px 0px rgb(255 255 255 / 20%), -2px 1px 20px 0px rgb(255 255 255 / 38%), 0px 1px 3px 0px rgb(255 255 255 / 12%)'
                        : 'inset 2px 2px 11px 0px rgb(0 0 0 / 20%), -2px 1px 20px 0px rgb(144 144 144 / 38%), 0px 1px 3px 0px rgb(255 255 255 / 12%)',
                ':focus-visible': {
                    outline: 'none'
                }
            }}
        >

            <Box sx={{
                background: `url(${environment.images}${backdrop_path})`,
                // height: { xs: '480px', sm: '340px' },
                backgroundSize: 'cover',
                borderRadius: '10px',
                backgroundPosition: 'center'

            }}>

                <Stack sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    borderRadius: '10px',
                    // background: theme.palette.mode === 'dark' ? 'linear-gradient(#000000AB, #000000AB)' : 'linear-gradient(#ffffffAB, #ffffffAB)',
                    height: '100%',
                    background: theme.palette.mode === 'dark' ? 'linear-gradient(90deg,#000000, #0000007d)' : 'linear-gradient(269deg,#ffffffab, #ffffffba)',
                }} >

                    <Stack sx={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between'
                    }}>
                        <IconButton onClick={closeMovieDetail}>
                            <CloseIcon />
                        </IconButton>
                        <Stack sx={{
                            flexDirection: 'row'
                        }}>
                            <Typography fontWeight={500} pt={1}>
                                {vote_average.toFixed(1)}
                            </Typography>
                            <StarIcon sx={{
                                color: yellow[500],
                                pr: 1,
                                pt: 1,
                                width: '0.9em'
                            }}>

                            </StarIcon>
                        </Stack>
                    </Stack>


                    <Stack mx={2} mb={3}>

                        <Stack sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            p: { xs: 0, sm: 2 },
                            alignItems: 'center'
                        }}>

                            <Stack sx={{
                                p: 0,
                                m: 0,
                                [theme.breakpoints.only('xs')]: {
                                    justifyContent: 'space-around',
                                    flexDirection: 'row'
                                },
                            }}>
                                <img
                                    src={`${environment.images}${poster_path}`}
                                    width='130px'
                                    alt={title}
                                    style={{
                                        boxShadow:
                                            theme.palette.mode === 'dark'
                                                ? 'inset 2px 2px 11px 0px rgb(255 255 255 / 20%), -2px 1px 20px 0px rgb(255 255 255 / 38%), 0px 1px 3px 0px rgb(255 255 255 / 12%)'
                                                : 'inset 2px 2px 11px 0px rgb(0 0 0 / 20%), -2px 1px 20px 0px rgb(144 144 144 / 38%), 0px 1px 3px 0px rgb(255 255 255 / 12%)'
                                    }} />
                            </Stack>
                            <Box ml={2} pt={1} >
                                <Typography variant='body1' fontWeight={600}  >
                                    {`${title} (${new Date(release_date).getFullYear()})`}
                                </Typography>
                                <Typography variant='body2' fontWeight={400} mt={1}  >
                                    {overview}
                                </Typography>

                                <Stack sx={{
                                    mt: 2,
                                    flexDirection: 'row',
                                    gap: 1,
                                    flexWrap: 'wrap'
                                }}>
                                    {genres.map((genre) => (
                                        <Chip variant="outlined" label={genre.name} key={genre.id} />
                                    ))}



                                </Stack>
                            </Box>


                        </Stack>


                    </Stack>
                </Stack>
            </Box>



        </Paper >
    );

    return (

        <Modal
            sx={{
                '.MuiModal-backdrop': {
                    backgroundColor: 'rgb(0 0 0 / 69%) !important'
                }
            }}

            open={movieDetailOpened}
            onClose={closeMovieDetail}
        >
            {MovieDetail()}
        </Modal>

    );
}

export default MovieDetailComponent

