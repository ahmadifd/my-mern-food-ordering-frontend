import { IconButton, InputAdornment, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type PropsType = {
  onSubmit: (searchQuery: string) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const SearchBar = ({
  placeHolder,
  onSubmit,
  onReset,
  searchQuery,
}: PropsType) => {
  return (
    <TextField fullWidth
      value={searchQuery}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onSubmit(event.target.value);
      }}
    size="small"
      label={placeHolder}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              color="primary"
              onClick={() => {
                if (onReset) onReset();
              }}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
export default SearchBar;
