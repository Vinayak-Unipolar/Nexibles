// PCCarddetailsData.js
const PCCarddetailsData = [
    {
      id: 1,
      title: "Standard Business Card",
      description: "Personalized cards with a professional look.",
      image: "/product/businesscard.jpg", // Main image
      thumbnailImages: ["/product/businesscard.jpg", "/product/businesscard.jpg"], // Thumbnail images
      designOptions: ["1000+ design options available.", "Standard glossy or matte paper included.", "Dimension shown on the design page includes bleed area (safety area), the final card size will be 8.9 cm x 5.1 cm.", "stretch your design up to the bleed area to avoid white borders appearing around your card. keep all information within the safety area .", "choose bold font size 10 and above when using white text.", "Need help in designing? You can avail our Design Services."],
      priceOptions: [
        { quantity: "100", price: "RS.250.00" },
        { quantity: "200", price: "RS.320.00" }
      ],
      cornerOptions: [
        { value: "", label: "Corners", disabled: true, selected: true, hidden: true },
        { value: "option1", label: "Standard" },
        { value: "option2", label: "Rounded" }
      ]
    },
    // Add more items as needed
  ];
  
  export default PCCarddetailsData;
  