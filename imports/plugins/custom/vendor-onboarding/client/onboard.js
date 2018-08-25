import { Reaction } from "/client/api";
import introJs from "intro.js";

const autoProductTour = (steps, override) => {
  const hasOnboardedProduct = JSON.parse(localStorage.getItem("product-onboard")) || false;
  if ((override || !hasOnboardedProduct) && Reaction.hasPermission("createProduct")) {
    const tour = introJs();

    tour.setOptions({
      showProgress: true,
      hidePrev: true,
      hideNext: true,
      scrollToElement: true,
      steps
    });
    tour.start();
    localStorage.setItem("product-onboard", "true");
  }
};
const autoDashboardTour = (steps) => {
  const hasOnboardedDashboard = JSON.parse(localStorage.getItem("dashboard-onboard")) || false;

  if (!hasOnboardedDashboard && Reaction.hasPermission("createProduct")) {
    const tour = introJs();

    tour.setOptions({
      showProgress: true,
      hidePrev: true,
      hideNext: true,
      scrollToElement: true,
      steps
    });
    tour.start().setOption("doneLabel", " How to add Products").oncomplete(() => {
      window.location.href = "/product/example-product?introMulti=true";
    });
    localStorage.setItem("dashboard-onboard", "true");
  }
};
const manualTour = (steps) => {
  const tour = introJs();
  tour.setOptions({
    showProgress: true,
    hidePrev: true,
    scrollToElement: true,
    steps
  });
  tour.start().setOption("doneLabel", " How to add Products").oncomplete(() => {
    window.location.href = "/product/example-product?introMulti=true";
  });
};
const onboard = {
  autoDashboardTour,
  autoProductTour,
  manualTour
};
export default onboard;
