import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

type PropsType = {
  placeHolder: string;
  onSubmit: (searchQuery: string) => void;
};

const HomeSearchBar = ({ placeHolder, onSubmit }: PropsType) => {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState(false);
  return (
    <TextField
      error={error}
      value={search}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setError(false);
      }}
      fullWidth
      label={placeHolder}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              color="primary"
              onClick={() => {
                setSearch("");
                setError(false);
              }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                if (!search) return setError(true);
                onSubmit(search);
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

export default HomeSearchBar;
