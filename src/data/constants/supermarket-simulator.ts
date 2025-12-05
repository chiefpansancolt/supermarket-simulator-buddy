export const SHELF_TYPE = "shelf";
export const FRIDGE_TYPE = "fridge";
export const FREEZER_TYPE = "freezer";
export const STALL_TYPE = "stall";
export const PEGBOARD_TYPE = "pegboard";
export const GARMENT_RACK_TYPE = "garment_rack";

export const EDIBLE_CATEGORY = "edible";
export const PRODUCE_CATEGORY = "produce";
export const DRINK_CATEGORY = "drink";
export const CLEANING_CATEGORY = "cleaning";
export const BOOK_CATEGORY = "books";
export const CLOTH_CATEGORY = "cloth";
export const ELECTRONICS_CATEGORY = "electronics";
export const HARDWARE_CATEGORY = "hardware";
export const KITCHEN_CATEGORY = "kitchen";
export const PET_CATEGORY = "pet";

export const DISPLAY_TYPES = [
  SHELF_TYPE,
  FRIDGE_TYPE,
  FREEZER_TYPE,
  STALL_TYPE,
  PEGBOARD_TYPE,
  GARMENT_RACK_TYPE,
] as const;

export const CATEGORIES = [
  EDIBLE_CATEGORY,
  PRODUCE_CATEGORY,
  DRINK_CATEGORY,
  CLEANING_CATEGORY,
  BOOK_CATEGORY,
  CLOTH_CATEGORY,
  ELECTRONICS_CATEGORY,
  HARDWARE_CATEGORY,
  KITCHEN_CATEGORY,
  PET_CATEGORY,
] as const;
