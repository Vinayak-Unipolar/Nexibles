import { createSlice } from '@reduxjs/toolkit';

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
      
      // Check for existing item by both `id` and `skuCount`
      const existingItem = state.items.find(item => item.id === product.id && item.skuCount === product.skuCount);
      
      if (existingItem) {
        // If the same product with the same SKU exists, update quantity and total price
        existingItem.quantity += product.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        // If the SKU is different or it's a new product, add it as a separate entry
        state.items.push({
          id: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
          price: product.price,
          quantity: product.quantity,
          totalPrice: product.totalPrice,
          skuCount: product.skuCount,
          material: product.material  // Ensure SKU is stored properly
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