import { useEffect, useState } from 'react'
import { useLangContext } from '../lang/langContext'
import { getMovieDetail, getMoviesByPage, getSearchMoviesByPage } from '../../services/movies.service';
import { IMovie, IMovieDetail } from '../../interfaces/movies.interface';
import { useConfigAppContext } from '../configApp/configAppContext';



export const useMovies = () => {
    const { setLoading } = useConfigAppContext()
    const { lang } = useLangContext()
    const [movies, setMovies] = useState<IMovie[]>([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        setLoading(true)
        const loadInOtherLang = async () => {
            let newMovies: IMovie[] = []
            for (let index = 1; index <= page; index++) {
                const { data } = await getMoviesByPage(index, lang === 'ENG' ? 'en-US' : 'es-MX')
                newMovies = [...newMovies, ...data.results]
            }
            setLoading(false)
            setMovies(newMovies)
        }
        loadInOtherLang()

    }, [lang])

    const loadNextPage = async () => {
        setPage(page + 1)
        await loadMoviesByPage(page + 1)
    }



    const loadMoviesByPage = async (loadPage: number) => {
        setLoading(true)
        const { data } = await getMoviesByPage(loadPage, lang === 'ENG' ? 'en-US' : 'es-MX')

        if (loadPage === 1) {
            setMovies(data.results)
        } else {
            setMovies([...movies, ...data.results])
        }

        setLoading(false)
    }



    //Movie Detail State


    const [movieDetailOpened, setMovieDetailOpened] = useState(false);

    const [currentMovie, setCurrentMovie] = useState<IMovie>()
    const [movieDetail, setMovieDetail] = useState<IMovieDetail>()

    const openMovieDetail = (movie: IMovie) => {
        setCurrentMovie(movie)
    }

    const closeMovieDetail = () => {
        setCurrentMovie(undefined)
        setMovieDetailOpened(false)
    }

    useEffect(() => {
        setLoading(true)
        if (currentMovie) {
            getMovieDetail(currentMovie.id, lang === 'ENG' ? 'en-US' : 'es-MX')
                .then(({ data }) => {
                    setMovieDetail(data)
                    setMovieDetailOpened(true)
                }).finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [currentMovie])


    // Search Movies
    const [pageSearching, setPageSearching] = useState(1)
    const [isSearching, setIsSearching] = useState(false)
    const [patternSearching, setPatternSearching] = useState('')
    const [moviesSearching, setMoviesSearching] = useState<IMovie[]>([])
    const [maxPagesSearching, setMaxPagesSearching] = useState(1)

    const loadNextPageSearching = async () => {
        setPageSearching(pageSearching + 1)
        await searchMoviesByPage(patternSearching, pageSearching + 1)
    }

    const startSearching = (pattern: string) => {
        setIsSearching(true)
        setPatternSearching(pattern)
        setPageSearching(1)
        searchMoviesByPage(pattern, 1)
    };

    const stopSearching = () => {
        setPatternSearching('')
        setIsSearching(false)
    };


    useEffect(() => {
        setLoading(true)
        const searchInOtherLang = async () => {
            let newMovies: IMovie[] = []
            for (let index = 1; index <= pageSearching; index++) {
                const { data } = await getSearchMoviesByPage(patternSearching, index, lang === 'ENG' ? 'en-US' : 'es-MX')
                newMovies = [...newMovies, ...data.results]
            }
            setLoading(false)
            setMoviesSearching(newMovies)
        }
        if (isSearching) {
            searchInOtherLang()
        }


    }, [lang])



    const searchMoviesByPage = async (pattern: string, loadPage: number) => {
        setLoading(true)
        const { data } = await getSearchMoviesByPage(pattern, loadPage, lang === 'ENG' ? 'en-US' : 'es-MX')
        setMaxPagesSearching(data.total_pages)
        if (loadPage === 1) {
            setMoviesSearching(data.results)
        } else {
            setMoviesSearching([...moviesSearching, ...data.results])
        }

        setLoading(false)
    }



    return {
        page,
        movies,
        setPage,
        movieDetailOpened,
        movie: currentMovie,
        openMovieDetail,
        closeMovieDetail,
        movieDetail,
        loadNextPage,
        isSearching,
        setIsSearching,
        patternSearching,
        setPatternSearching,
        startSearching,
        stopSearching,
        moviesSearching,
        loadNextPageSearching,
        onMaxPage: maxPagesSearching === pageSearching
    }
}
