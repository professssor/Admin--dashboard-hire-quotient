import React, { useEffect, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

function RowItem({
  email,
  id,
  role,
  name,
  dummy,
  handleDeleteRow,
  handleEditRow,
  handleChange,
  isChecked,
}) {
  const [edit, setEdit] = useState(false);

  const [editResponse, setEditResponse] = useState({
    email: email ? email : "",
    role: role ? role : "",
    name: name ? name : "",
  });

  return (
    <div
      className={`flex  w-full h-full justify-around items-center p-[.72rem] text-left border-gray-300 border-[1px] hover:transition-all duration-300    ${
        isChecked ? "bg-gray-200" : null
      }`}
    >
      <section className="">
        <input
          name={name}
          checked={isChecked}
          onChange={handleChange}
          className=""
          type="checkbox"
          id=""
        />
      </section>
      <section className=" w-full flex justify-between text-center">
        {edit ? (
          <>
            <input
              value={editResponse.name}
              className="w-full mx-2 outline-none rounded-md p-1"
              type="text"
              name=""
              onChange={(e) =>
                setEditResponse({ ...editResponse, name: e.target.value })
              }
              id=""
            />
            <input
              value={editResponse.email}
              className="w-full mx-2 outline-none rounded-md p-1"
              type="text"
              name=""
              onChange={(e) =>
                setEditResponse({ ...editResponse, email: e.target.value })
              }
              id=""
            />
            <input
              value={editResponse.role}
              className="w-full mx-2 outline-none rounded-md p-1"
              type="text"
              name=""
              onChange={(e) =>
                setEditResponse({ ...editResponse, role: e.target.value })
              }
              id=""
            />
          </>
        ) : (
          <>
            <h3 className=" w-full"> {dummy ? "name" : name}</h3>
            <h3 className=" w-full hidden  md:inline-flex ">
              {" "}
              {dummy ? "email" : email}
            </h3>
            <h3 className="w-full"> {dummy ? "role" : role}</h3>
          </>
        )}
      </section>
      <section className=" flex-row justify-center items-center w-[40%] h-full">
        {!dummy ? (
          <>
            <span
              onClick={() => {
                setEdit(!edit);
              }}
              className={`text-gray-400 mr-2    ${edit ? "hidden" : "null"} `}
            >
              {/* edit icon button */}
              <EditIcon className="hover:text-black " />
            </span>
            <span className="">
              {" "}
              {edit && (
                <span className=" h-full transition-all duration-500 bg-white rounded-full border-l border-r p-1">
                  <>
                    <DoneIcon
                      onClick={() => {
                        if (
                          Object.values(editResponse).some(
                            (value) => value === ""
                          )
                        ) {
                          alert("kindly fill all the fields properly ");
                        } else {
                          setEdit(!edit);
                          handleEditRow(editResponse, id);
                        }
                      }}
                      className="text-green-300 hover:text-green-500 mr-1"
                    />
                    {/* clear icon */}
                    <span className="h-[100%]">|</span>
                    <ClearIcon
                      onClick={() => setEdit(false)}
                      className="text-red-300 hover:text-red-500 ml-1"
                    />
                  </>
                </span>
              )}
            </span>
            {/* delete button icon */}
            <span
              onClick={() => {
                handleDeleteRow(id);
              }}
              className="text-red-500 ml-2 "
            >
              <DeleteOutlinedIcon className="" />
            </span>
          </>
        ) : (
          <h3 className="text-gray-400">Actions</h3>
        )}
      </section>
    </div>
  );
}

export default RowItem;
