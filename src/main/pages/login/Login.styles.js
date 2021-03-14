import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: "bold",
    // padding: "30px",
    // background: "yellow",
    height: "100vh",
  },
  heading: {
    fontWeight: "bold",
    padding: "30px",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // minHeight: "90vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#1e88e5",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1e88e5",
  },
  footer: {
    marginTop: "auto",
  },
}));

export { useStyles };
