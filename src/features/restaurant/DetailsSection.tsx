import { Box, TextField } from "@mui/material";
import { DetailsType } from "../../types/Restaurant.types";
import { memo } from "react";

type PropsType = {
  details: DetailsType;
  setDetails: React.Dispatch<React.SetStateAction<DetailsType>>;
};

const DetailsSection = ({ details, setDetails }: PropsType) => {
  console.log("DetailsSection");
  return (
    <Box>
      <Box sx={{ fontWeight: "bold" }}>Details</Box>
      <Box mt={1}>
        <TextField
          value={details.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newdetails = { ...details };
            newdetails.name = event.target.value;
            setDetails(newdetails);
          }}
          label="Name"
          size="small"
          required
        />
      </Box>
      <Box mt={1} sx={{ display: "flex", columnGap: "1em" }}>
        <Box>
          <TextField
            value={details.city}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const newdetails = { ...details };
              newdetails.city = event.target.value;
              setDetails(newdetails);
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
              setDetails(newdetails);
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
            setDetails(newdetails);
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
            setDetails(newdetails);
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

const areEqual = (prevProps:PropsType, nextProps : PropsType) => {
  return prevProps.details.name === nextProps.details.name 
  && prevProps.details.city === nextProps.details.city
  && prevProps.details.country === nextProps.details.country
  && prevProps.details.deliveryPrice === nextProps.details.deliveryPrice
  && prevProps.details.estimatedDeliveryTime === nextProps.details.estimatedDeliveryTime
}


const memoizedDetailsSection = memo(DetailsSection, areEqual)

export default memoizedDetailsSection;



