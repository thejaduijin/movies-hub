import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Tending.css";

function Trending() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  console.log(page);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`
    );
    // if (data.status !== 200) {
    //   throw new Error(`HTTP error! status: ${data.status}`);
    // }
    // const response = await data.json();
    console.log("data", data);
    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <>
      <span className="pageTitle">Trending Now</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </>
  );
}

export default Trending;
