import Card from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import { useState } from "react";
import queries from "../gqlQueries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const NewPost = () => {
  const [error, setError] = useState("");

  const [addPost] = useMutation(queries.CREATE_POST);

  const history = useHistory();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const errors = [];
    const inputElements = event.target.elements;
    const { url, description, posterName } = inputElements;
    ["url", "description", "posterName"].forEach((attr) => {
      let value = inputElements[attr].value;
      if (!(value && typeof value == "string" && value.trim().length)) {
        errors.push(`${attr} can't be blank!`);
      }
    });

    if (errors.length) {
      setError(errors.join(", "));
    } else {
      try {
        const createdPost = await addPost({
          variables: {
            url: url.value,
            description: description.value,
            posterName: posterName.value,
          },
        });
        if (createdPost) {
          history.push("/my-posts");
        }
      } catch (e) {
        // handle backend errors
        setError(e.message);
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <br />
        <br />
        <Card>
          <CardContent>
            <h1 align="center">Create Post</h1>

            <p style={{ color: "#d50000", fontWeight: "550" }} align="center">
              {error}
            </p>

            <form onSubmit={handleFormSubmit}>
              <label htmlFor="description">
                Description:
                <br />
                <input id="description" name="description" type="text" />
              </label>
              <br />
              <label htmlFor="image-url">
                Image URL:
                <br />
                <input id="image-url" name="url" type="text" />
              </label>
              <br />
              <label htmlFor="author-name">
                Author Name:
                <br />
                <input id="author-name" name="posterName" type="text" />
              </label>
              <div align="center" className="actionButton">
                <button className="buttonStyle">submit</button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default NewPost;
