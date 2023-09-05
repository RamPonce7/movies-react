import { createContext, useContext } from 'react'
import { useMovies } from './useMovies'




const MoviesContext = createContext<ReturnType<typeof useMovies>>(null!)

export const MoviesProvider = ({ children }: any) => {
    const value = useMovies()

    return (
        <MoviesContext.Provider value={value}>
            {children}
        </MoviesContext.Provider>
    )
}

export const useMoviesContext = () => useContext(MoviesContext)