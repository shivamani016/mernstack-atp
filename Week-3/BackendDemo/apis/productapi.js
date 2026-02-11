import exp from 'express'

// mini express router
export const productApp = exp.Router()

let products = []

// GET all products
productApp.get('/products', (req, res) => {
  res.status(200).json({
    message: "All products",
    payload: products
  })
})

// POST product
productApp.post('/products', (req, res) => {
  products.push(req.body)
  res.status(201).json({
    message: "Product created",
    payload: products
  })
})

// PUT product
productApp.put('/products', (req, res) => {
  let updatedProduct = req.body

  let index = products.findIndex(
    p => p.productId === updatedProduct.productId
  )

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" })
  }

  products[index] = updatedProduct
  res.status(200).json({ message: "Product updated", payload: products })
})

// GET product by ID
productApp.get('/products/:productId', (req, res) => {
  let pid = Number(req.params.productId)

  let product = products.find(p => p.productId === pid)
  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  res.status(200).json({ message: "Product found", payload: product })
})

// DELETE product
productApp.delete('/products/:productId', (req, res) => {
  let pid = Number(req.params.productId)

  let index = products.findIndex(p => p.productId === pid)
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" })
  }

  products.splice(index, 1)
  res.status(200).json({ message: "Product deleted", payload: products })
})

//get product using brand
productApp.get("/products-brand/:brand", (req, res) => {
  let pbrand = req.params.brand.toLowerCase();
  let productsBybrand = products.filter((product) => product.brand.toLowerCase() === pbrand);
  if (!productsBybrand || productsBybrand?.length === 0) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json({ message: "products by brand", payload: productsBybrand });
});