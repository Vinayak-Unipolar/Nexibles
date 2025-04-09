import React from 'react';

const ShippingPolicy = () => {
    return (
        <div className="h-auto bg-white p-16">
            <h2 className="text-gray-900 font-bold text-3xl text-center mb-8">Shipping & Delivery Policy</h2>
            <div className="text-gray-900">
                <h2 className="font-semibold text-xl mb-4">Last updated: 28-02-2024 12:30:59</h2>
                <div className="">
                    <p>
                        For our international customers, we dispatch orders using registered international courier companies and/or international speed post exclusively. Domestic orders are shipped through registered domestic courier companies and/or speed post. Our goal is to send out orders within 3-5 business days or according to the agreed-upon delivery date confirmed during the order process. The actual delivery time is contingent on the norms of the courier company or post office.
                    </p> <br />
                    <p>
                        Nexibles is not responsible for any delays in delivery caused by courier companies or postal authorities. We assure you that we will hand over the consignment to the courier company or postal authorities within 3-5 business days from the date of the order and payment or as per the agreed-upon delivery date. The delivery will be made to the address specified by the buyer during the order placement. You will receive confirmation of service delivery at your registered email address.
                    </p> <br />
                    <p>
                        If you encounter any issues while using our services, please don&apos;t hesitate to contact our helpdesk at <a className="text-red-500" href="mailto:support@nexibles.com">support@nexibles.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
