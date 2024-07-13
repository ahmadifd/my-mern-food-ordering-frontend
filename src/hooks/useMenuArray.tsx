import { MenuType } from "../types/Menu.types";

const useMenuArray = (
  menu: MenuType[],
  updateMenu: (menuItems: MenuType[]) => void
) => {
  const appendMenu = (item: MenuType) => {
    const newmenu = [...menu, item];
    updateMenu(newmenu);
  };
  const changeMenu = (index: number, item: MenuType) => {
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
