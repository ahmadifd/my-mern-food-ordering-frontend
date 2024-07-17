import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
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
  const [error, setError] = useState(false);
  return (
    <TextField fullWidth
      error={error}
      value={searchQuery}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onSubmit(event.target.value);
        setError(false);
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
                setError(false);
              }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                if (!searchQuery) return setError(true);
                onSubmit(searchQuery);
              }}
              edge="end"
              color="primary"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
export default SearchBar;
