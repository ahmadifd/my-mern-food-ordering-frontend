import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { cuisineList } from "../../config/cuisineList";
import CheckIcon from "@mui/icons-material/Check";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  return (
    <Box>
      <Box
        sx={{
          fontSize: "0.8rem",
          fontWeight: "bold",
          display: "flex",
          textWrap: "nowrap",
          alignItems: "center",
        }}
        columnGap={3}
      >
        <Box>Filter By Cuisine</Box>
        <Box
          sx={{
            marginLeft: "auto",
          }}
        >
          <Button
            onClick={() => onChange([])}
            disableElevation
            sx={{
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
          >
            Reset Filters
          </Button>
        </Box>
      </Box>
      <Box>
        <List sx={{ minWidth: "200px" }}>
          {cuisineList
            .slice(0, isExpanded ? cuisineList.length : 7)
            .map((cuisineItem, index) => (
              <ListItem 
                key={index}
                disablePadding
                sx={{
                  border:
                    selectedCuisines.indexOf(cuisineItem) === -1
                      ? "1px solid #bdbdbd"
                      : "1px solid",
                  borderColor:
                    selectedCuisines.indexOf(cuisineItem) !== -1
                      ? "success.light"
                      : "",
                  marginBottom: "5px",
                }}
              >
                <ListItemButton
                  onClick={() => {
                    const currentIndex = selectedCuisines.indexOf(cuisineItem);
                    const newChecked = [...selectedCuisines];
                    if (currentIndex === -1) {
                      newChecked.push(cuisineItem);
                    } else {
                      newChecked.splice(currentIndex, 1);
                    }
                    onChange(newChecked);
                  }}
                >
                  {selectedCuisines.indexOf(cuisineItem) !== -1 && (
                    <CheckIcon color="success" />
                  )}

                  <ListItemText
                    primary={cuisineItem}
                    primaryTypographyProps={{
                      color:
                        selectedCuisines.indexOf(cuisineItem) !== -1
                          ? "success.main"
                          : "",
                      fontWeight: "bold",
             
                      fontSize:"0.8rem"
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>

      <Box sx={{ display: "grid", justifyContent: "center" }}>
        <Button
          onClick={onExpandedClick}
          variant="text"
          size="small"
          endIcon={
            isExpanded ? (
              <>
                Viwe Less
                <ExpandLessIcon />
              </>
            ) : (
              <>
                View More
                <ExpandMoreIcon />
              </>
            )
          }
        ></Button>
      </Box>
    </Box>
  );
};

export default CuisineFilter;
