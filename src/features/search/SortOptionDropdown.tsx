import { MenuItem, TextField } from "@mui/material";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated delivery time",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
  return (
    <TextField
      inputProps={{ sx: { fontSize: "0.9rem" } }}
      InputLabelProps={{ sx: { fontSize: "0.9rem" } }}
      label="Sort by:"
      select
      fullWidth
      size="small"
      value={sortOption}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange(value);
      }}
      //error={!roles.length}
    >
      {Object.values(SORT_OPTIONS).map((item, index) => (
        <MenuItem sx={{ fontSize: "0.9rem" }} key={index} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SortOptionDropdown;
