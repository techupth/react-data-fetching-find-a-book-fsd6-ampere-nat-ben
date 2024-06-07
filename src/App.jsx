import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [book, setBook] = useState([]);
  const [findBook, setFindBook] = useState("");

  const getBook = async () => {
    try {
      if (findBook !== "") {
        const result = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${findBook}`
        );
        console.log(result);
        setBook(result.data.items);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBook();
  }, [findBook]);

  const Books = () => {
    if (findBook) {
      return book.map((data, index) => (
        <li key={index}>{data.volumeInfo.title}</li>
      ));
    } else {
      return null;
    }
  };

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        placeholder="Enter a book"
        value={findBook}
        onChange={(event) => {
          setFindBook(event.target.value);
        }}
      ></input>
      <ul>{Books()}</ul>
    </div>
  );
}

export default App;
