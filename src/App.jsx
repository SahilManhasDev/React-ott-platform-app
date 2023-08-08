import { useEffect } from "react"
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfigration } from "./store/homeSlice";
import { Home, Explore, Details, PagesNotFound, SearchResult } from './pages/';
import { Header, Footer } from './components/'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home)

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {
        console.log(res);

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }

        dispatch(getApiConfigration(url))
      });
  }

  useEffect(() => {
    fetchApiConfig();
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PagesNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
