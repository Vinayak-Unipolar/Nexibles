export default function CartItems({ cartItems }) {
  return (
    <div className="md:w-1/2 w-full md:mt-0 mt-12">
      <h3 className="text-gray-900 text-2xl font-bold px-4 md:px-0">Your Items</h3>
      <div className="w-full">
        {cartItems.map((item) => (
          <div className="flex flex-col md:flex-row py-4 px-4 md:px-8" key={item.id}>
            <div className="flex justify-center md:justify-start">
              <img src={item.image} alt={item.name} className="h-24 md:h-28 w-auto md:w-48 object-contain" />
            </div>
            <div className="px-0 md:px-8 mt-4 md:mt-0 w-full">
              <h2 className="text-gray-900 font-bold text-lg mb-2 md:mb-4 text-center md:text-left">{item.name}</h2>
              <div className="flex flex-wrap justify-between md:justify-start md:space-x-12 items-center">
                <p className="text-gray-900 text-md pl-12 font-bold">{item.quantity} QTY</p>
                <p className="text-gray-900 text-md font-bold">
                  ₹{typeof item.totalPrice === "number" ? item.totalPrice.toFixed(0) : item.totalPrice}
                </p>
                <p className="text-gray-900 text-md font-bold">Sku = {item.skuCount}</p>
                <div className="w-full md:w-auto mt-2 md:mt-0">
                  {/* Table for selectedOptions */}
                  {item?.selectedOptions && Object.keys(item.selectedOptions).length > 0 ? (
                    <div className="w-full bg-white overflow-x-auto">
                      <table className="min-w-full text-sm md:text-base table-auto border border-gray-300">
                        <tbody>
                          {/* Category as the first row */}
                          <tr className="border-b bg-gray-50">
                            <td className="p-1 text-sm capitalize">Category</td>
                            <td className="p-1 text-sm">{item.category}</td>
                          </tr>
                          {/* Combine width and length into a single "Dimension" row */}
                          {item.selectedOptions.width && item.selectedOptions.length && (
                            <tr className="border-b">
                              <td className="p-1 text-sm capitalize">Dimension</td>
                              <td className="p-1 text-sm">
                                {item.selectedOptions.width.optionName} x {item.selectedOptions.length.optionName}
                              </td>
                            </tr>
                          )}
                          {/* Render other selected options, excluding width and length */}
                          {Object.entries(item.selectedOptions).map(([key, option]) =>
                            key !== "width" && key !== "length" ? (
                              <tr key={key} className="border-b">
                                <td className="p-1 text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
                                <td className="p-1 text-sm">{option.optionName}</td>
                              </tr>
                            ) : null
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>
                    
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}






// export default function CartItems({ cartItems }) {
//   return (
//     <div className="md:w-1/2 w-full md:mt-0 mt-12">
//       <h3 className="text-gray-900 text-2xl font-bold px-4 md:px-0">Your Items</h3>
//       <div className="w-full">
//         {cartItems.map((item) => (
//           <div className="flex flex-col md:flex-row py-4 px-4 md:px-8" key={item.id}>
//             <div className="flex justify-center md:justify-start">
//               <img src={item.image} alt={item.name} className="h-24 md:h-28 w-auto md:w-48 object-contain" />
//             </div>
//             <div className="px-0 md:px-8 mt-4 md:mt-0">
//               <h2 className="text-gray-900 font-bold text-lg mb-2 md:mb-4 text-center md:text-left">{item.name}</h2>
//               <div className="flex flex-wrap justify-between md:justify-start md:space-x-12 items-center">
//                 <p className="text-gray-900 text-md font-bold">{item.quantity} QTY</p>
//                 <p className="text-gray-900 text-md font-bold">₹{item.totalPrice}</p>
//                 <p className="text-gray-900 text-md font-bold">Sku = {item.skuCount}</p>
//                 <div className="w-full md:w-auto mt-2 md:mt-0">
//                   {item?.selectedOptions && Object.entries(item.selectedOptions).map(([key, option]) => (
//                     <p key={key} className="text-gray-900 text-sm md:text-md font-bold text-center md:text-left">
//                       {key}: {option.optionName}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }