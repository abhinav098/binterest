import React from "react";
import { useQuery } from "@apollo/client";
import queries from "../gqlQueries";
import "../App.css";
import ImagePost from "./ImagePost";
import { Link } from "react-router-dom";

const IPostListing = (props) => {
  let query;
  let options;
  const queryFor = props.queryFor;
  let showUpload = false;

  switch (queryFor) {
    case "unsplashImages":
      query = queries.GET_UNSPLASH;
      options = {
        variables: { pageNum: 2 },
      };
      break;
    case "binnedImages":
      query = queries.GET_BINNED;
      break;
    case "userPostedImages":
      query = queries.GET_MY_POSTS;
      showUpload = true;
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
      {data[queryFor].map((image) => (
        <>
          <br />
          <br />
          <ImagePost key={image.id} image={image} />
          <br />
          <br />
        </>
      ))}
    </div>
  );
};

export default IPostListing;
