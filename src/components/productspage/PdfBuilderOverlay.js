import { jsPDF } from "jspdf";
import { useState } from "react";
import { Modal, Button, Toast } from "react-bootstrap";

import logoImg from "../../imgs/pennyplate-logo.png"

const PdfBuilderOverlay = ({ show, onHide, savedItems, removeSavedItem }) => {

  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <Toast onClose={() => { setShowToast(false) }} show={showToast} delay={3000} autohide
        style={{
          zIndex: "100000000",
          position: "absolute",
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



const pdfFromItems = (savedItems) => {
  // dimensions: 8.5 x 11 
  const doc = new jsPDF("portrait", "in", "letter");

  var imgLogo = new Image();
  imgLogo.src = logoImg;
  doc.addImage(imgLogo, "PNG", 0.65, 0.5, 1.5 * (imgLogo.width / imgLogo.height), 1.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor("#000000");
  doc.setFontSize(11);
  doc.text("www.PennyPlate.com", 6, 1);

  doc.line(0.5, 2, 8, 2, "F");

  let item = savedItems[0];

  doc.setFontSize(16);
  doc.setTextColor("#000000");
  doc.setFont("helvetica", "italic");
  doc.text(item.itemNo, 0.65, 2.5)

  doc.setFont("helvetica", "bold")
  doc.text(item.description, 0.65, 2.8, {
    maxWidth: 8.5 - (0.65 * 2)
  });

  let productImg = new Image();
  productImg.src = item.photos[0].url;
  if (productImg.width > productImg.height) {
    //max width 600
    doc.addImage(productImg, "PNG", 0.65, 3.35, 600 * .005, 600 * .005 * (productImg.height / productImg.width));
  } else {
    doc.addImage(productImg, "PNG", 0.65, 3.35, 450 * .005 * (productImg.width / productImg.height), 450 * .005);
  }

  let notices = (item.notices !== null) ? (item.notices.markdown) : "";
  if (notices.length !== 0) {
    doc.text("Extra Information", 0.65, 6)
  }
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#000000");
  doc.setFontSize(10);
  doc.text(notices, 0.65, 6.25);

  let rightDataStart = 3.35;
  let rightDataSpace = 0.25;
  let spacedApps = item.application.map((applications) => { return spaceWords("" + applications) });
  let offset = .25 * (spacedApps.length - 1);
  spacedApps[0] = "Application(s):" + spacedApps[0];
  doc.text(spacedApps, 5, rightDataStart);
  doc.text("Product Type:" + spaceWords(item.productType), 5, rightDataStart + rightDataSpace + offset);
  doc.text("Shape: " + item.shape, 5, rightDataStart + 2 * rightDataSpace + offset);
  doc.text("Stock Type:" + spaceWords(item.stockType), 5, rightDataStart + 3 * rightDataSpace + offset);
  doc.text("Rim: " + item.rimStyle, 5, rightDataStart + 4 * rightDataSpace + offset);
  doc.text("Top In: " + item.topIn, 5, rightDataStart + 5 * rightDataSpace + offset);
  doc.text("Top Out: " + item.topOut, 5, rightDataStart + 6 * rightDataSpace + offset);
  doc.text("Bottom: " + item.bottom, 5, rightDataStart + 7 * rightDataSpace + offset);
  doc.text("Depth: " + item.depth, 5, rightDataStart + 8 * rightDataSpace + offset);
  doc.text("Capacity (Fl. Oz.): " + ((item.panCapacity) ? item.panCapacity : "N/A"), 5, rightDataStart + 9 * rightDataSpace + offset);
  doc.text("Pans Per Case: " + item.pansPerCase, 5, rightDataStart + 10 * rightDataSpace + offset);
  doc.text("TI: " + item.ti, 5, rightDataStart + 11 * rightDataSpace + offset);
  doc.text("HI: " + item.hi, 5, rightDataStart + 12 * rightDataSpace + offset);
  doc.text("Case Size (Ft. Cubed): " + item.caseCubeFt, 5, rightDataStart + 13 * rightDataSpace + offset);
  doc.text("Case Weight (lbs.): " + item.caseWeight, 5, rightDataStart + 14 * rightDataSpace + offset);
  doc.text("Order Quantity: " + item.orderQuantity, 5, rightDataStart + 15 * rightDataSpace + offset);
  doc.text("Pallet Weight (lbs.): " + item.palletWeight, 5, rightDataStart + 16 * rightDataSpace + offset);

  doc.line(0.5, 9.5, 8, 9.5, "F");

  doc.setFontSize(16);
  doc.setTextColor("#000000");
  doc.text("Contact Us", 0.65, 9.75);

  doc.rect(0.5, 10.25, 7.5, 0.3, "F");

  doc.setFontSize(10);
  doc.setTextColor("#FFFFFF");
  doc.text("Page " + 1 + " of " + savedItems.length, 0.6, 10.45);

  // for (let i = 1; i < savedItems.length; i++) {
  //   item = savedItems[i];
  //   productImg = new Image();
  //   productImg.src = item.photos[0].url;
  //   doc.addPage();

  //   spacedApps = item.application.map((applications) => { return spaceWords("" + applications) });
  //   offset = .25 * (spacedApps.length - 1);
  //   spacedApps[0] = "Application(s):" + spacedApps[0];

  //   notices = (item.notices !== null) ? (item.notices.markdown) : "";

  //   doc.addImage(imgLogo, "PNG", 0.65, 0.5, 3, 1.5);

  //   doc.setFontSize(16);
  //   doc.setTextColor("#000000");
  //   doc.setFont("helvetica", "bold")
  //   doc.text(item.description, 0.65, 3.5);
  //   if (notices.length !== 0) {
  //     doc.text("Extra Information", 0.65, 6.5)
  //   }
  //   doc.setFont("helvetica", "italic");
  //   doc.text(item.itemNo, 0.65, 3.75)
  //   doc.setFont("helvetica", "normal");
  //   doc.setFontSize(10.5);
  //   doc.setTextColor("#000000");
  //   doc.text(notices, 0.65, 6.75);
  //   doc.setFontSize(11);
  //   doc.text("www.pennyplate.com", 6, 1);

  //   doc.line(0.5, 2, 8, 2, "F");

  //   doc.addImage(productImg, "PNG", .65, 4, productImg.width * .005, productImg.height * .005);
  //   doc.text(spacedApps, 5, 4.25);
  //   doc.text("Product Type:" + spaceWords(item.productType), 5, 4.5 + offset);
  //   doc.text("Shape: " + item.shape, 5, 4.75 + offset);
  //   doc.text("Stock Type:" + spaceWords(item.stockType), 5, 5 + offset);
  //   doc.text("Rim: " + item.rimStyle, 5, 5.25 + offset);
  //   doc.text("Top In: " + item.topIn, 5, 5.5 + offset);
  //   doc.text("Top Out: " + item.topOut, 5, 5.75 + offset);
  //   doc.text("Bottom: " + item.bottom, 5, 6 + offset);
  //   doc.text("Depth: " + item.depth, 5, 6.25 + offset);
  //   doc.text("Capacity (Fl. Oz.): " + ((item.panCapacity) ? item.panCapacity : "N/A"), 5, 6.5 + offset);
  //   doc.text("Pans Per Case: " + item.pansPerCase, 5, 6.75 + offset);
  //   doc.text("TI: " + item.ti, 5, 7 + offset);
  //   doc.text("HI: " + item.hi, 5, 7.25 + offset);
  //   doc.text("Case Size (Ft. Cubed): " + item.caseCubeFt, 5, 7.5 + offset);
  //   doc.text("Case Weight (lbs.): " + item.caseWeight, 5, 7.75 + offset);
  //   doc.text("Order Quantity: " + item.orderQuantity, 5, 8 + offset);
  //   doc.text("Pallet Weight (lbs.): " + item.palletWeight, 5, 8.25 + offset);


  //   doc.line(0.5, 9.5, 8, 9.5, "F");

  //   doc.setFontSize(16);
  //   doc.setTextColor("#000000");
  //   doc.text("Contact Us", 0.5, 9.75);

  //   doc.rect(0.5, 10.25, 7.5, 0.3, "F");

  //   doc.setFontSize(10);
  //   doc.setTextColor("#FFFFFF");
  //   doc.text("Page " + (i + 1) + " of " + savedItems.length, 0.6, 10.45);
  // }
  doc.save("PennyPlate_Products_PDF.pdf");
}

const spaceWords = (name) => {
  return name.replace(/([A-Z])/g, " $1");
}

const removeHTMLChars = (victim) => {
  return victim.replace
}