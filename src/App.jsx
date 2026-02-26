import React, {useState, useEffect} from 'react';
import Search from './components/Search.jsx';
import Spinner from "./components/Spinner.jsx";
import WorkoutCard from './components/WorkoutCard.jsx';

const API_BASE_URL = 'https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/';
const API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': API_KEY,
    }
}

const App = () => {
    const [search, setSearch] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [workoutCatgList, setWorkoutCatgList] = useState([]);

    const fetchWorkoutTypes = async (query = '') => {
        setLoading(true);
        setErrorMsg('');
        try {
            const endpoint = query ? `${API_BASE_URL}api/v1/exercises/search?search=${query}` : `${API_BASE_URL}api/v1/exercisetypes`;
            const response = await fetch(endpoint, API_OPTIONS);

            if(!response.ok) {
                throw new Error('Failed to fetch workouts');
            }

            const data = await response.json();
            if(data.success === false || data.message) {
                setErrorMsg(data.message || "Unable to retrieve data.");
                setWorkoutCatgList([]);
            }
            setWorkoutCatgList(data.data);
        } catch (error) {
            setErrorMsg('Error fetching workouts. Please try again later');
        } finally {
            setLoading(false);
        }
    }
    useEffect( () => {
        fetchWorkoutTypes(search);
    },[search]);

    return (
        <main className="relative">
            <header>
                <div className="absolute bg-gym-bg min-w-screen min-h-screen bg-cover bg-center -z-10" />
                <div className="absolute min-h-screen min-w-screen inset-0 bg-black/75 z-0"/>
                <div className="relative z-10 flex flex-col items-center p-5">
                    <img src="./gympt_logo.png" alt="gympt logo" className="w-36"/>
                    <h1>Your <span className="text-gradient">fitness</span> journey starts here</h1>
                </div>
                <div className="relative px-6">
                    <Search search={search} setSearch={setSearch} />
                </div>
            </header>

            <section className="relative z-10 flex flex-col items-center">
                <h2 className="mb-6 mt-10 text-3xl">🎯Workouts</h2>
                {loading ? (<Spinner />) : errorMsg ? (<p className="text-red-500">{errorMsg}</p>) : (
                    <ul className="text-white grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4;">
                        {workoutCatgList.map((catg) =>
                            <WorkoutCard key={catg.name} category={catg} />
                        )}
                    </ul>
                ) }
            </section>

            <footer className="relative z-10 bg-light/50 text-white mt-20">
                <div className="w-full mx-auto px-6 py-4 text-center text-sm text-white">
                    © 2026 GymPT ❤️ Jash
                </div>
            </footer>
        </main>
    )
}

export default App;