import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  header_inner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: "larger",
  },
});
