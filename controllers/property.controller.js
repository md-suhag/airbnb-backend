const Property = require("../models/property.model");

const addProperty = async (req, res) => {
  const {
    title,
    description,
    category,
    location,
    pricePerNight,
    maxGuests,
    images,
    amenities,
    owner,
    availability,
  } = req.body;

  try {
    if (!title || typeof title !== "string") {
      return res.status(400).json({
        success: false,
        message: "Title is required and must be a string",
      });
    }

    if (!description || typeof description !== "string") {
      return res.status(400).json({
        success: false,
        message: "Description is required and must be a string",
      });
    }

    if (!owner) {
      return res
        .status(400)
        .json({ success: false, message: "Owner ID is required" });
    }

    if (!pricePerNight || isNaN(pricePerNight) || pricePerNight <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price per night must be a positive number",
      });
    }

    if (!maxGuests || isNaN(maxGuests) || maxGuests <= 0) {
      return res.status(400).json({
        success: false,
        message: "Maximum guests must be a positive number",
      });
    }

    const newProperty = new Property({
      title,
      description,
      category,
      location,
      pricePerNight,
      maxGuests,
      images,
      amenities,
      owner,
      availability,
    });

    const savedProperty = await newProperty.save();

    res.status(201).json({
      success: true,
      message: "Property added successfully",
      data: savedProperty,
    });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

const getPropertyByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const properties = await Property.find({ category: { $in: [category] } });

    if (!properties.length) {
      return res.status(404).json({
        success: false,
        message: "No properties found for this category",
      });
    }

    res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error("Error fetching properties by category:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

const getFilteredProperties = async (req, res) => {
  const { category, priceRange, location, amenities, maxGuests } = req.body;

  try {
    let query = {};

    if (category && category.length > 0) {
      query.category = { $in: category };
    }

    if (priceRange && priceRange.min && priceRange.max) {
      query.pricePerNight = { $gte: priceRange.min, $lte: priceRange.max };
    }

    if (location) {
      if (location.city) query["location.city"] = location.city;
      if (location.country) query["location.country"] = location.country;
    }

    if (amenities && amenities.length > 0) {
      query.amenities = { $all: amenities };
    }

    if (maxGuests) {
      query.maxGuests = { $gte: maxGuests };
    }

    const properties = await Property.find(query);

    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No properties found with the given filters",
      });
    }

    res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error("Error fetching filtered properties:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

module.exports = {
  addProperty,
  getPropertyByCategory,
  getFilteredProperties,
};
