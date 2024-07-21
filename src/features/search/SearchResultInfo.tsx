import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <Box>
      <Typography fontWeight="bold" sx={{textWrap:"wrap"}}>
        {total} Restaurants found in {city} &nbsp;
         <Link style={{ fontSize: "0.8rem", fontWeight: "bold" }} to="/">
        Change Location
      </Link>
      </Typography>
     
    </Box>
  );
};

export default SearchResultInfo;
