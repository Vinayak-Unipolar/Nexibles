"use client";
import { useSelector } from 'react-redux';

export default function OrderSummary({
  subTotal,
  discountAmount,
  shippingCost,
  gstAmount,
  totalPrice,
  isDeliveryAvailable,
  deliveryEstimate,
}) {
  const { items: cartItems, appliedCoupon } = useSelector((state) => state.cart);
  const GST_RATE = 0.18;

  const calculatedSubTotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.totalPrice || 0),
    0
  ).toFixed(2);

  const calculatedDiscountAmount = appliedCoupon
    ? Math.min(
        cartItems.reduce((sum, item) => sum + (parseFloat(item.discountAmount) || 0), 0),
        appliedCoupon.max_discount
      ).toFixed(2)
    : "0.00";

  const totalAfterDiscount = (parseFloat(subTotal || calculatedSubTotal) - parseFloat(discountAmount || calculatedDiscountAmount)).toFixed(2);
  const calculatedGst = (totalAfterDiscount * GST_RATE).toFixed(2);

  return (
    <div className="md:w-1/2 w-full bg-gray-300 p-8">
      <div className="bg-white h-full w-full">
        <div className="md:px-20 px-8 py-8">
          <h3 className="text-gray-900 font-bold text-2xl">Order Summary</h3>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-900 text-sm font-bold">Sub Total</p>
              <p className="text-gray-900 text-sm font-bold">₹{subTotal || calculatedSubTotal}</p>
            </div>
            {appliedCoupon && (discountAmount || calculatedDiscountAmount) !== "0.00" && (
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-900 text-sm font-bold">Discount</p>
                <p className="text-red-500 text-sm font-bold">-₹{discountAmount || calculatedDiscountAmount}</p>
              </div>
            )}
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-900 text-sm font-bold">Shipping Cost</p>
              <p className="text-gray-900 text-sm font-bold">
               +  {isDeliveryAvailable ? `₹${shippingCost.toFixed(2)}` : "Save Address to get shipping cost"}
              </p>
            </div>
            {/* {isDeliveryAvailable && deliveryEstimate.days && (
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-900 text-sm font-bold">Estimated Delivery</p>
                <p className="text-gray-900 text-sm font-bold">
                  {deliveryEstimate.days} days ({deliveryEstimate.date})
                </p>
              </div>
            )} */}
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-900 text-sm font-bold uppercase">GST (18%)</p>
              <p className="text-gray-900 text-sm font-bold">
                + ₹{gstAmount || calculatedGst}
              </p>
            </div>
            <hr />
            <div className="flex justify-between items-center py-2">
              <p className="text-gray-900 text-sm font-bold">Grand Total</p>
              <p className="text-gray-900 uppercase text-sm font-bold">₹{totalPrice || (parseFloat(totalAfterDiscount) + parseFloat(gstAmount || calculatedGst) + parseFloat(shippingCost || 0)).toFixed(2)}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-500 text-sm mt-1">
                For Business Use Only, Company Name and state listed in GST registration must match billing address.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}