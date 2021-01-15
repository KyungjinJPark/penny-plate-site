import { jsPDF } from "jspdf";
import { Modal, Button } from "react-bootstrap";

import logoImg from "../../imgs/pennyplate-logo.png"

const PdfBuilderOverlay = ({ show, onHide, savedItems, removeSavedItem }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      dialogClassName="no-border-modal"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="popup-content">
          <div>
            <h1>Saved Items</h1>
            <div className="separator"></div>
          </div>
          <div style={{ width: "100%" }}>
            <table>
              <tbody>
                {savedItems.map(item =>
                  <tr key={item.id} className="saved-item-row">
                    <td className="saved-item-img-cell">
                      <img
                        className="saved-item-img"
                        src={"http://pennyplate.com/wp-content/uploads/2014/07/Circular-Danish-black-571x428.png"}
                        alt="..." />
                    </td>
                    <td className="saved-item-desc">
                      <p>{item.itemNo}</p>
                      <h1>{item.description}</h1>
                    </td>
                    <td>
                      <Button variant="primary" onClick={() => { removeSavedItem(item.id) }}>Remove</Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: "10px" }}>
            <p style={{ marginBottom: "3px" }}><b>Total items:</b> {savedItems.length}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => pdfFromItems(savedItems)}>Create PDF from Saved Items</Button>
        <Button variant="primary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PdfBuilderOverlay;


// TODO: output proper PDF
const pdfFromItems = (savedItems) => {
  const doc = new jsPDF("portrait", "in", "letter");


  var img = new Image();
  img.src = logoImg;
  doc.addImage(img, "PNG", 0.65, 0.5, 3, 1.5);

  doc.setFontSize(12);
  doc.setTextColor("#000000");
  doc.text("www.pennyplate.com", 6, 1);

  doc.line(0.5, 2, 8, 2, "F");

  for (let i = 0; i < savedItems.length; i++) {
    doc.text(savedItems[i].itemNo, 0.65, i * 1 + 4);
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