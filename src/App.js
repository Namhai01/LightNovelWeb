import "./styles/App.css";
import Header from "./Components/Header";
import Book from "./Pages/Book";
import Theodoi from "./Pages/Theodoi";
import Auth from "./Pages/Auth";
import Footer from "./Components/Footer";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import DetailBook from "./Pages/DetailBook";
import MoreBooks from "./Components/MoreBooks";
import Read from "./Pages/Read";
import Editor from "./Pages/Editor";

function App() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <Header />
      <Routes>
        <Route exact path="/" element={<Book />} />
        <Route path="/abc" element={<Editor />} />
        <Route path="/Truyen/theo-doi" element={<Theodoi />} />
        <Route path="/Truyen/" element={<MoreBooks />} />
        <Route path="/Truyen/:ten/:id" element={<DetailBook />} />
        <Route path="/Truyen/:ten/:id/chapter/:chapter" element={<Read />} />
        <Route path="/user/dang-nhap" element={<Auth />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
