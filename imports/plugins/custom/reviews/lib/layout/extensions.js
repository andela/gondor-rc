import extensions from "../../../digital-products/lib/layout/extensions";

const reviewBlock = {
  component: "ReviewArea"
};

const extendedSimpleLayout = extensions.extendedSimpleLayout;

extendedSimpleLayout[2].children.push(reviewBlock);

const extendedTwoColumnLayout = extensions.extendedTwoColumnLayout;
extendedTwoColumnLayout[1].children.push(reviewBlock);

export default {
  extendedSimpleLayout,
  extendedTwoColumnLayout
};
