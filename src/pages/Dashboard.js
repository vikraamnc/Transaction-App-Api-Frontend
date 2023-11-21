import React, { useEffect, useState } from "react";
import { TopNav } from "../components/TopNav";
import { TransForm } from "../components/TransForm";
import { Container, Button } from "react-bootstrap";
import { TransTable } from "../components/TransTable";
import { getTrans } from "../heper/axiosHelper";
import { CustomModal } from "../components/CustomModals";
const Dashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const [transList, setTransList] = useState([]);
  useEffect(() => {
    getAllTrans();
  }, []);

  const getAllTrans = async () => {
    const { status, transList } = await getTrans();
    status === "success" && setTransList(transList);
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Transaction
      </Button>

      {/* navbar  */}
      <TopNav />

      <Container fluid>
        {/* form */}

        <CustomModal show={modalShow} onHide={() => setModalShow(false)}>
          <TransForm getAllTrans={getAllTrans} />
        </CustomModal>
        <div className="text-end"></div>
        {/* table */}
        <TransTable transList={transList} getAllTrans={getAllTrans} />
      </Container>
    </div>
  );
};

export default Dashboard;
