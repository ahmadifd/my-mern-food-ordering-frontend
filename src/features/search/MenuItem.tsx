import { MenuItem as MenuItemType} from "../../types/MenuItem.types";
import { Box, Card, CardContent, CardHeader } from "@mui/material";

type Props = {
  menuItem: MenuItemType;
  addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Box mt={1}>
      <Card onClick={addToCart} sx={{ cursor: "pointer" }}>
        <CardHeader title={menuItem.name} />
        <CardContent>{menuItem.price.toString()}</CardContent>
      </Card>
    </Box>
  );
};

export default MenuItem;
