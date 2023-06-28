import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
//   border:"solid 1px",
//   borderColor:theme.palette.background.dark,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0,0,0,0.8)",
//   '&:hover': {
//     boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0,0,0,0.3)",
//   },
}));

export default DashboardBox;
