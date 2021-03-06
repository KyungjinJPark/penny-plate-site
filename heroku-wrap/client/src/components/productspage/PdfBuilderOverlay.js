import { jsPDF } from "jspdf";
import { useState, useRef } from "react";
import { Modal, Button, Toast } from "react-bootstrap";

import logoImg from "../../imgs/pennyplate-logo.png"

const PdfBuilderOverlay = ({ show, onHide, savedItems, removeSavedItem }) => {

  const logo = useRef();
  let logoImage = new Image();
  logoImage.src = logoImg;
  logo.current = logoImage;

  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <Toast
        show={showToast}
        autohide
        delay={3000}
        onClose={() => { setShowToast(false) }}
        className="site-toast-style"
      >
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
                pdfFromItems(savedItems, logo.current);
                setToastMsg("Generating PDF...");
                setShowToast(true);
                onHide();
              }
              else {
                setToastMsg("No items in cart!");
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



const pdfFromItems = (savedItems, imgLogo) => {
  // dimensions: 8.5 x 11 
  const doc = new jsPDF("portrait", "in", "letter");
  let totalPages = savedItems.length;
  for (let x = 0; x < totalPages; x++) {
    let item = savedItems[x];
    generatePage(doc, item, x + 1, totalPages, imgLogo);
  }
  doc.deletePage(totalPages + 1);
  doc.save("Penny_Plate_Products_PDF.pdf");
}

const generatePage = (doc, item, page, totalPages, imgLogo) => {

  doc.addImage(imgLogo, "PNG", 0.65, 0.5, 1.5 * (imgLogo.width / imgLogo.height), 1.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor("#000000");
  doc.setFontSize(11);
  doc.text("www.PennyPlate.com", 6, 1);

  doc.line(0.5, 2, 8, 2, "F");

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
  doc.text(notices, 0.65, 6.25, {
    maxWidth: 4.2
  });

  doc.setFillColor("#FFFFFF")
  doc.rect(0.55, 9.3, 4.4, 8, "F")

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

  doc.setFontSize(10);
  doc.text("For sales inquiries, contact information, sample information or item specs please call 1-800-527-9909 (Toll Free)", .65, 9.95);
  doc.text("or email info@pennyplate.com", .65, 10.125);

  doc.rect(0.5, 10.25, 7.5, 0.3, "F");

  doc.setTextColor("#FFFFFF");
  doc.text("Page " + page + " of " + totalPages, 0.6, 10.45);
  doc.addPage();
}

const spaceWords = (name) => {
  return name.replace(/([A-Z])/g, " $1");
}