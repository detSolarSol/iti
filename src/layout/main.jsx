import React from "react";
import { Movies } from "../components/Movies";
import { Search } from "../components/search";
import { Preloader } from "../components/preloader";

class Main extends React.Component {
    state = {
        movies: [],
        loading: true, // Добавляем состояние для отображения загрузки
    };

    componentDidMount() {
        this.fetchMovies("terminator"); // Загружаем фильмы по умолчанию
    }

    fetchMovies = (str) => {
        this.setState({ loading: true }); // Показываем прелоадер перед запросом

        fetch(`http://www.omdbapi.com/?apikey=d05d5499&s=${str}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.Response === "True") {
                    this.setState({ movies: data.Search, loading: false });
                } else {
                    this.setState({ movies: [], loading: false }); // Если фильмы не найдены
                }
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
                this.setState({ loading: false }); // Скрываем прелоадер в случае ошибки
            });
    };

    searchMovies = (str) => {
        if (str.trim() === "") return; // Игнорируем пустые запросы
        this.fetchMovies(str); // Вызываем метод для поиска фильмов
    };

    render() {
        const { movies, loading } = this.state;

        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies} />
                {loading ? (
                    <Preloader />
                ) : movies.length ? (
                    <Movies movies={movies} />
                ) : (
                    <p>No movies found.</p> // Сообщение, если фильмы не найдены
                )}
            </main>
        );
    }
}

export { Main };