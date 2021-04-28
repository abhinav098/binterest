import Card from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const NewPost = () => {
  return (
    <Grid container>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <br />
        <br />
        <Card>
          <CardContent>
            <h1 align="center">Create Post</h1>

            <form action="">
              <label htmlFor="description">
                Description:
                <br />
                <input id="description" type="text" />
              </label>
              <br />
              <label htmlFor="image-url">
                Image URL:
                <br />
                <input id="image-url" type="text" />
              </label>
              <br />
              <label htmlFor="author-name">
                Author Name:
                <br />
                <input id="author-name" type="text" />
              </label>
            </form>
          </CardContent>

          <CardActions style={{ display: "unset" }}>
            <div align="center" className="actionButton">
              <button className="buttonStyle">submit</button>
            </div>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default NewPost;
