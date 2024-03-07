import React from "react";
import CustomViewButton from "../CustomViewButton/CustomViewButton";
import "./CustomTable.css";
import { useNavigate } from "react-router-dom";

const CustomTable = ({
  data,
  columnNames,
  enableActions = true,
  emptyMessage,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      {data?.length ? (
        <table>
          <thead>
            <tr>
              <th>No</th>
              {columnNames.map((item, index) => {
                return <th>{item}</th>;
              })}
              {enableActions && <th className="action-header">Action</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr>
                  <td className="ct-data">{index + 1}</td>
                  {item.map((i) => {
                    return (
                      <>
                        <td className="ct-data">{i}</td>
                      </>
                    );
                  })}
                  {enableActions && (
                    <td>
                      <CustomViewButton text={"View"} onClick={() => navigate(`/project-view?id=${item[0]}`)}/>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="emptyMessage">{emptyMessage}</div>
      )}
    </div>
  );
};

export default CustomTable;
