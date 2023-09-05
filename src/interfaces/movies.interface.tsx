export interface IResponseMovies {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}


export interface IMovieDetail {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: IBelongsToCollection;
    budget: number;
    genres: IGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IBelongsToCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: null;
}

export interface IGenre {
    id: number;
    name: string;
}
