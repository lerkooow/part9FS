import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/diaries');
        setDiaries(response.data);
      } catch (error) {
        console.error('Error fetching diaries:', error);
      }
    };

    fetchDiaries();
  }, []);

  return (
    <div>
      <h1>Diary App</h1>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <p>Date: {diary.date}</p>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
