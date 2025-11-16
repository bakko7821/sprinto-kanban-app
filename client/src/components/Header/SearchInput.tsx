import { SearchIcon } from "../../assets/icons"

export const SearchInput = () => {
    return (
        <div className="searchInput flex g8">
            <SearchIcon />
            <input type="search" id="search" placeholder="Поиск на Sprinto" />
        </div>
    )
}