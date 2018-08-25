import { replaceComponent, getRawComponent } from "@reactioncommerce/reaction-components";
import onboard from "../onboard";
import { productSteps } from "../tourSteps";


const ProductDetail = getRawComponent("ProductDetail");

class CustomProductDetail extends ProductDetail {
  componentDidMount() {
    if (RegExp("introMulti", "gi").test(window.location.search)) {
      setTimeout(() => {
        onboard.autoProductTour(productSteps, true);
      }, 2000);
    } else {
      setTimeout(() => {
        onboard.autoProductTour(productSteps);
      }, 2000);
    }
  }
}
replaceComponent("ProductDetail", CustomProductDetail);

export default CustomProductDetail;
