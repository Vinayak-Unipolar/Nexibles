import React from "react";

const Infra = () => {
  return (
    <div className="h-auto mt-12 bg-white p-16">
      <h2 className="font-bold text-gray-900 text-center text-3xl mb-8">
        Infrastructure
      </h2>
      <div className="md:flex">
        <div className="md:w-1/2 w-full">
          <img src="/about/hp.png" alt="printer" className="" />
        </div>
        <div className="md:w-1/2 w-full">
            <h2 className="text-3xl font-bold">HP Indigo Technology</h2>
          <p className="py-4">
            Partnering with HP for digital printing of flexible packaging, all
            Nexibles products are printed inhouse on the HP Indigo 25k press .
            With the help of versatile and precise HP Indigo Electroinks, brands
            are able to deliver high-impact messages in every detail, appealing
            customers with never before seen innovation in print make businesses
            stand out while propelling growth. The press boasts of a wide web
            width which speeds up and multiplies productivity while offering
            benefits of economies of scale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Infra;
