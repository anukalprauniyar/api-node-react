
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {

  const [data,setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData , setFilteredData] = useState([]);
  const [debouncing , setDebouncing] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api');
        const responseData = response.data;
        console.log(responseData);
        setData(responseData);
        setFilteredData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    clearTimeout(debouncing);

    const timer = setTimeout(()=> {
      const result = data.filter(item => item.title.includes(searchValue));
      setFilteredData(result);
    }, 5000);

    setDebouncing(timer);
  }
  
  return (
    <div className='container'>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />

      {data ? 
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
      : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
