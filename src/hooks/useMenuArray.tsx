import { MenuItem } from "../types/MenuItem.types";

const useMenuArray = (
  menu: MenuItem[],
  updateMenu: (menuItems: MenuItem[]) => void
) => {
  const appendMenu = (item: MenuItem) => {
    const newmenu = [...menu, item];
    updateMenu(newmenu);
  };
  const changeMenu = (index: number, item: MenuItem) => {
    const newmenu = [
      ...menu?.slice(0, index),
      item,
      ...menu?.slice(index + 1, menu?.length),
    ];
    updateMenu(newmenu);
  };
  const removeMenu = (index: number) => {
    const newmenu =
      menu?.filter((_item, itemindex) => itemindex !== index) ?? [];
    updateMenu(newmenu);
  };
  return { changeMenu, appendMenu, removeMenu };
};

export default useMenuArray;
