export const mapSection = (index: number) => {
  switch (index) {
    case 0:
      return "banner";
    case 1:
      return "intro";
    case 2:
      return "feature";
    default:
      return "banner";
  }
};
