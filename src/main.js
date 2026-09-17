// task 1
function createProduct(name, price, quantity, tagsString) {
  const available = quantity > 0;
  const tags = tagsString.split(',');

  if (!tags.includes('popular')) {
    tags.push('popular');
  }

  return {
    name,
    price,
    quantity,
    available,
    tags,
  };
}

console.log(createProduct('Навушники', 2500, 8, 'audio,wireless'));

// task 2
const products = [];

function addProduct(products, name, price, quantity, tagsString) {
  const newProduct = createProduct(name, price, quantity, tagsString);

  products.push(newProduct);
  return newProduct;
}

addProduct(products, 'Ноутбук', 32000, 4, 'tech,work');
addProduct(products, 'Навушники', 2500, 8, 'audio,wireless');
addProduct(products, 'Миша', 1200, 3, 'gaming');

console.log(products);

// task 3
function findProduct(products, productName) {
  const normalizedName = productName.toLowerCase();

  for (const product of products) {
    if (product.name.toLowerCase() === normalizedName) {
      return product;
    }
  }

  return null;
}

console.log(findProduct(products, 'НАВУШНИКИ'));
console.log(findProduct(products, 'Клавіатура'));

// task 4
function createOrderItem(products, productName, orderedQuantity) {
  const foundProduct = findProduct(products, productName);

  if (
    !foundProduct ||
    orderedQuantity <= 0 ||
    orderedQuantity > foundProduct.quantity
  ) {
    return null;
  }

  foundProduct.quantity -= orderedQuantity;

  if (foundProduct.quantity <= 0) {
    foundProduct.available = false;
  }

  const total = foundProduct.price * orderedQuantity;

  return {
    name: foundProduct.name,
    price: foundProduct.price,
    quantity: orderedQuantity,
    total,
  };
}

console.log(createOrderItem(products, 'Навушники', 2));
console.log(products);

console.log(createOrderItem(products, 'Миша', 3));
console.log(products);

// task 5

const store = {
  products,
  orders: [],

  createOrder(customer, ...requests) {
    const items = [];
    let total = 0;

    for (const request of requests) {
      const order = createOrderItem(
        this.products,
        request.productName,
        request.quantity
      );

      if (!order) {
        continue;
      }

      total += order.total;
      items.push(order);
    }

    if (items.length === 0) {
      return null;
    }

    const objOrder = {
      customer,
      items,
      total,
      status: 'new',
    };

    this.orders.push({ ...objOrder });

    return objOrder;
  },
};

const order = store.createOrder(
  'Олена',
  { productName: 'Навушники', quantity: 2 },
  { productName: 'Миша', quantity: 1 }
);

console.log(order);
console.log(store.orders);
console.log(store.products);
