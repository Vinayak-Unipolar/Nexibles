import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Image from 'next/image';

const Configuration = () => {
  // State management
  const [product, setProduct] = useState(null);
  const [jobName, setJobName] = useState('');
  const [sizeOptions, setSizeOptions] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [gusset, setGusset] = useState('');
  const [materialOptions, setMaterialOptions] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [mandatoryProcesses, setMandatoryProcesses] = useState([]);
  const [optionalProcesses, setOptionalProcesses] = useState([]);
  const [selectedOptionalProcesses, setSelectedOptionalProcesses] = useState([]);
  const [zipperOptions, setZipperOptions] = useState([]);
  const [selectedZipper, setSelectedZipper] = useState(null);
  const [quantityOne, setQuantityOne] = useState('');
  const [quantityTwo, setQuantityTwo] = useState('');
  const [quantityThree, setQuantityThree] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Login to get token
  const loginForThirdParty = async () => {
    try {
      const response = await fetch("https://nexiblesapp.barecms.com/proxy?r=user/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "sales@artnext.in",
          password: "Artnext@1",
          subdomain: "nexibles",
          otp: false,
          ipaddress: "58.84.60.235",
        }),
      });

      const result = await response.json();
      if (result.status) {
        localStorage.setItem("token2", result.data.token);
        return result.data.token;
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (err) {
      setError("Failed to authenticate. Please try again.");
      return null;
    }
  };

  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token2") || (await loginForThirdParty());
        if (!token) throw new Error("No authentication token");

        const response = await fetch(
          "https://nexiblesapp.barecms.com/proxy?r=products/get-product-list&product_type=8&press_id=82&limit=10&offset=0",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Environment: "frontdesk",
            },
          }
        );

        const data = await response.json();
        if (data.status && data.data) {
          // Find product with ID "122"
          const targetProduct = data.data.find((p) => p.id === "122");
          if (!targetProduct) throw new Error("Product ID 122 not found");

          setProduct(targetProduct);

          // Generate 10 size combinations
          const { minimum_width, maximum_width, minimum_length, maximum_length } = targetProduct;
          const widthStep = (parseInt(maximum_width) - parseInt(minimum_width)) / 9;
          const lengthStep = (parseInt(maximum_length) - parseInt(minimum_length)) / 9;
          const sizes = Array.from({ length: 10 }, (_, i) => {
            const width = Math.round(parseInt(minimum_width) + i * widthStep);
            const length = Math.round(parseInt(minimum_length) + i * lengthStep);
            return {
              value: `${width}x${length}`,
              label: `${width} x ${length} mm`,
              width,
              length,
            };
          });
          setSizeOptions(sizes);

          // Set material options
          const materials = targetProduct.pouch_media.map((m) => ({
            value: m.id,
            label: m.media_title,
            widths: m.media_widths ? m.media_widths.split(',') : [],
          }));
          setMaterialOptions(materials);

          // Set mandatory and optional processes
          const mandatory = targetProduct.pouch_postpress
            .filter((p) => p.mandatory || p.mandatory_any_one)
            .map((p) => p.process_name);
          setMandatoryProcesses(mandatory);

          const optional = targetProduct.pouch_postpress
            .filter((p) => p.optional && !p.mandatory_any_one)
            .map((p) => ({
              id: p.id,
              name: p.process_name,
            }));
          setOptionalProcesses(optional);

          // Set zipper options (mandatory_any_one)
          const zippers = targetProduct.pouch_postpress
            .filter((p) => p.mandatory_any_one)
            .map((p) => ({
              value: p.id,
              label: p.process_name,
            }));
          setZipperOptions(zippers);
          setSelectedZipper(zippers[0] || null);
        } else {
          throw new Error(data.message || "Failed to fetch product data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  // Handle optional process checkbox changes
  const handleOptionalProcessChange = (processId) => {
    setSelectedOptionalProcesses((prev) =>
      prev.includes(processId)
        ? prev.filter((id) => id !== processId)
        : [...prev, processId]
    );
  };

  // Validate quantities
  const validateQuantity = (value, field) => {
    const num = parseInt(value);
    if (value && (isNaN(num) || num <= 0)) {
      return `${field} must be a positive number`;
    }
    return '';
  };

  // Render loading and error states
  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Main Configuration Form */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Pouch Configuration</h2>

        {/* Job Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Name
          </label>
          <input
            type="text"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter project name"
          />
        </div>

        {/* Size Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size (Width x Length)
          </label>
          <Select
            options={sizeOptions}
            value={selectedSize}
            onChange={setSelectedSize}
            className="w-full"
            placeholder="Select size"
          />
        </div>

        {/* Gusset Input (if required) */}
        {product?.is_width_gusset_master_required === "1" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gusset (mm)
            </label>
            <input
              type="number"
              value={gusset}
              onChange={(e) => setGusset(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter gusset size"
            />
          </div>
        )}

        {/* Material Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Material
          </label>
          <Select
            options={materialOptions}
            value={selectedMaterial}
            onChange={setSelectedMaterial}
            className="w-full"
            placeholder="Select material"
          />
          {selectedMaterial && (
            <p className="text-sm text-gray-500 mt-1">
              Available widths: {selectedMaterial.widths.join(', ')} mm
            </p>
          )}
        </div>

        {/* Zipper Selection */}
        {zipperOptions.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zipper Type
            </label>
            <Select
              options={zipperOptions}
              value={selectedZipper}
              onChange={setSelectedZipper}
              className="w-full"
              placeholder="Select zipper type"
            />
          </div>
        )}

        {/* Quantities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity 1
            </label>
            <input
              type="number"
              value={quantityOne}
              onChange={(e) => setQuantityOne(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter quantity"
            />
            {quantityOne && validateQuantity(quantityOne, 'Quantity 1') && (
              <p className="text-red-500 text-sm">{validateQuantity(quantityOne, 'Quantity 1')}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity 2 (Optional)
            </label>
            <input
              type="number"
              value={quantityTwo}
              onChange={(e) => setQuantityTwo(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter quantity"
            />
            {quantityTwo && validateQuantity(quantityTwo, 'Quantity 2') && (
              <p className="text-red-500 text-sm">{validateQuantity(quantityTwo, 'Quantity 2')}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity 3 (Optional)
            </label>
            <input
              type="number"
              value={quantityThree}
              onChange={(e) => setQuantityThree(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter quantity"
            />
            {quantityThree && validateQuantity(quantityThree, 'Quantity 3') && (
              <p className="text-red-500 text-sm">{validateQuantity(quantityThree, 'Quantity 3')}</p>
            )}
          </div>
        </div>

        {/* Optional Processes */}
        {optionalProcesses.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Optional Processes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {optionalProcesses.map((process) => (
                <label key={process.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOptionalProcesses.includes(process.id)}
                    onChange={() => handleOptionalProcessChange(process.id)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">{process.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Preview Sidebar */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md sticky top-6 self-start">
        <h2 className="text-xl font-bold mb-4">Preview & Quotation</h2>
        {product && (
          <>
            <Image
              src={product.product_picture}
              alt={product.product_name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{product.product_name}</h3>
            <div className="mt-4 space-y-2">
              <p><strong>Job Name:</strong> {jobName || 'Not specified'}</p>
              <p>
                <strong>Size:</strong>{' '}
                {selectedSize ? `${selectedSize.width} x ${selectedSize.length} mm` : 'Not selected'}
              </p>
              {product.is_width_gusset_master_required === "1" && (
                <p><strong>Gusset:</strong> {gusset || 'Not specified'} mm</p>
              )}
              <p><strong>Material:</strong> {selectedMaterial?.label || 'Not selected'}</p>
              <p><strong>Zipper:</strong> {selectedZipper?.label || 'Not selected'}</p>
              <p><strong>Quantities:</strong> {quantityOne || 'N/A'}, {quantityTwo || 'N/A'}, {quantityThree || 'N/A'}</p>
              <p><strong>Mandatory Processes:</strong> {mandatoryProcesses.join(', ') || 'None'}</p>
              <p>
                <strong>Optional Processes:</strong>{' '}
                {selectedOptionalProcesses
                  .map((id) => optionalProcesses.find((p) => p.id === id)?.name)
                  .filter(Boolean)
                  .join(', ') || 'None'}
              </p>
            </div>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              onClick={() => alert('Quotation requested!')}
            >
              Request Quotation
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Configuration;