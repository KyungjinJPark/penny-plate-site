import { jsPDF } from "jspdf";
import { Button, CardDeck, Card } from "react-bootstrap";

import logoImg from "../../imgs/pennyplate-logo.png"

// TODO: convert to React Boostrap components
const PdfBuilderOverlay = ({ show, builderItems, handleClose }) => {
  return (
    <div className={show ? "popup-wrapper display-block" : "popup-wrapper display-none"}>
      <section className="main-popup" style={{ height: "95%" }}>
        <Button variant="primary" onClick={handleClose} style={{ float: "right" }}>Close</Button>
        <div className="popup-content">
          <h1>Saved Items</h1>
          <div className="separator"></div>
          <CardDeck>
            {builderItems.map(item =>
              <Card key={item.id} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={"http://pennyplate.com/wp-content/uploads/2014/07/Circular-Danish-black-571x428.png"} alt="shirt" />
                <Card.Body>
                  <Card.Title>{item.itemNo}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
              </Card>
            )}
          </CardDeck>
          <p><b>Total items:</b> {builderItems.length}</p>
          <Button variant="success" onClick={() => pdfFromItems(builderItems)}>Create PDF from Saved Items</Button>
        </div>
      </section>
    </div>
  );
}

export default PdfBuilderOverlay;


// TODO: output proper PDF
const pdfFromItems = (builderItems) => {
  const doc = new jsPDF("portrait", "in", "letter");


  var img = new Image();
  img.src = logoImg;
  doc.addImage(img, "PNG", 0.65, 0.5, 3, 1.5);

  doc.setFontSize(12);
  doc.setTextColor("#000000");
  doc.text("www.pennyplate.com", 6, 1);

  doc.line(0.5, 2, 8, 2, "F");

  for (let i = 0; i < builderItems.length; i++) {
    doc.text(builderItems[i].itemNo, 0.65, i * 1 + 4);
  }

  doc.line(0.5, 9.5, 8, 9.5, "F");

  doc.setFontSize(16);
  doc.setTextColor("#000000");
  doc.text("Contact Us", 0.5, 9.75);

  doc.rect(0.5, 10.25, 7.5, 0.3, "F");

  doc.setFontSize(10);
  doc.setTextColor("#FFFFFF");
  doc.text("Page 0 of 0", 0.6, 10.45);


  doc.save("PennyPlate_Products_PDF.pdf");
}