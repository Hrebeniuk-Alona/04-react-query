import axios from "axios"
import { type Movie } from "../types/movie";


interface MovieHttpResponse{
    results: Movie[];
    page: number;
    total_pages: number;
}


export const fetchMovies = async (newQuery:string, page:number) => {
    const response = await axios.get<MovieHttpResponse>('https://api.themoviedb.org/3/search/movie', {
        params: {
            query: newQuery,
            page,
        },
        headers: {
         Accept: 'application/json',
         Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        }
    });

    return response.data;
}



