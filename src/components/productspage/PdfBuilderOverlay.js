import { jsPDF } from "jspdf";
import { useState } from "react";
import { Modal, Button, Toast } from "react-bootstrap";

import logoImg from "../../imgs/pennyplate-logo.png"

const PdfBuilderOverlay = ({ show, onHide, savedItems, removeSavedItem }) => {
  
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <Toast onClose={() => {setShowToast(false)}} show={showToast} delay={3000} autohide
        style={{
          zIndex: "100000000",
          position:"absolute",
          bottom: "5%",
        }}>
        <Toast.Body>{toastMsg}</Toast.Body>
      </Toast>
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
            onClick={() => {
              if (savedItems.length > 0) {
                pdfFromItems(savedItems);
                setToastMsg("PDF generated");
                setShowToast(true);
                onHide();
              }
              else { 
                setToastMsg("No items in cart");
                setShowToast(true); 
              }
            }}>
            Create PDF from Saved Items
          </Button>
          <Button variant="primary" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PdfBuilderOverlay;


// TODO: output proper PDF
const pdfFromItems = (savedItems) => {
  const doc = new jsPDF("portrait", "in", "letter");
  console.log(savedItems);
  var imgLogo = new Image();
  imgLogo.src = logoImg;

  let item = savedItems[0];
  let productImg = new Image();
  productImg.src = item.photos[0].url;

  let spacedApps = item.application.map((applications) => {return spaceWords("" + applications)});
  let offset = .25 * (spacedApps.length - 1);
  spacedApps[0] = "Application(s):" + spacedApps[0];
  
  let notices = item.notices.html.replace(/(<div>)|(<p>)/g, '\n').replace(/<([^>]+)>/ig, '').trim().split('\n');

  doc.addImage(imgLogo, "PNG", 0.65, 0.5, 3, 1.5);

  doc.setFontSize(16);
  doc.setTextColor("#000000");
  doc.setFont("helvetica", "bold")
  doc.text(item.description, .65 * 1.75, 3.5);
  doc.text("Extra Information", .65 * 1.75, 6.5)
  doc.setFont("helvetica","italic");
  doc.text(item.itemNo, .65 * 1.75, 3.75)
  doc.setFont("helvetica","normal");
  doc.setFontSize(12);
  doc.setTextColor("#000000");
  doc.text(notices, .65 * 1.75, 6.75);
  doc.text("www.pennyplate.com", 6, 1);

  doc.line(0.5, 2, 8, 2, "F");

  doc.addImage(productImg, "PNG", .65, 4, productImg.width * .005, productImg.height * .005);
  doc.text(spacedApps, .65 * 8, 4.25);
  doc.text("Product Type:" + spaceWords(item.productType), .65 * 8, 4.5 + offset);
  doc.text("Shape: " + item.shape, .65 * 8, 4.75 + offset);
  doc.text("Stock Type:" + spaceWords(item.stockType), .65 * 8, 5 + offset);
  doc.text("Rim: " + item.rimStyle, .65 * 8, 5.25 + offset);
  doc.text("Top In: " + item.topIn, .65 * 8, 5.5 + offset);
  doc.text("Top Out: " + item.topOut, .65 * 8, 5.75 + offset);
  doc.text("Bottom: " + item.bottom, .65 * 8, 6 + offset);
  doc.text("Depth: " + item.depth, .65 * 8, 6.25 + offset);
  doc.text("Capacity (Fl. Oz.): " + ((item.panCapacity) ? item.panCapacity : "N/A"), .65 * 8, 6.5 + offset);
  doc.text("Pans Per Case: " + item.pansPerCase, .65 * 8, 6.75 + offset);
  doc.text("TI: " + item.ti, .65 * 8, 7 + offset);
  doc.text("HI: " + item.hi, .65 * 8, 7.25 + offset);
  doc.text("Case Size (Ft. Cubed): " + item.caseCubeFt, .65 * 8, 7.5 + offset);
  doc.text("Case Weight (lbs.): " + item.caseWeight, .65 * 8, 7.75 + offset);
  doc.text("Order Quantity: " + item.orderQuantity, .65 * 8, 8 + offset);
  doc.text("Pallet Weight (lbs.): " + item.palletWeight, .65 * 8, 8.25 + offset);

  doc.line(0.5, 9.5, 8, 9.5, "F");

  doc.setFontSize(16);
  doc.setTextColor("#000000");
  doc.text("Contact Us", 0.5, 9.75);

  doc.rect(0.5, 10.25, 7.5, 0.3, "F");

  doc.setFontSize(10);
  doc.setTextColor("#FFFFFF");
  doc.text("Page " + 1 + " of " + savedItems.length, 0.6, 10.45);
  for (let i = 1; i < savedItems.length; i++) {
    item = savedItems[i];
    productImg = new Image();
    productImg.src = item.photos[0].url;
    doc.addPage();

    spacedApps = item.application.map((applications) => {return spaceWords("" + applications)});
    offset = .25 * (spacedApps.length - 1);
    spacedApps[0] = "Application(s):" + spacedApps[0];

    notices = item.notices.html.replace(/(<div>)|(<p>)/g, '\n').replace(/<([^>]+)>/ig, '').trim().split('\n');

    doc.addImage(imgLogo, "PNG", 0.65, 0.5, 3, 1.5);

    doc.setFontSize(16);
    doc.setTextColor("#000000");
    doc.setFont("helvetica", "bold")
    doc.text(item.description, .65 * 1.75, 3.5);
    doc.text("Extra Information", .65 * 1.75, 6.5)
    doc.setFont("helvetica","italic");
    doc.text(item.itemNo, .65 * 1.75, 3.75)
    doc.setFont("helvetica","normal");
    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.text(notices, .65 * 1.75, 6.75);
    doc.text("www.pennyplate.com", 6, 1);

    doc.line(0.5, 2, 8, 2, "F");

    doc.addImage(productImg, "PNG", .65, 4, productImg.width * .005, productImg.height * .005);
    doc.text(spacedApps, .65 * 8, 4.25);
    doc.text("Product Type:" + spaceWords(item.productType), .65 * 8, 4.5 + offset);
    doc.text("Shape: " + item.shape, .65 * 8, 4.75 + offset);
    doc.text("Stock Type:" + spaceWords(item.stockType), .65 * 8, 5 + offset);
    doc.text("Rim: " + item.rimStyle, .65 * 8, 5.25 + offset);
    doc.text("Top In: " + item.topIn, .65 * 8, 5.5 + offset);
    doc.text("Top Out: " + item.topOut, .65 * 8, 5.75 + offset);
    doc.text("Bottom: " + item.bottom, .65 * 8, 6 + offset);
    doc.text("Depth: " + item.depth, .65 * 8, 6.25 + offset);
    doc.text("Capacity (Fl. Oz.): " + ((item.panCapacity) ? item.panCapacity : "N/A"), .65 * 8, 6.5 + offset);
    doc.text("Pans Per Case: " + item.pansPerCase, .65 * 8, 6.75 + offset);
    doc.text("TI: " + item.ti, .65 * 8, 7 + offset);
    doc.text("HI: " + item.hi, .65 * 8, 7.25 + offset);
    doc.text("Case Size (Ft. Cubed): " + item.caseCubeFt, .65 * 8, 7.5 + offset);
    doc.text("Case Weight (lbs.): " + item.caseWeight, .65 * 8, 7.75 + offset);
    doc.text("Order Quantity: " + item.orderQuantity, .65 * 8, 8 + offset);
    doc.text("Pallet Weight (lbs.): " + item.palletWeight, .65 * 8, 8.25 + offset);


    doc.line(0.5, 9.5, 8, 9.5, "F");

    doc.setFontSize(16);
    doc.setTextColor("#000000");
    doc.text("Contact Us", 0.5, 9.75);

    doc.rect(0.5, 10.25, 7.5, 0.3, "F");

    doc.setFontSize(10);
    doc.setTextColor("#FFFFFF");
    doc.text("Page " + (i + 1) + " of " + savedItems.length, 0.6, 10.45);
  }
  doc.save("PennyPlate_Products_PDF.pdf");
}

const spaceWords = (name) => {
  return name.replace(/([A-Z])/g, " $1");
}