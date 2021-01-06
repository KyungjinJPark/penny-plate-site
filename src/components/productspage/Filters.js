import { useState, useEffect } from "react";
import { useQuery } from "react-apollo";

const Filters = ({ onSend, filterType, query }) => {
  const [currFilters, setCurrFilters] = useState([]);
  const { loading: filterLoading, error: filterError, data: filterData } = useQuery(query);
  const changeFilters = (checked, name) => {
    const newFilters = [...currFilters];
    if (checked) {
      if (newFilters.indexOf(name) === -1) {
        newFilters.push(name);
      }
    }
    else {
      const loc = newFilters.indexOf(name);
      if (loc !== -1) {
        newFilters.splice(loc, 1);
      }
    }
    setCurrFilters(newFilters);
  }
  useEffect((allFilters) => {
    if (!(filterLoading || filterError)) {
      if (currFilters.length === 0) {
        onSend(allFilters);
      }
      else {
        onSend(currFilters);
      }
    }
  }, [filterLoading, filterError, currFilters, onSend]);

  if (filterLoading) {
    return <>
      <p>{filterType}</p>
      <p>Fetching filters.....</p>
    </>
  }
  else if (filterError) {
    return <>
      <p>{filterType}</p>
      <p>Error fetching filters</p>
    </>
  }
  else {
    const filters = filterData.__type.enumValues;
    const allFilters = filters.map(filter => filter.name); // TODO: this is unused
    return <>
      <p>{filterType}</p>
      <ul style={{ listStyle: "none" }}>
        {filters.map(filter => <li key={filter.name}>
          <input type="checkbox" onChange={(event) => { changeFilters(event.target.checked, filter.name) }} />
          {" " + filter.name}
        </li>)}
      </ul>
    </>
  }
}

export default Filters;