import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";

function App() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeQuery = (e) => {
    if (e.target.value === "") {
      setSearchResult([]);
    }
    setQuery(e.target.value);
  };
  const initFetch = async () => {
    try {
      if (query) {
        setIsLoading(true);
        let url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
        let response = await axios.get(url);
        setSearchResult(response.data.items);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initFetch();
  }, [query]);

  const displaySearchResult = () => {
    return searchResult.map((item, index) => {
      return <p key={index}>{item.volumeInfo.title}</p>;
    });
  };
  return (
    <>
      <h1>Find a Book</h1>
      {/* <input type="text" value={query} onChange={handleChangeQuery} /> */}
      <DebounceInput
        type="text"
        debounceTimeout={300}
        onChange={handleChangeQuery}
        placeholder="Search book title"
      />
      <br></br>
      {isLoading ? "Loading..." : displaySearchResult()}
    </>
  );
}

export default App;
