import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

export default function SearchFeature(props) {
  const [SearchTems, setSearchTems] = useState("");

  const handleSearch = (event) => {
    setSearchTems(event.target.value);
    props.refrechFuction(event.target.value);
  };
  return (
    <div>
      <Search
        value={SearchTems}
        onChange={handleSearch}
        placeholder="Search..."
      />
    </div>
  );
}
