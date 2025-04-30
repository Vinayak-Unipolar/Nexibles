import React from 'react';

const ReturnPolicy = () => {
    return (
        <div className="h-auto bg-white p-16">
            <h2 className="text-gray-900 text-3xl font-semibold text-center mb-8">Return & Refund Policy </h2>
            <div>
                <div className="text-gray-900 text-base">
                    <h4 className="font-bold mb-1">Refund Process:</h4>
                    <p className='mb-1'>
                        Refund, if any, shall be made at the same issuing bank through which the Product/Service was purchased. For cash on delivery transactions, the Member has the option to receive the refund in any bank account via NEFT and it is the responsibility of the Member to share the valid bank details to avail the said return. Refund shall be made in Indian Rupees only and shall be equivalent to the Transaction Price received in Indian Rupees.
                    </p>
                    <p className='mb-1'>
                        For payments made through electronic means like debit card, credit card, net banking, wallet etc. refund shall be made using the same payment mode or any other online banking / electronic funds transfer system approved by Reserve Bank India (RBI). Refunds may be supported for select banks. Where a bank is not supported for processing refunds, you will be required to share alternate bank account details with us for processing the refund. Refund shall be conditional and shall be with recourse available to VistaPrint in case of any misuse by you. We may also request you for additional documents for verification.
                    </p>
                    <h4 className="font-bold mb-1">Transaction Restrictions:</h4>
                    <p className='mb-1'>
                        VistaPrint reserves the right to refuse to process transactions from you if you have a prior history of questionable charges including without limitation breach of any agreements by you with VistaPrint or breach/violation of any law or any charges imposed by Issuing Bank or breach of any policy.
                    </p>
                    <h4 className="font-bold mb-1">Refund Verification:</h4>
                    <p className='mb-1'>
                        On request from You, VistaPrint will provide ARN (Acquirer Reference Number) or UTR (Unique Transaction Reference Number) to you for refunds made to you. However, in an event of non-receipt of such a refund in the designated Bank Account it will be your responsibility to provide VistaPrint with the set of documents required to support the claim of non-receipt.
                    </p>
                    <p className='mb-1'>
                        VistaPrint through its payments service provider shall initiate the refund procedure subject to satisfactory verification of the documents provided by the member.
                    </p>
                    <h4 className="font-bold mb-1">Merchant Credit Option:</h4>
                    <p className='mb-1'>
                        If you chose to avail Merchant Credit in lieu of refund, such credit will be available for use by you for a period of (45) forty-five days. Post such period, the Merchant Credit shall lapse and would not be usable for any future payments by you.
                    </p>
                    <h4 className="font-bold mb-1">Contact Information:</h4>
                    <p className='mb-1'>
                        If you have any questions or concerns about our Refund Policy, please contact our Customer Support team at <a className="text-red-500" href="mailto:support@nexibles.com">support@nexibles.com</a>
                    </p>
                    
                </div>
            </div>
        </div>
    )
}

export default ReturnPolicy;