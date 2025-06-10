import React from "react";
import RequestForm from "@/components/RequestForm";

function RequestFormPage() {
  return (
    <div className="py-4 sm:py-8 bg-[#ece0cc] min-h-screen">
      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 p-2">
            <RequestForm
              isModal={false}
              containerClassName="p-2 bg-white rounded-lg shadow-md"
              title="Request a Free Quote"
            />
          </div>
          <div className="p-6 lg:col-span-1">
            <h3 className="pb-2 mb-4 text-xl font-bold text-gray-800 border-b-2 border-orange-500">
              Let us Build Your Packaging Breakthrough
            </h3>
            <div className="space-y-6">
              <div>
                  <p className="text-sm font-medium text-gray-800">
                    Industry Leading Turnaround Times
                  </p>
                  <p className="mt-1 text-sm text-black">
                    At Nexibles, we believe packaging is more than a product — it’s a powerful storyteller for your brand. Whether you’re launching a bold new idea or scaling an existing business, your packaging should move at the speed of your dreams — without compromises on quality, cost, or creativity.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {`That's exactly what Nexibles was created for.`}
                  </p>
                  <p className="mt-1 text-sm text-black">
                    {`When you request a free quote, you're not just asking for a price.`}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    You’re taking the first step towards a smarter, faster, more flexible way to bring your brand to life.
                  </p>
                  <h3 className="pb-2 mb-4 text-xl mt-6 font-bold text-gray-800 border-b-2 border-orange-500">
                    Here’s What Happens Next
                  </h3>
                </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Our team of packaging experts will review your requirements.
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  We’ll suggest the best options suited to your product, budget, and goals.
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  We’ll send you a detailed, transparent quote — no hidden costs, no surprises.
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  We’ll guide you through every step if you choose to move forward — from artwork to material selection to final production.
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  And it all starts right here — with a simple form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestFormPage;