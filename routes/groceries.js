const { Router } = require("express");
const session = require("express-session");
const router = Router();

const groceries = [
  {
    item: "Milk",
    price: "$2",
  },
  {
    item: "Bread",
    price: "$1.50",
  },
];

const list = [
  {
    item: "Milk",
    price: "$2",
  },
  {
    item: "Bread",
    price: "$1.50",
  },
];

router.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

router.get("/", (req, res) => {
  console.log("List");
  res.cookie("visited", true, {
    maxAge: 60000,
  });
  res.send(groceries);
});

router.get("/:item", (req, res) => {
  console.log(req.cookies);
  const { item } = req.params;
  const product = groceries.find((i) => i.item === item);
  res.send(product);
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
  groceries.push(req.body);
});

router.get("/shopping/cart", (req, res) => {
  const { cart } = req.session;
  console.log("Cart");
  if (!cart) {
    res.send("You have no cart session");
  } else {
    res.send(cart);
  }
});

router.post("/shopping/cart/item", (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  const { cart } = req.session;
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.sendStatus(201);
});

module.exports = router;
