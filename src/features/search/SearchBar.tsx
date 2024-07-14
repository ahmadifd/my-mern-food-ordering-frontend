import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

type PropsType = {
  placeHolder: string;
  onSubmit: (searchQuery: string) => void;
};

const SearchBar = ({ placeHolder, onSubmit }: PropsType) => {
  const [search, setSearch] = useState<string>("");

  return (
    <TextField
      value={search}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
      }}
      sx={{ minWidth: "80vw" }}
      label={placeHolder}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              color="primary"
              onClick={() => {
                setSearch("");
              }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                onSubmit("search");
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
