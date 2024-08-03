import { Box, Pagination } from "@mui/material";

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const PaginationSelector = ({ pages, onPageChange }: Props) => {
  return (
    <>
      {pages > 0 && (
        <Box>
          <Pagination
            count={pages}
            onChange={(_event: React.ChangeEvent<unknown>, value: number) => {
              onPageChange(value);
            }}
          />
        </Box>
      )}
    </>
  );
};

export default PaginationSelector;
