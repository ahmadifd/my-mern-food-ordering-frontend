import { Box, Button, TextField } from "@mui/material";
import { memo } from "react";
import useMenuArray from "../../hooks/useMenuArray";
import { MenuType } from "../../types/Menu.types";

type PropsType = {
  menuItems: MenuType[];
  updateMenu: (menu: MenuType[]) => void;
};

const MenuSection = ({ menuItems, updateMenu }: PropsType) => {
  //console.log("MenuSection", menu);
  const { changeMenu, appendMenu, removeMenu } = useMenuArray(
    menuItems,
    updateMenu
  );

  return (
    <Box mt={2}>
      <hr />
      <Box mt={1} sx={{ fontWeight: "bold" }}>
        Menu
      </Box>
      <Box
        mt={1}
        sx={{
          display: "grid",
          justifyContent: "left",
          alignContent: "center",
          rowGap: "0.3em",
        }}
      >
        {menuItems?.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridAutoFlow: "column",
              justifyContent: "center",
            }}
            columnGap={0.5}
          >
            <TextField
              value={item.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                changeMenu(index, { ...item, name: event.target.value });
              }}
              label={`Name`}
              size="small"
              required
            />

            <TextField
              value={item.price}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                changeMenu(index, { ...item, price: event.target.value });
              }}
              label={`Price`}
              size="small"
              required
            />

            <Button
              color="error"
              onClick={() => {
                removeMenu(index);
              }}
              variant="contained"
              size="small"
            >
              Remove
            </Button>
          </Box>
        ))}
      </Box>
      <Box mt={1}>
        <Button
          onClick={() => {
            appendMenu({ _id: "", name: "", price: "" });
          }}
          variant="contained"
          size="small"
        >
          Add Menu Item
        </Button>
      </Box>
    </Box>
  );
};

const areEqual = (prevProps: PropsType, nextProps: PropsType) => {
  return (
    prevProps.menuItems.length === nextProps.menuItems.length &&
    prevProps.menuItems.every(
      (item, index) =>
        item.name === nextProps.menuItems[index].name &&
        item.price === nextProps.menuItems[index].price
    )
  );
};

const memoizedMenuSection = memo(MenuSection, areEqual);

export default memoizedMenuSection;
