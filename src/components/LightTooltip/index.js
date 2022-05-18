import { Tooltip } from "@mui/material";
import { withStyles } from "@mui/styles";

const LightTooltip = withStyles((theme) => ({
  arrow: {
    color: "#FFF",
  },
  tooltip: {
    backgroundColor: "#FFF",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
    boxShadow: "0px 0px 6px -3px #000",
  },
}))(Tooltip);

export default LightTooltip;
