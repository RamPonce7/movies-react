import { IMovieDetail, IResponseMovies } from '../interfaces/movies.interface';

import axios from 'axios';
import { environment } from '../environment';

export const getMoviesByPage = (page: number, language: string) => {
    return axios.get<IResponseMovies>(`${environment.url}${environment.popular}`, {
        params: {
            page,
            api_key: environment.key,
            language
        }
    })
}


export const getMovieDetail = (idMovie: number, language: string) => {
    return axios.get<IMovieDetail>(`${environment.url}${environment.detail}${idMovie}`, {
        params: {
            api_key: environment.key,
            language
        }
    })
}

export const getSearchMoviesByPage = (query: string, page: number, language: string) => {
    return axios.get<IResponseMovies>(`${environment.url}${environment.search}`, {
        params: {
            include_adult: false,
            query,
            page,
            api_key: environment.key,
            language
        }
    })
}