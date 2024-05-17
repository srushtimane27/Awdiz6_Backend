import ProductSchema from "../schemas/product.schema.js";

export const addProduct = async (req, res) => {
    try {
      const { name, category, price, quantity, tags } = req.body.productData;
      const { userId } = req.body;
      if (!name || !category || !price || !quantity || !tags) {
        return res.json({ success: false, error: "All fields are required" });
      }
      const newProduct = new ProductSchema({
        name: name,
        category: category,
        price: price,
        quantity: quantity,
        tags: tags,
        user: userId,
      });
      await newProduct.save();
      return res.json({ success: true, error: "Product successfully stored" });
    } catch (error) {
      return res.json({ success: false, error });
    }
  };

export const getProductsByCategoryPrice = async (req, res) => {
    try {
      const { category, price } = req.body;
      const aggregation = [
        {
          // $match: {category: "Laptop", price: {$gt: 10000 }}
          $match: { category: category, price: { $gt: price } },
        },
        {
          $group: {
            _id: "$product",
            totalQuantity: { $sum: "$quantity" },
            totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } },
          },
        },
      ];
      const filterredProducts = await ProductSchema.aggregate(aggregation);
      console.log(filterredProducts, "filterredProducts");
      res.send(true);
    } catch (error) {
      return res.json({ success: false, error });
    }
  };

export const getProductsBySeller = async (req, res) => {
    try {
      const { userId } = req.body;
      console.log(userId,"userId");
      const products = await ProductSchema.find({ user: userId }).populate(
        "user"
      );
      res.json({success: true,products});
    } catch (error) {
      console.log(error);
      return res.json({ success: false, error });
    }
  };

export const getAllProducts =async (req, res) => {
    try {
      const products = await ProductSchema.find({});
      return res.json({ success: true, products });
    } catch (error) {
      console.log(error, "error");
      return res.json({ error, success: false });
    }
  };

