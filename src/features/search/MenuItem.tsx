import { MenuType } from "../../types/Menu.types";
import { Box, Card, CardContent, CardHeader } from "@mui/material";

type Props = {
  menuItem: MenuType;
  addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Box mt={1}>
      <Card>
        <CardHeader title={menuItem.name} />
        <CardContent>£{menuItem.price.toString()}</CardContent>
      </Card>
    </Box>
  );
};

export default MenuItem;
