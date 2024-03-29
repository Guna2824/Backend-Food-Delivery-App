const express = require("express");
const router = express.Router();
const food = require("../models/FoodSchema");
const zone = require("../models/ZoneSchema");

router.get("/getdata", async (req, res) => {
  try {
    const foodItem = await food.find();
    res.status(200).json(foodItem);
  } catch (err) {
    res.status(400).send(err.message);
    console.error(err);
  }
});

router.put("/additem", async (req, res) => {
  const { dish, type, unit, unitPrice } = req.body;
  const additem = await food.findOne({ dish: dish });

  if (!additem) {
    try {
      const response = await food.insertMany({
        dish: dish,
        type: type,
        unit: unit,
        unitPrice: unitPrice,
      });
      res.status(201).send("FoodItem Add DB ");
    } catch (err) {
      res.status(400).send(err.message);
      console.error(err);
    }
  } else {
    res.status(208).send("FoodItem Already Exsit in DB");
  }
});

router.post("/orderfood", async (req, res) => {
  const { dish, count, city } = req.body;

  let type;
  let typePrice;
  let unit;
  let unitPrice;
  let kmPrice;
  var baseKmPrice = 10;
  try {
    const foodDB = await food.findOne({ dish: dish });
    type = foodDB.type;
    unit = foodDB.unit;
    unitPrice = foodDB.unitPrice;
  } catch (err) {
    res.status(400).send(err.message);
    console.error(err);
  }

  try {
    const zoneDB = await zone.findOne({ city: city });
    kmPrice = zoneDB.kmPrice;
  } catch (err) {
    res.status(400).send(err.message);
    console.error(err);
  }

  if (type === "persihable") {
    typePrice = 1.5;
  } else {
    typePrice = 1;
  }

  const foodAmount = unitPrice * count;
  const zoneAmount = (baseKmPrice + kmPrice) * typePrice;
  const total = Math.round(foodAmount + zoneAmount);

  const response = await [
    {
      dish: dish,
      type: type,
      zone: city,
      unit: unit,
      typePrice: typePrice,
      unitPrice: unitPrice,
      count: count,
      baseKmPrice: baseKmPrice,
      kmPrice: kmPrice,
      total: total,
    },
  ];
  res.status(200).send(response);
  console.log("Food Order Recived Amount " + total);
});

module.exports = router;
