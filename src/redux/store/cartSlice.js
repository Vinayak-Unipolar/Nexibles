import { createSlice } from '@reduxjs/toolkit';

const generateItemKey = (product) => {
  const optionsString = JSON.stringify(product.selectedOptions || {});
  // Include product.name to ensure unique items for different names
  return `${product.id}-${product.name}-${product.skuCount}-${product.category}-${optionsString}`;
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
      if (!product.id || !product.name || !product.quantity || !product.totalPrice) {
        console.warn('Invalid product data:', product);
        return;
      }
      const itemKey = generateItemKey(product);
      const existingItem = state.items.find(item => item.itemKey === itemKey);

      if (existingItem) {
        // Update quantity and totalPrice for existing item
        existingItem.quantity += product.quantity;
        existingItem.totalPrice += product.totalPrice;
      } else {
        // Add new item with unique key
        state.items.push({
          ...product,
          itemKey,
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
      // Reset coupon-related discount fields
      state.items = state.items.map(item => ({
        ...item,
        discountedPrice: undefined,
        discountAmount: undefined,
        discountPercentage: undefined,
      }));
    },
    setGST: (state, action) => {
      state.gstAmount = Number(action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
      state.gstAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItems,
  setCoupon,
  removeCoupon,
  setGST,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;