import Card from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useState } from "react";

const ImagePost = ({ image }) => {
  const [binned, setBinned] = useState(image.binned);

  const handleBin = () => {
    setBinned(!binned);
  };

  return (
    <Grid container key={image.id}>
      <Grid item xs={3}></Grid>
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
            <div align="center" className="actionButton">
              <button className="buttonStyle" onClick={handleBin}>
                {binned ? "remove from bin" : "add to bin"}
              </button>
            </div>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default ImagePost;
