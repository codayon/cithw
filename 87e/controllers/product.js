const createProduct = async (req, res) => {
  try {
    res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { createProduct };
