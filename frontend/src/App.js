import "./App.css";

import Map from "./components/Map";
import LayerController from "./components/LayerController";

import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

import { Row, Col } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Header />
      <Row className="flex-column-reverse flex-lg-row">
        <Col lg={4} md={12} className="p-0">
          <LayerController />
        </Col>
        <Col lg={8} md={12} className="p-0 m-0">
          <Map />
        </Col>
      </Row>
    </div>
  );
}

export default App;
