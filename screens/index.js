import Home from "./Home";
import BookList from "./BookList";
import BookInfo from "./BookInfo";
import SideMenu from "./SideMenu";

const screens = {
    Home: 'home',
    BookList: 'booklist',
    BookInfo: 'bookinfo',
    SideMenu: 'sidemenu'
};

const screensComponents = [
    {
        key: screens.Home,
        component: Home
    },
    {
        key: screens.BookList,
        component: BookList
    },
    {
        key: screens.BookInfo,
        component: BookInfo
    },
    {
        key: screens.SideMenu,
        component: SideMenu
    }
];

export { screens, screensComponents };