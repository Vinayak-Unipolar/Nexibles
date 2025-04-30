import { createSlice } from '@reduxjs/toolkit';
import { createHash } from 'crypto'; // Node.js crypto for hashing

const generateItemKey = (product) => {
  const optionsString = JSON.stringify(product.selectedOptions || {});
  const hash = createHash('sha256')
    .update(`${product.id}-${product.skuCount}-${product.category}-${optionsString}`)
    .digest('hex')
    .slice(0, 16);
  return hash;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    appliedCoupon: null,
    gstAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const itemKey = generateItemKey(product);

      // Check for existing item by unique key
      const existingItem = state.items.find(item => item.itemKey === itemKey);

      if (existingItem) {
        // Update quantity and total price for matching item
        existingItem.quantity += product.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        // Add new item with unique key
        state.items.push({
          ...product,
          itemKey,
          id: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
          price: product.price,
          quantity: product.quantity,
          totalPrice: product.totalPrice,
          skuCount: product.skuCount,
          material: product.material,
          selectedOptions: product.selectedOptions,
        });
      }
    },
    removeFromCart: (state, action) => {
      const index = action.payload;
      state.items = state.items.filter((_, i) => i !== index);
    },
    updateCartItems: (state, action) => {
      state.items = action.payload;
    },
    setCoupon: (state, action) => {
      state.appliedCoupon = action.payload;
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.items = state.items.map(item => ({
        ...item,
        discountedPrice: undefined,
        discountAmount: undefined,
        discountPercentage: undefined,
      }));
    },
    setGST: (state, action) => {
      state.gstAmount = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItems,
  setCoupon,
  removeCoupon,
  setGST
} = cartSlice.actions;
export default cartSlice.reducer;