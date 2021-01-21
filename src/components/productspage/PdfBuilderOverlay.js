import { jsPDF } from "jspdf";
import { Modal, Button } from "react-bootstrap";

import logoImg from "../../imgs/pennyplate-logo.png"

const PdfBuilderOverlay = ({ show, onHide, savedItems, removeSavedItem }) => {
  console.log("Hello World");
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
                        src={item.photos[0].url}
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
        <Button variant="success" 
                onClick={() => {if (savedItems.length > 0)                                                     
                                {
                                  pdfFromItems(savedItems);
                                  console.log("PDF generated");
                                  onHide();
                                } 
                                else { console.log("No items in cart")}}}>
          Create PDF from Saved Items
        </Button>
        <Button variant="primary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PdfBuilderOverlay;


// TODO: output proper PDF
const pdfFromItems = (savedItems) => {
  const doc = new jsPDF("portrait", "in", "letter");
  console.log(savedItems);
  var imgLogo = new Image();
  imgLogo.src = logoImg;

  let firstItem = savedItems[0];
  let firstProductImg = new Image();
  firstProductImg.src = firstItem.photos[0].url;

  doc.addImage(imgLogo, "PNG", 0.65, 0.5, 3, 1.5);
  doc.setFontSize(12);
  doc.setTextColor("#000000");
  doc.text("www.pennyplate.com", 6, 1);
  doc.line(0.5, 2, 8, 2, "F");
  doc.addImage(firstProductImg, "PNG", .65, 4, firstProductImg.width * .005, firstProductImg.height * .005);
  doc.text(firstItem.itemNo, .65 * 8, 4);
  
  doc.line(0.5, 9.5, 8, 9.5, "F");

  doc.setFontSize(16);
  doc.setTextColor("#000000");
  doc.text("Contact Us", 0.5, 9.75);

  doc.rect(0.5, 10.25, 7.5, 0.3, "F");

  doc.setFontSize(10);
  doc.setTextColor("#FFFFFF");
  doc.text("Page " + 1 + " of " + savedItems.length, 0.6, 10.45);
  for (let i = 1; i < savedItems.length; i++) {
    let item = savedItems[i];
    let productImg = new Image();
    productImg.src = item.photos[0].url;
    console.log(productImg.width + " " + productImg.height);
    doc.addPage();
    doc.addImage(imgLogo, "PNG", 0.65, 0.5, 3, 1.5);
    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.text("www.pennyplate.com", 6, 1);
    doc.line(0.5, 2, 8, 2, "F");
    doc.addImage(productImg, "PNG", .65, 4, productImg.width * .005, productImg.height * .005);
    doc.text(item.itemNo, .65 * 8, 4);
    
    doc.line(0.5, 9.5, 8, 9.5, "F");

    doc.setFontSize(16);
    doc.setTextColor("#000000");
    doc.text("Contact Us", 0.5, 9.75);

    doc.rect(0.5, 10.25, 7.5, 0.3, "F");

    doc.setFontSize(10);
    doc.setTextColor("#FFFFFF");
    doc.text("Page " + (i + 1) + " of " + savedItems.length, 0.6, 10.45);
  }
/*
  doc.line(0.5, 9.5, 8, 9.5, "F");

  doc.setFontSize(16);
  doc.setTextColor("#000000");
  doc.text("Contact Us", 0.5, 9.75);

  doc.rect(0.5, 10.25, 7.5, 0.3, "F");

  doc.setFontSize(10);
  doc.setTextColor("#FFFFFF");
  doc.text("Page 0 of 0", 0.6, 10.45);
*/

  doc.save("PennyPlate_Products_PDF.pdf");
}