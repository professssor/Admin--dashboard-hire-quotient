import React from "react";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
function Pagination({ currentPage, totalPages, goToPage, userLength, users }) {
  //this function will render button as pages to toggle page number
  const renderPageNumbers = () => {
    const pageButtons = [];

    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (startPage < 1) {
      endPage += Math.abs(startPage - 1);
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-2 py-1 mr-2 rounded ${
            i === currentPage ? "bg-black text-white" : "bg-gray-200 text-black"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };
  //to track count of selected users
  const clickedUsersCount = users.filter((user) => user.isChecked).length;

  return (
    <footer className="flex justify-between items-center sbg-gray-200 md:p-4 ">
      <div className="flex items-center sm:ml-10">
        {clickedUsersCount} of {userLength} row(s) selected
      </div>
      {/* page count details */}
      <div className="flex items-center  sm:space-x-6">
        <p className="mr-5">
          page
          <span className="font-bold">{currentPage}</span> of{" "}
          <span className="font-bold">{totalPages}</span>
        </p>{" "}
        {/* first page button */}
        <button
          onClick={() => goToPage(totalPages - (totalPages - 1))}
          disabled={currentPage === 1}
          className="mr-2"
        >
          <FirstPageIcon />
        </button>
        {renderPageNumbers()}
        {/* first page button */}
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="mr-2"
        >
          <LastPageIcon />
        </button>
      </div>
    </footer>
  );
}

export default Pagination;
