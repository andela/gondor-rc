import PdpSimpleLayout from "/imports/plugins/included/product-detail-simple/lib/layout/simple";
import PdpTwoColumnLayout from "/imports/plugins/included/product-detail-simple/lib/layout/twoColumn.js";

const digitalProductBlock = {
  component: "DigitalProductAreaContainer"
};

const extendedSimpleLayout = PdpSimpleLayout();
extendedSimpleLayout[2].children.splice(3, 0, digitalProductBlock);

const extendedTwoColumnLayout = PdpTwoColumnLayout();
extendedTwoColumnLayout[1].children.splice(4, 0, digitalProductBlock);

export default {
  extendedSimpleLayout,
  extendedTwoColumnLayout
};
