import { useQuery, keepPreviousData } from '@tanstack/react-query'
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react'
import css from '../App/App.module.css'
import { fetchMovies } from '../../services/movieService'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { type Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';


function App() {

  const [movieId, setMovieId] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const openModal = (movie: Movie) => { setSelectedMovie(movie) };
  const closeModal = () => { setSelectedMovie(null) };


  
  const { data,  isSuccess, isLoading, isError } = useQuery(
    {
      queryKey: ['movie', movieId, currentPage],
      queryFn: () => fetchMovies(movieId, currentPage),
      enabled: movieId !== '',
      placeholderData: keepPreviousData,
    }
  )

  const movies: Movie[] = data?.results || [];

  const totalPages = data?.total_pages ?? 0;

  const notifyNoMoviesFound = () =>
    toast.error("No movies found for your request.", {
      style: { background: "rgba(125, 183, 255, 0.8)" },
    });
  
  useEffect(() => {
    if (isSuccess && movieId && (data?.results || []).length === 0) {
      notifyNoMoviesFound()
        return;
    }
  }, [isSuccess, data, movieId]);


  const handleSearch = async (newQuery: string)=>{
    setMovieId(newQuery);
    setCurrentPage(1)    
  }
 

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster/>
 
      {movies.length > 0 && totalPages > 1 &&  (<ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
        previousLabel="←"
      />)}
      
      {isLoading && <Loader />}
      {isError && <ErrorMessage/>}
  
      {isSuccess && data?.results.length > 0 && <MovieGrid onSelect={openModal} movies={data.results} />}
      
      
      {selectedMovie!==null && (<MovieModal movie={selectedMovie} onClose={closeModal}/>)}
      
    </>
  )
}

export default App
