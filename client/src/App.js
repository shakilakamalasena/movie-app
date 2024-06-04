import { useEffect, useState } from "react";
import "./App.css";
import api from "./api/axiosConfig";

function App() {
    const [movies, setMovies] = useState();

    const getMovies = async () => {
        try {
            const response = await api.get(
                "http://localhost:8080/apis/v1/movies"
            );

            console.log(response.data);

            setMovies(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    return <div className="App"></div>;
}

export default App;