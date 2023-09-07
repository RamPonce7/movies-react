import { Grid } from "@mui/material"
import { MovieCardComponent } from "./components"
import { useConfigAppContext } from "../state/configApp";
import { useEffect } from "react";
import { useMoviesContext } from "../state/movies"

export const ListMoviesPage = () => {
    const { movies, loadNextPage } = useMoviesContext()

    const { loading } = useConfigAppContext()

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop <= document.documentElement.offsetHeight - 15 || loading) {
            return;
        }
        loadNextPage()
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadNextPage]);



    return (
        <Grid container spacing={2}>
            {movies.map((movie, index) => (<MovieCardComponent movie={movie} key={index} />))}

        </Grid>

    )
}
