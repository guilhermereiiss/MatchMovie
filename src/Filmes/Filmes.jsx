import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { adicionarFavorito, removerFavorito, obterFavoritos } from '../components/Favoritar/FavoritarFunc';
import './FilmesGerais.css';

export default function FilmesGerais() {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const apiKey = "12374ecb147586c8d10ec01440db879d";

    
    const getFilmesESeries = async () => {
        try {
            const [filmesResponse, seriesResponse] = await Promise.all([
                axios.get("https://api.themoviedb.org/3/discover/movie", {
                    params: {
                        language: "pt-BR",
                        api_key: apiKey,
                    },
                }),
                axios.get("https://api.themoviedb.org/3/discover/tv", {
                    params: {
                        language: "pt-BR",
                        api_key: apiKey,
                    },
                }),
            ]);

            setMovies(filmesResponse.data.results);
            setSeries(seriesResponse.data.results);
        } catch (error) {
            console.error("Erro ao buscar filmes e séries:", error);
        }
    };

    useEffect(() => {
        getFilmesESeries();
        setFavoritos(obterFavoritos());
    }, []);


    const handleFavoritar = (id) => {
        if (favoritos.includes(id)) {
            removerFavorito(id);
            setFavoritos(prev => prev.filter(favorito => favorito !== id));
        } else {
            adicionarFavorito(id);
            setFavoritos(prev => [...prev, id]);
        }
    };

    return (
        <div className="movie-container">
            {movies.map((movie) => (
                <div key={`movie-${movie.id}`}>
                    <Link to={`/MatchMovie/detalhes/${movie.id}`}>
                        <div className="movie-card">
                            <img
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : "https://via.placeholder.com/500x750?text=Imagem+Indisponível"
                                }
                                alt={movie.title}
                                className="movie-poster"
                            />
                            <div className="movie-info">
                                <h2>{movie.title}</h2>
                                <p>Nota: {movie.vote_average}</p>
                                <p>Data de lançamento: {new Date(movie.release_date).toLocaleDateString()}</p>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleFavoritar(movie.id);
                                }}>
                                    {favoritos.includes(movie.id) ? 'Remover Favorito' : 'Favoritar'}
                                </button>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
            {series.map((serie) => (
                <div key={`serie-${serie.id}`}>
                    <Link to={`/MatchMovie/detalhes/${serie.id}`}>
                        <div className="movie-card">
                            <img
                                src={
                                    serie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                                        : "https://via.placeholder.com/500x750?text=Imagem+Indisponível"
                                }
                                alt={serie.name}
                                className="movie-poster"
                            />
                            <div className="movie-info">
                                <h2>{serie.name}</h2>
                                <p>Nota: {serie.vote_average}</p>
                                <p>Data de lançamento: {new Date(serie.first_air_date).toLocaleDateString()}</p>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleFavoritar(serie.id);
                                }}>
                                    {favoritos.includes(serie.id) ? 'Remover Favorito' : 'Favoritar'}
                                </button>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
