import { Grid } from "@mui/material"
import { useMoviesContext } from "../state/movies/moviesContext"
import { MovieCardComponent } from "./components/movieCard.component"

import { useEffect } from "react";
import { useConfigAppContext } from "../state/configApp/configAppContext";

export const SearchMoviesPage = () => {
    const { moviesSearching: movies, loadNextPageSearching: loadNextPage, onMaxPage } = useMoviesContext()
    const { loading } = useConfigAppContext()

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
        <Grid container spacing={2}>
            {movies.map((movie, index) => (<MovieCardComponent movie={movie} key={index} />))}


        </Grid>

    )
}
