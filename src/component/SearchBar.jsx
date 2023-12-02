import React from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
function SearchBar({ handleSearch, multipleDelete }) {
  return (
    //search-icon
    <div className="w-[100%]  my-3 pt-2 flex justify-between items-center ">
      <input
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        placeholder="Search"
        className="w-[40vw] p-2 rounded focus:outline-none hover:transition-all duration-300 hover:bg-yellow-100"
      />
      <span
        onClick={multipleDelete}
        className="mr-2 border-2 border-solid rounded-md p-1"
      >
        <DeleteOutlinedIcon className="text-red-500  " />
      </span>
    </div>
  );
}

export default SearchBar;
