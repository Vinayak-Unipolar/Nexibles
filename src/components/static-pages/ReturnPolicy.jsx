import React from 'react';

const ReturnPolicy = () => {
    return (
        <div className="h-auto bg-white p-16">
            <h2 className="text-gray-900 text-3xl font-semibold text-center mb-8">{`Return & Refund Policy`}</h2>
            <div>
                <div className="text-gray-900 text-base">
                    <p className='mb-2'>
                        {`Effective Date: 1st May 2025`}
                    </p>
                    <p className='mb-4'>
                        {`Art NEXT Pvt Ltd ("Nexibles", "we", "our", or "us") is committed to providing a seamless and satisfactory experience to our customers. This Return & Refund Policy outlines the terms under which returns and refunds are processed for products and services purchased through Nexibles.`}
                    </p>

                    <h4 className="font-bold mb-2 text-lg">{`1. Return Policy`}</h4>

                    <h5 className="font-bold mb-1">{`1.1 Eligibility for Returns`}</h5>
                    <p className='mb-3'>
                        {`You may be eligible to return a product if it meets the following conditions:`}
                    </p>
                    <p className='mb-1'>{`- The product is unused, undamaged, and in its original packaging.`}</p>
                    <p className='mb-1'>{`- The return request is initiated within 7 days from the date of delivery.`}</p>
                    <p className='mb-4'>{`- The product is not part of a non-returnable or customized item category.`}</p>

                    <h5 className="font-bold mb-1">{`1.2 Non-Returnable Items`}</h5>
                    <p className='mb-3'>
                        {`The following items are not eligible for return:`}
                    </p>
                    <p className='mb-1'>{`- Customized or personalized products.`}</p>
                    <p className='mb-1'>{`- Products damaged due to misuse or negligence.`}</p>
                    <p className='mb-4'>{`- Products returned without original packaging or proof of purchase.`}</p>

                    <h5 className="font-bold mb-1">{`1.3 Return Process`}</h5>
                    <p className='mb-3'>
                        {`To initiate a return, please contact our Customer Support team at support@nexibles.com with your order details and reason for return. Once your request is reviewed and approved, we will coordinate the reverse pickup or provide instructions for return shipping.`}
                    </p>
                    <p className='mb-1'>{`- Return shipping charges may apply unless the return is due to our error.`}</p>
                    <p className='mb-4'>{`- Upon receipt and inspection of the returned item, we will notify you regarding the status of your return.`}</p>

                    <h4 className="font-bold mb-2 text-lg">{`2. Refund Policy`}</h4>

                    <h5 className="font-bold mb-1">{`2.1 Refund Eligibility`}</h5>
                    <p className='mb-3'>
                        {`Refunds, if applicable, will be processed under the following conditions:`}
                    </p>
                    <p className='mb-1'>{`- Product/Service was cancelled or returned in accordance with our Return Policy.`}</p>
                    <p className='mb-4'>{`- The item was defective, damaged, or incorrect at the time of delivery.`}</p>

                    <h5 className="font-bold mb-1">{`2.2 Refund Method`}</h5>
                    <p className='mb-1'>{`- For prepaid transactions (credit/debit card, net banking, wallets, UPI, etc.), refunds will be credited to the original payment method or through an alternative RBI-approved electronic payment system, as applicable.`}</p>
                    <p className='mb-1'>{`- For Cash on Delivery (COD) orders, the refund will be processed via NEFT to a bank account shared by the customer. It is the customer's responsibility to provide accurate banking details.`}</p>
                    <p className='mb-4'>{`- All refunds are issued in Indian Rupees and are limited to the actual amount paid.`}</p>

                    <h5 className="font-bold mb-1">{`2.3 Refund Timelines`}</h5>
                    <p className='mb-4'>
                        {`Refunds are typically processed within 7–10 business days from the date of approval. Delays may occur depending on your bank or payment service provider.`}
                    </p>

                    <h5 className="font-bold mb-1">{`2.4 Refund Verification & Documentation`}</h5>
                    <p className='mb-4'>
                        {`In the event of a delay or non-receipt of a refund, Nexibles will provide the ARN (Acquirer Reference Number) or UTR (Unique Transaction Reference) upon request. If the refund is not reflected in your account, you must provide supporting documentation to help us verify and resolve the issue. Nexibles reserves the right to request additional information and documentation to prevent misuse.`}
                    </p>

                    <h5 className="font-bold mb-1">{`2.5 Merchant Credit Option`}</h5>
                    <p className='mb-4'>
                        {`If you opt for Merchant Credit instead of a monetary refund, the credit will remain valid for 45 days from the date of issue. Unused credit post this period will expire and cannot be redeemed for future purchases.`}
                    </p>

                    <h4 className="font-bold mb-2 text-lg">{`3. Transaction Restrictions`}</h4>
                    <p className='mb-3'>
                        {`Art NEXT Pvt Ltd reserves the right to deny processing of transactions and refunds under the following conditions:`}
                    </p>
                    <p className='mb-1'>{`- History of chargebacks or fraudulent activity.`}</p>
                    <p className='mb-1'>{`- Violation of company policies or terms of service.`}</p>
                    <p className='mb-4'>{`- Disputes with issuing banks or regulatory authorities.`}</p>

                    <h4 className="font-bold mb-2 text-lg">{`4. Contact Information`}</h4>
                    <p className='mb-3'>
                        {`For any questions, clarifications, or to initiate a return/refund request, please contact:`}
                    </p>
                    <p className='mb-1'>
                        {`📧 Email: `}<a className="text-red-500" href="mailto:support@nexibles.com">{`support@nexibles.com`}</a>
                    </p>
                    <p className='mb-1'>
                        {`🕒 Working Hours: Mon–Sat, 10 AM to 6 PM IST`}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ReturnPolicy;