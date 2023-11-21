import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SignupForm } from "../components/SignupForm";
import { TopNav } from "../components/TopNav";

const SignupPage = () => {
  return (
    <>
      <TopNav />
      <Container fluid>
        <Row>
          <Col className="bg-info text-light vh-100 d-flex justify-content-center align-items-center ">
            <div className="shadow-lg  rounded p-3">
              <h1>Join Our Community!</h1>
              <p>Laverage our ststem to track your finance</p>
            </div>
          </Col>
          <Col className="d-flex justify-content-center align-items-center ">
            <div className="shadow-lg p-3 border rounded">
              <h2>Signup Now</h2>
              <hr />
              <SignupForm />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignupPage;
