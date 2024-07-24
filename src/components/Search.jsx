import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


// eslint-disable-next-line react/prop-types
export function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="search_erea">
      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          placeholder="Search for items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchButton" href="#">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
}
