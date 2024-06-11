import React, { useState, useEffect } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CapatazAccordionComponent = () => {
  const [open, setOpen] = useState("0");

  const navigate = useNavigate();
  const [state, setState] = useState({ usuario: [] });
  const [state_obra, setState_obra] = useState({ obra: [] });

  const url = "http://localhost:8000/listar_usuarios";
  const url_obra = "http://localhost:8000/listar_obras";

  const toggle = (id) => {
    if (open === id) {
      setOpen(null);
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {
    const fetchDataObra = async () => {
      try {
        const response = await axios.post(url_obra);

        setState_obra({
          ...state_obra,
          obra: response.data,
        });
        console.log(response.data);
      } catch (error) {}
    };
    fetchDataObra();
  }, []);

  return (
    <div>
      <Button
        color="primary"
        onClick={() => toggle("1")}
        style={{ marginBottom: "1rem" }}
      >
        Accordion Item #1
      </Button>
      <Collapse isOpen={open === "1"}>
        <Card>
          <CardBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
          </CardBody>
        </Card>
      </Collapse>
      <Button
        color="primary"
        onClick={() => toggle("2")}
        style={{ marginBottom: "1rem" }}
      >
        Accordion Item #2
      </Button>
      <Collapse isOpen={open === "2"}>
        <Card>
          <CardBody>
            Morbi in sem quis dui placerat ornare. Pellentesque odio nisi,
            euismod in, pharetra a, ultricies in, diam.
          </CardBody>
        </Card>
      </Collapse>
      <Button
        color="primary"
        onClick={() => toggle("3")}
        style={{ marginBottom: "1rem" }}
      >
        Accordion Item #3
      </Button>
      <Collapse isOpen={open === "3"}>
        <Card>
          <CardBody>
            Integer gravida nisl eu neque euismod, in tincidunt nisi dapibus.
            Curabitur vel turpis nec lorem scelerisque varius.
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

export default CapatazAccordionComponent;
