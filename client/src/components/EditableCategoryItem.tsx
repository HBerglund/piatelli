import {
  Box,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";

import ClearIcon from "@material-ui/icons/Clear";
interface Props {
  name: string;
  deleteCategory: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: "8px",
    padding: "1rem 1.5rem 0 0",
    marginRight: "0.5rem",
  },
  remove: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

function EditableCategoryItem(props: Props) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1">{props.name}</Typography>
      <Tooltip className={classes.remove} title="Delete category">
        <IconButton onClick={props.deleteCategory} size="small">
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default EditableCategoryItem;
