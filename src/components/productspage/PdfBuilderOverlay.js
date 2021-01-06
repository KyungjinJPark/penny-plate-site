import { jsPDF } from "jspdf";

import logoImg from "../../imgs/pennyplate-logo.png"

// TODO: convert to React Boostrap components
const PdfBuilderOverlay = ({ show, builderItems, handleClose }) => {
  return (
    <div className={show ? "modal display-block" : "modal display-none"}>
      <section className="main-modal">
        {builderItems.map(item =>
          <div key={item.id} className="card" style={{ width: "18rem" }}>
            <img src={"http://pennyplate.com/wp-content/uploads/2014/07/Circular-Danish-black-571x428.png"} className="card-img-top" alt="shirt" />
            <div className="card-body">
              <h5 className="card-title">{item.itemNo}</h5>
              <h6 className="card-title">{item.description}</h6>
            </div>
          </div>
        )}
        <p>Total items: {builderItems.length}</p>
        <button className="btn btn-success ml-2" onClick={() => pdfFromItems(builderItems)}>pdf</button>
        <button className="btn btn-warning ml-2" onClick={handleClose}>close</button>
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