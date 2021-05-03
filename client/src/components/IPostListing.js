import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import queries from "../gqlQueries";
import "../App.css";
import ImagePost from "./ImagePost";
import { Link } from "react-router-dom";

const IPostListing = (props) => {
  let query;
  let options;
  const [page, setPage] = useState(1);
  const queryFor = props.queryFor;
  let showUpload = false;

  switch (queryFor) {
    case "unsplashImages":
      query = queries.GET_UNSPLASH;
      options = {
        variables: { pageNum: page },
        fetchPolicy: "cache-and-network",
      };
      break;
    case "binnedImages":
      query = queries.GET_BINNED;
      options = {
        pollInterval: 300,
        fetchPolicy: "cache-and-network",
      };
      break;
    case "userPostedImages":
      query = queries.GET_MY_POSTS;
      showUpload = true;
      options = {
        pollInterval: 300,
        fetchPolicy: "cache-and-network",
      };
      break;
    default:
      break;
  }

  const { loading, error, data } = useQuery(query, options);

  if (loading) return <h1 align="center">Loading...</h1>;
  if (error) return <h1>Error! {error.message}</h1>;

  return (
    <div id={"iPosts-" + queryFor}>
      <br />
      {showUpload && (
        <div align="center">
          <Link to="/new-post">
            <button className="buttonStyle">Upload a Post</button>
          </Link>
        </div>
      )}

      {page > 1 && queryFor === "unsplashImages" && (
        <div align="center">
          <span className="spanLink" onClick={() => setPage(page - 1)}>
            Go Back to page {page - 1}
          </span>
          <br />
        </div>
      )}

      {data[queryFor] && data[queryFor].length ? (
        data[queryFor].map((image) => (
          <div className="image-post" key={image.id}>
            <br />
            <br />
            <ImagePost image={image} showDelete={showUpload} />
            <br />
            <br />
          </div>
        ))
      ) : (
        <h1 align="center">No Images yet</h1>
      )}

      {queryFor === "unsplashImages" && (
        <div align="center">
          <button onClick={() => setPage(page + 1)} className="buttonStyle">
            Get More Posts
          </button>
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default IPostListing;
