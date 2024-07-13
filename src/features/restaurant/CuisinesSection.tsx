import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { cuisineList } from "../../config/cuisineList";
import { memo } from "react";

type PropsType = {
  cuisines: string[];
  updateCuisines: (cuisines: string[]) => void;
};

const CuisinesSection = ({ cuisines, updateCuisines }: PropsType) => {
  //console.log("CuisinesSection", cuisines);
  return (
    <Box mt={2}>
      <hr />
      <Box mt={1} sx={{ fontWeight: "bold" }}>
        Cuisines
      </Box>
      <Box sx={{ display: "flex" }}>
        <FormControl>
          <FormGroup row>
            {cuisineList.map((cuisineItem, index) => (
              <FormControlLabel
                sx={{ minWidth: "150px" }}
                key={index}
                control={
                  <Checkbox
                    size="small"
                    checked={cuisines.includes(cuisineItem)}
                    value={cuisineItem}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const index = cuisines.indexOf(event.target.value);
                      if (index === -1) {
                        const newcuisines = [...cuisines, event.target.value];
                        updateCuisines(newcuisines);
                      } else {
                        const newcuisines = cuisines.filter(
                          (cuisine) => cuisine !== event.target.value
                        );
                        updateCuisines(newcuisines);
                      }
                    }}
                  />
                }
                label={cuisineItem}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

const areEqual = (prevProps: PropsType, nextProps: PropsType) => {
  return (
    prevProps.cuisines.length === nextProps.cuisines.length &&
    prevProps.cuisines.every(
      (item, index) => item === nextProps.cuisines[index]
    )
  );
};

const memoizedCuisinesSection = memo(CuisinesSection, areEqual);

export default memoizedCuisinesSection;
