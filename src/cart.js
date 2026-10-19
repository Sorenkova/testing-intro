const PROMO_CODE = "SAVE10";
const PROMO_DISCOUNT_PERCENT = 10;
const PROMO_MIN_SUBTOTAL = 20000;
const FREE_DELIVERY_THRESHOLD = 50000;
const DELIVERY_PRICE = 30000;

function addToCart(cart, product, quantity = 1) {
  const existing = cart.find((item) => item.id === product.id);
  const newQuantity = (existing ? existing.quantity : 0) + quantity;

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError("Количество должно быть положительным целым числом");
  }
  if (newQuantity > product.stock) {
    throw new RangeError("Количество не может превышать остаток на складе");
  }

  if (!existing) return [...cart, { ...product, quantity }];
  return cart.map((item) =>
    item.id === product.id ? { ...item, quantity: newQuantity } : item,
  );
}

function changeQuantity(cart, productId, quantity) {
  const existing = cart.find((item) => item.id === productId);
  if (!existing) return [...cart];

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError("Количество товара не может быть меньше 1");
  }
  if (quantity > existing.stock) {
    throw new RangeError("Количество не может превышать остаток на складе");
  }

  return cart.map((item) =>
    item.id === productId ? { ...item, quantity } : item,
  );
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode = "") {
  const subtotal = calculateCartSubtotal(cart);
  const isPromoApplied =
    String(promoCode).trim().toUpperCase() === PROMO_CODE &&
    subtotal >= PROMO_MIN_SUBTOTAL;
  const discount = isPromoApplied
    ? Math.round((subtotal * PROMO_DISCOUNT_PERCENT) / 100)
    : 0;
  const delivery = subtotal < FREE_DELIVERY_THRESHOLD ? DELIVERY_PRICE : 0;

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
