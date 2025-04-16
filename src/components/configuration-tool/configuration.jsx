import { useState } from 'react';
import Head from 'next/head';
import data from '@/components/configuration-tool/data.json';
import standuppouch from '@/../public/product/standuppouch.jpg';
import Image from 'next/image';

export default function Configuration() {
  const [quantity, setQuantity] = useState(1);
  const [designNames, setDesignNames] = useState(['']);
  const [selectedQuantities, setSelectedQuantities] = useState([100]);
  const [selectedSize, setSelectedSize] = useState(data.sizes[0]);

  const handleQuantityChange = (index, value) => {
    const updated = [...selectedQuantities];
    updated[index] = parseInt(value);
    setSelectedQuantities(updated);
  };

  const subtotal = selectedQuantities.reduce((total, q) => total + (selectedSize.price * q), 0);
  const tax = +(subtotal * 0.1).toFixed(2); // 10% tax
  const total = +(subtotal + tax).toFixed(2);
  const totalQuantity = selectedQuantities.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <Head>
        <title>Pouch Configuration Tool</title>
        <meta name="description" content="Set up your pouch step by step" />
      </Head>

      <div className="mx-auto">
        <h1 className="text-2xl font-medium text-center mb-1">Configuration Tool</h1>
        <h2 className="text-lg text-center mb-6">Set Up Your Pouch Step By Step</h2>

        <div className="bg-gray-200 rounded-lg p-8">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="md:w-2/3">
              {/* Project Name */}
              <div className="mb-6 md:w-1/2">
                <label className="block text-lg font-medium mb-2">Project Name</label>
                <input
                  type="text"
                  placeholder="Enter Project Name"
                  className="w-full md:w-11/12 px-4 py-2 rounded"
                />
              </div>

              {/* Pouch Features */}
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Pouch Features</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Sizes */}
                  <div>
                    <p className="text-sm mb-1">Sizes</p>
                    <select
                      className="w-full px-4 py-2 rounded"
                      onChange={(e) => {
                        const selected = data.sizes.find(
                          (s) => s.label === e.target.value
                        );
                        setSelectedSize(selected);
                      }}
                    >
                      {data.sizes.map((size, idx) => (
                        <option key={idx} value={size.label}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Material */}
                  <div>
                    <p className="text-sm mb-1">Material</p>
                    <select className="w-full px-4 py-2 rounded">
                      {data.materials.map((material, idx) => (
                        <option key={idx}>{material}</option>
                      ))}
                    </select>
                  </div>

                  {/* Optional Features */}
                  <div>
                    <p className="text-sm mb-1">Optional</p>
                    <select className="w-full px-4 py-2 rounded">
                      {data.optionalFeatures.map((feature, idx) => (
                        <option key={idx}>{feature}</option>
                      ))}
                    </select>
                  </div>

                  {/* Corners */}
                  <div>
                    <p className="text-sm mb-1">Types Of Corners</p>
                    <select className="w-full px-4 py-2 rounded">
                      {data.cornerTypes.map((corner, idx) => (
                        <option key={idx}>{corner}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SKU Quantity */}
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Quantity</label>
                <div className="mb-4">
                  <p className="text-sm mb-1">Number Of SKUs</p>
                  <select
                    className="w-full md:w-1/2 px-4 py-2 rounded"
                    value={quantity}
                    onChange={(e) => {
                      const q = parseInt(e.target.value);
                      setQuantity(q);
                      setDesignNames(Array(q).fill(''));
                      setSelectedQuantities(Array(q).fill(100));
                    }}
                  >
                    {data.skus.map((sku) => (
                      <option key={sku.id} value={sku.id}>{sku.id}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Design Names & Quantities */}
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lg font-medium mb-2">Design Names</label>
                    {[...Array(quantity)].map((_, index) => (
                      <div key={index} className="mb-3">
                        <input
                          type="text"
                          placeholder="Enter Name"
                          className="w-full px-4 py-2 rounded"
                          value={designNames[index] || ''}
                          onChange={(e) => {
                            const updated = [...designNames];
                            updated[index] = e.target.value;
                            setDesignNames(updated);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-lg font-medium mb-2">Quantity</label>
                    {[...Array(quantity)].map((_, index) => (
                      <div key={index} className="mb-3">
                        <select
                          className="w-full px-4 py-2 rounded"
                          value={selectedQuantities[index]}
                          onChange={(e) => handleQuantityChange(index, e.target.value)}
                        >
                          <option value={100}>100 Pcs</option>
                          <option value={200}>200 Pcs</option>
                          <option value={300}>300 Pcs</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quotation Summary */}
            <div className="md:w-1/3 flex flex-col items-center">
              
              <div className='mb-8'>
                <Image
                src={standuppouch}
                alt="Pouch Preview"
                className="mx-auto"
                width={180}
                height={300}
              />
              </div>

              <div className="w-3/4 bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-medium text-center mb-2">Quotation Total</h3>
                <div className="mb-2 flex justify-center">
                  <span>Configuration</span>
                </div>
                <hr className="mb-4" />

                <div className="mb-2 flex justify-between">
                  <span>Total Quantity</span>
                  <span>{totalQuantity} pcs</span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="mb-4 flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax}</span>
                </div>
                <hr className="mb-4" />
                <div className="mb-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <div className='flex w-3/4 gap-4 '>
              <button className=" w-full py-3 mt-4 rounded-xl bg-black text-white font-semibold shadow-md transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-black">
                Save
              </button>
              <button className=" w-full py-3 mt-4 rounded-xl bg-black text-white font-semibold shadow-md transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-black">
                Add To Cart
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
