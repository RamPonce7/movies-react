import { useEffect, useState } from 'react'
import { useLangContext } from '../lang/langContext'
import { getMovieDetail, getMoviesByPage } from '../../services/movies.service';
import { IMovie, IMovieDetail } from '../../interfaces/movies.interface';
import { useConfigAppContext } from '../configApp/configAppContext';



export const useMovies = () => {
    const { setLoading } = useConfigAppContext()
    const { lang } = useLangContext()
    const [movies, setMovies] = useState<IMovie[]>([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const loadInOtherLang = async () => {
            let newMovies: IMovie[] = []
            for (let index = 1; index <= page; index++) {
                const { data } = await getMoviesByPage(index, lang === 'ENG' ? 'en-US' : 'es-MX')
                newMovies = [...newMovies, ...data.results]
            }
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



    return { page, movies, setPage, movieDetailOpened, movie: currentMovie, openMovieDetail, closeMovieDetail, movieDetail, loadNextPage }
}
