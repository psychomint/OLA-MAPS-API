import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetRoute from '../components/GetRoute';
import Maps from '../components/Maps';

const Planner = () => {
    const [Start, setStart] = useState("");
    const [End, setEnd] = useState("");
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [endSuggestions, setEndSuggestions] = useState([]);
    const [debounceTimeoutStart, setDebounceTimeoutStart] = useState(null);
    const [debounceTimeoutEnd, setDebounceTimeoutEnd] = useState(null);
    const [Startpoint, setStartpoint] = useState([]);
    const [Endpoint, setEndpoint] = useState([]);
    const [routeData, setRouteData] = useState(null);

    const FetchData = (input, isStart) => {
        if (input.trim() === "") {
            if (isStart) {
                setStartSuggestions([]);
            } else {
                setEndSuggestions([]);
            }
            return;
        }
    
        axios.get(`https://api.olamaps.io/places/v1/autocomplete?input=${input}&api_key=JyNFwYmODoDUaDywhSgbE0RU7SXRKV6ObU8R3Gy9`)
            .then(response => {
                if (isStart) {
                    setStartSuggestions(response.data.predictions);
                } else {
                    setEndSuggestions(response.data.predictions);
                }
            })
            .catch(error => {
                console.error("Error fetching suggestions:", error);
            });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (Startpoint.length > 0 && Endpoint.length > 0) {
            try {
                const data = await GetRoute(Startpoint, Endpoint);
                setRouteData(data);
            } catch (error) {
                console.error("Error planning route:", error);
            }
        }
    };

    useEffect(() => {
        if (debounceTimeoutStart) {
            clearTimeout(debounceTimeoutStart);
        }

        const newTimeout = setTimeout(() => {
            FetchData(Start, true);
        }, 2000);

        setDebounceTimeoutStart(newTimeout);

        return () => {
            clearTimeout(newTimeout);
        };
    }, [Start]);

    useEffect(() => {
        if (debounceTimeoutEnd) {
            clearTimeout(debounceTimeoutEnd);
        }

        const newTimeout = setTimeout(() => {
            FetchData(End, false);
        }, 1000);

        setDebounceTimeoutEnd(newTimeout);

        return () => {
            clearTimeout(newTimeout);
        };
    }, [End]);

    const onhandleStartChange = (e) => {
        setStart(e.target.value);
    };

    const onhandleEndChange = (e) => {
        setEnd(e.target.value);
    };

    const handleStartSuggestionClick = (post) => {
        setStart(post.description);
        setStartpoint([post]);
        setStartSuggestions([]); // Clear suggestions after selection
    };

    const handleEndSuggestionClick = (post) => {
        setEnd(post.description);
        setEndpoint([post]);
        setEndSuggestions([]); // Clear suggestions after selection
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
            <form onSubmit={handlesubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-lg relative mb-4">
                <div className='mb-6'>
                    <label htmlFor='origin' className='block text-gray-800 font-semibold mb-2 text-lg'>Origin</label>
                    <input
                        id='origin'
                        type="text"
                        placeholder='Enter Your Starting Point'
                        value={Start}
                        onChange={onhandleStartChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition'
                    />
                    {
                        startSuggestions.length > 0 && (
                            <ul className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                {startSuggestions.map((post, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-3 cursor-pointer hover:bg-gray-200 transition"
                                        onClick={() => handleStartSuggestionClick(post)}
                                    >
                                        {post.description}
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                </div>
                <div className='mb-6'>
                    <label htmlFor='destination' className='block text-gray-800 font-semibold mb-2 text-lg'>Destination</label>
                    <input
                        id='destination'
                        type="text"
                        placeholder='Enter Your Destination Point'
                        value={End}
                        onChange={onhandleEndChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition'
                    />
                    {
                        endSuggestions.length > 0 && (
                            <ul className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                {endSuggestions.map((post, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-3 cursor-pointer hover:bg-gray-200 transition"
                                        onClick={() => handleEndSuggestionClick(post)}
                                    >
                                        {post.description}
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                </div>

                <button type="submit" className="w-full bg-indigo-500 text-white py-3 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">Plan Route</button>
            </form>
            {routeData && (
                <div className="w-full max-w-4xl">
                    <Maps routeData={routeData} />
                </div>
            )}
        </div>
    );
};

export default Planner;
