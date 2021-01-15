import { useState, useEffect } from "react";
import { useQuery } from "react-apollo";

const Filters = ({ onSend, filterType, query }) => {
  const [currFilters, setCurrFilters] = useState([]);
  const [allFilters, setAllFilters] = useState([]);
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
  useEffect(() => {
    if (!(filterLoading || filterError)) {
      const filters = filterData.__type.enumValues;
      setAllFilters(filters.map(filter => filter.name));
      onSend(allFilters);
      setCurrFilters([]);
    }
  }, [filterLoading, filterError, filterData]);
  useEffect(() => {
    if (currFilters.length == 0) {
      onSend(allFilters);
    }
    else {
      onSend(currFilters);
    }
  }, [currFilters])

  if (filterLoading) {
    return <>
      <h4>{filterType}</h4>
      <p>Fetching filters.....</p>
    </>
  }
  else if (filterError) {
    return <>
      <h4>{filterType}</h4>
      <p>Error fetching filters</p>
    </>
  }
  else {
    const filters = filterData.__type.enumValues;
    //const allFilters = filters.map(filter => filter.name); // TODO: this is unused
    return <>
      <h4>{filterType}</h4>
      <ul>
        {filters.map(filter => <li key={filter.name}>
          <input type="checkbox" onChange={(event) => { changeFilters(event.target.checked, filter.name) }} />
          <p>{spaceFilters(filter.name)}</p>
        </li>)}
      </ul>
    </>
  }
}

export default Filters;


const spaceFilters = (name) => {
  return name.replace(/([A-Z])/g, " $1");
}