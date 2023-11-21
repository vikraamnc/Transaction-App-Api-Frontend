import { useState } from "react";
import { Table, Form, Button, Alert } from "react-bootstrap";
import { deleteTrans } from "../heper/axiosHelper";

export const TransTable = ({ transList, getAllTrans }) => {
  const [idsToDelete, setIdsToDelete] = useState([]);
  const [resp, setResp] = useState({});

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      //add
      setIdsToDelete([...idsToDelete, value]);
    } else {
      // remove the id

      setIdsToDelete(idsToDelete.filter((item) => item !== value));
    }
  };

  const handleOnAllSelect = (e) => {
    const { checked } = e.target;
    if (checked) {
      // add all teh ids to delete
      console.log(transList);
      const ids = transList.map(({ _id }) => _id);
      setIdsToDelete(ids);
    } else {
      setIdsToDelete([]);
    }
  };

  const handleOnDelete = async () => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }

    const result = await deleteTrans(idsToDelete);
    setResp(result);

    if (result?.status === "success") {
      getAllTrans();
      setIdsToDelete([]);
    }
  };

  return (
    <div className="mt-5">
      <div className="">{transList.length} Transactions found!</div>
      {resp.message && (
        <Alert variant={resp.status === "success" ? "success" : "danger"}>
          {resp.message}
        </Alert>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="d-flex">
              <Form.Check
                checked={idsToDelete.length === transList.length}
                onChange={handleOnAllSelect}
              />{" "}
              Date
            </th>
            <th>Title</th>
            <th>Income</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          {transList.map(({ _id, title, date, amount, type }) => (
            <tr>
              <td className="d-flex">
                <Form.Check
                  value={_id}
                  onChange={handleOnSelect}
                  checked={idsToDelete.includes(_id)}
                />{" "}
                {new Date(date).toLocaleDateString()}
              </td>
              <td>{title}</td>
              {type === "income" ? (
                <>
                  <td className=" text-success">{amount}</td>
                  <td></td>
                </>
              ) : (
                <>
                  <td></td>
                  <td className=" text-danger">-{amount}</td>
                </>
              )}
            </tr>
          ))}

          <tr className="fw-bolder">
            <td colSpan={3}>
              <div className="d-flex justify-content-between  ">
                {idsToDelete.length > 0 && (
                  <Button onClick={handleOnDelete} variant="danger">
                    Delete {idsToDelete.length} transactions
                  </Button>
                )}
                <span> Total Balance</span>
              </div>
            </td>
            <td>
              {transList.reduce((acc, { amount, type }) => {
                return type === "income" ? acc + amount : acc - amount;
              }, 0)}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
