import Card from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useState } from "react";
import queries from "../gqlQueries";
import { useMutation } from "@apollo/client";

const ImagePost = ({ image, showDelete }) => {
  const [updatePost] = useMutation(queries.UPDATE_POST);
  const [deletePost] = useMutation(queries.DELETE_POST);
  const [error, setError] = useState("");
  const [binned, setBinned] = useState(image.binned);

  const handleBin = async () => {
    try {
      let binned = !image.binned;
      await updatePost({
        variables: {
          id: image.id,
          url: image.url,
          description: image.description,
          posterName: image.posterName,
          binned,
          userPosted: image.userPosted,
        },
      });
      setBinned(binned);
    } catch (e) {
      setError("Something went wrong..");
    }
  };

  const handleDelete = () => {
    try {
      deletePost({
        variables: {
          id: image.id,
        },
      });
    } catch (e) {
      setError("Something went wrong..");
    }
  };

  return (
    <div key={image.id}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <div style={{ fontWeight: "bold" }}>
                {image.description} by: {image.posterName}
              </div>
            </CardContent>
            <CardMedia
              component="img"
              alt={image.description}
              height="300"
              image={image.url}
              title={image.description}
            />

            <CardActions style={{ display: "unset" }}>
              <div align="center">
                <Grid container>
                  <Grid item xs={showDelete ? 6 : 12}>
                    <button className="buttonStyle" onClick={handleBin}>
                      {binned ? "remove from bin" : "add to bin"}
                    </button>
                  </Grid>
                  {showDelete && (
                    <Grid item xs={4}>
                      <br />
                      <span
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={handleDelete}
                      >
                        Delete this post
                      </span>

                      <p>{error}</p>
                    </Grid>
                  )}
                </Grid>
              </div>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ImagePost;
