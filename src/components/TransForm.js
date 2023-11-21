import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { postTrans } from "../heper/axiosHelper";

export const TransForm = ({ getAllTrans }) => {
  const [form, setForm] = useState({});
  const [resp, setResp] = useState({});

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    const result = await postTrans(form);

    setResp(result);

    if (result.status === "success") {
      getAllTrans();
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const inputs = [
    {
      label: "Date",
      type: "date",
      name: "date",
      required: true,
    },
    {
      label: "Title",
      type: "text",
      name: "title",
      required: true,
    },
    {
      label: "Amount",
      type: "number",
      name: "amount",
      required: true,
    },
  ];

  return (
    <div className="mt-5">
      {resp.message && (
        <Alert variant={resp.status === "success" ? "success" : "danger"}>
          {" "}
          {resp.message}
        </Alert>
      )}
      <Form
        onSubmit={handleOnSubmit}
        className="shadow-lg border rounded p-3 bg-secondary"
      >
        <Row>
          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select onChange={handleOnChange} name="type" required>
                <option value="">- select -</option>
                <option value="income">Income</option>
                <option value="expenses">Expenses</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {inputs.map((itme, i) => (
            <Col key={i} md={3}>
              <CustomInput {...itme} onChange={handleOnChange} />
            </Col>
          ))}
          <Col md={1}>
            <Form.Group className="">
              <div className="d-grid mt-4">
                <Button type="submit">Add </Button>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
