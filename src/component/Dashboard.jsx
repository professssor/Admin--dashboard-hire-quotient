import React, { useState, useEffect } from "react";
import axios from "axios";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import RowItem from "./RowItem";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [userDataForMap, setUserDataForMap] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setUserDataForMap(userData.slice(0, itemsPerPage));
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUserData(res.data);
    };

    fetchData();
  }, []);

  const handleDeleteRow = (id) => {
    const updatedUserData = userDataForMap.filter((data) => data.id !== id);
    setUserDataForMap(updatedUserData);
  };

  const handleEditRow = (editedObject, id) => {
    const updatedUserData = userDataForMap.map((user) =>
      user.id === id ? { ...editedObject, id } : user
    );
    setUserDataForMap(updatedUserData);
  };

  const handleSearch = (input) => {
    input = input.toLowerCase();

    const filteredSearches = userData.filter(
      (user) =>
        user.name.toLowerCase().includes(input) ||
        user.email.toLowerCase().includes(input) ||
        user.role.toLowerCase().includes(input)
    );

    setUserDataForMap(filteredSearches.slice(0, itemsPerPage));
  };
  const [topRowSelect, setTopeRowSelect] = useState(false);
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = pageNumber * itemsPerPage;
    setUserDataForMap(userData.slice(startIndex, endIndex));
  };

  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const [select, setSelect] = useState(false);

  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (name === "") {
      let tempUser = userDataForMap.map((user) => {
        setTopeRowSelect(checked);
        return { ...user, isChecked: checked };
      });
      setUserDataForMap(tempUser);
    } else {
      let tempUser = userDataForMap.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUserDataForMap(tempUser);
    }
  };

  const multipleDelete = () => {
    let clickedUsers = userDataForMap.filter((user) => !user.isChecked);
    setUserDataForMap(clickedUsers);
  };

  return (
    <div className="w-[85%] mx-auto overflowX-hidden">
      <SearchBar multipleDelete={multipleDelete} handleSearch={handleSearch} />
      <RowItem
        {...userDataForMap}
        handleChange={handleChange}
        dummy
        isChecked={topRowSelect}
      />

      {userDataForMap.length === 0 && (
        <div className="flex flex-col w-full justify-center items-center">
          <YoutubeSearchedForIcon className="mt-4" />
          <h2 className="p-4">No result found :(</h2>
        </div>
      )}
      {userDataForMap.map((user) => (
        <RowItem
          selected={select ? select : false}
          key={user.id}
          {...user}
          handleDeleteRow={handleDeleteRow}
          handleEditRow={handleEditRow}
          handleChange={handleChange}
        />
      ))}
      <Pagination
        users={userDataForMap}
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        userLength={userData.length}
      />
    </div>
  );
}

export default Dashboard;
