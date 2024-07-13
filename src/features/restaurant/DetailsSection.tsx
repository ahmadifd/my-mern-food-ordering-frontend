import { Box, TextField } from "@mui/material";
import { DetailsType } from "../../types/Restaurant.types";
import { memo } from "react";

type PropsType = {
  details: DetailsType;
  updateDetails: (details: DetailsType) => void;
};

const DetailsSection = ({ details, updateDetails }: PropsType) => {
  //console.log("DetailsSection", details);
  return (
    <Box>
      <Box sx={{ fontWeight: "bold" }}>Details</Box>
      <Box mt={1}>
        <TextField
          value={details.restaurantName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newdetails = { ...details };
            newdetails.restaurantName = event.target.value;
            updateDetails(newdetails);
          }}
          label="Name"
          size="small"
         
        />
      </Box>
      <Box mt={1} sx={{ display: "flex", columnGap: "1em" }}>
        <Box>
          <TextField
            value={details.city}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const newdetails = { ...details };
              newdetails.city = event.target.value;
              updateDetails(newdetails);
            }}
            label="City"
            size="small"
            required
            //error={!name}
          />
        </Box>
        <Box>
          <TextField
            value={details.country}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const newdetails = { ...details };
              newdetails.country = event.target.value;
              updateDetails(newdetails);
            }}
            label="Country"
            size="small"
            required
            //error={!name}
          />
        </Box>
      </Box>
      <Box mt={1}>
        <TextField
          value={details.deliveryPrice}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newdetails = { ...details };
            newdetails.deliveryPrice = event.target.value;
            updateDetails(newdetails);
          }}
          label="Delivery price"
          size="small"
          required
          //error={!name}
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          value={details.estimatedDeliveryTime}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newdetails = { ...details };
            newdetails.estimatedDeliveryTime = event.target.value;
            updateDetails(newdetails);
          }}
          label="Estimated Delivery Time (minutes)"
          size="small"
          required
          //error={!name}
        />
      </Box>
    </Box>
  );
};

const areEqual = (prevProps: PropsType, nextProps: PropsType) => {
  const equal = Object.keys(prevProps.details).every((key) => {
    return (
      prevProps.details[key as keyof DetailsType] ===
      nextProps.details[key as keyof DetailsType]
    );
  });

  return equal;
};

const memoizedDetailsSection = memo(DetailsSection, areEqual);

export default memoizedDetailsSection;
