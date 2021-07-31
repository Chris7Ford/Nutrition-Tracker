import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Quagga from 'quagga';
import "./upc-modal.css";

class UPCModal extends React.Component {
  constructor() {
    super();
    this.videoContainer = null;
    this.upcInput = null;
  }

  stream = () => {
    this.videoContainer = document.querySelector(".videoContainer");
    this.upcInput = document.querySelector("#upcInput");
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          constraints: {
            width: '790',
            height: '490'
          },
          numberOfWorkers: navigator.hardwareConcurrency,
           target: this.videoContainer
        },
        locate: true,
        decoder: {
          readers: ["code_128_reader", "upc_reader", "upc_e_reader"]
        }
      }, function (err) {
        if (err) {
          return
        }
        Quagga.start();
      });
      Quagga.onDetected(this.onDetect);
}

onBarcodeDetect = (barCode) => {
  this.upcInput.setAttribute("value", barCode);
}

fetchProductInfo = async() => {
  //barCode = "897922002072";
  //barCode = "851770003179";
  const barCode = this.upcInput.getAttribute("value");
  if (barCode.length) {
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${ barCode }.json`);
    const data = await response.json();
    if (data.status !== 0) {
      let product = {
        "title": data.product.product_name,
        "calories": data.product.nutriments["energy-kcal_serving"],
        "protein": data.product.nutriments.proteins_serving,
        "carbs": data.product.nutriments.carbohydrates_serving,
        "fat": data.product.nutriments.fat_serving,
        "numServings": data.product.serving_quantity,
        "servingSize": data.product.serving_size,
        //"image": data.product.selectedImages
      };
      this.props.populateScannedProduct(product);
    } else {
      alert(data.status_verbose);
    }
  }
}

onDetect = (res) => {
  Quagga.stop()
  Quagga.offProcessed()
  this.videoContainer.innerHTML = "";
  this.onBarcodeDetect(res.codeResult.code);
}

  render() {
    return (
      <Modal show={this.props.showModal} onHide={() => this.props.setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lookup Food by UPC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="upcInput">
              <Form.Label>UPC Code</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" />
            </Form.Group>
          </Form>
          <div className="videoContainer"></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={this.fetchProductInfo}>
            Lookup
          </Button>
          <Button variant="primary" onClick={this.stream}>
            Scan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UPCModal;
