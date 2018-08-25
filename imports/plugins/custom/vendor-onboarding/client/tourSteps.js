export const dashboardSteps = [
  {
    intro: `<h4>Welcome to the GRC Marketplace</h4>
        <hr>
        <div>This tour will help you get your shop up and running quickly</div>`
  },
  {
    element: ".toolbar-vertical",
    intro: `<h4>Vendor Dashboard</h4>
        <hr>
        <div>The dashboard allows you to manage your store, keep up with orders, choose your preferred payment methods and lots more</div>`,
    position: "left"
  },
  {
    element: ".fa-sun-o",
    intro: `<h4> Orders </h4>
        <hr>
        <div> The orders section shows all the products ordered from your store.</div>`,
    position: "left"
  },
  {
    element: ".accounts",
    intro: `<h4> User Account Options</h4>
        <hr>
        <div>This is where you can access your account options, such as sign-in and registration and profile management</div>`,
    position: "bottom"
  },
  {
    element: "nav.rui.toolbar-group.admin-controls-quicklinks .fa-users",
    intro: `<h4> Account Roles</h4>
        <hr>
        <div>Configure managers, stockkeepers, sales and other roles for your store</div>`,
    position: "left"
  },
  {
    element: "nav.rui.toolbar-group.admin-controls-quicklinks .fa-share-alt",
    intro: `<h4> Social Media</h4>
        <hr>
        <div>Configure social media sharing of your products</div>`,
    position: "left"
  },
  {
    element: ".currencies",
    intro: `<h4> Currency Options</h4>
        <hr>
        <div> Select your prefered currency</div>`,
    position: "bottom"
  },
  {
    element: ".search",
    intro: `<h4>Search Products</h4>
        <hr>
        <div>Search for products here</div>`,
    position: "bottom"
  },
  {
    element: "nav.rui",
    intro: `<h4>Toolbar</h4>
        <hr>
        <div> You can carry out admin operations like adding, editing and viewing products from this section</div>`,
    position: "bottom"
  },
  {
    element: ".switch-control",
    intro: `<h4>Toggle Modes</h4>
        <hr>
        <div> You can only make changes to your store in edit mode</div>`,
    position: "bottom"
  },
  {
    intro: `<h4>End</h4>
        <hr>
        <div>Hurray, your tour of the landing page is complete. The next tour shows how you can add products to your store</div>`
  }
];
export const productSteps = [
  {
    element: ".text-edit-input",
    intro: `<h4>Product Title</h4>
    <hr>
    <div>This text field is where you enter the title of your product.</div> `
  },
  {
    element: ".pageTitle-edit-input",
    intro: `<h4>Product Subtitle</h4>
    <hr>
    The product's subtitle goes here `
  },
  {
    element: ".undefined-edit-input",
    intro: `<h4>Description</h4>
    <hr>    
    Enter a description of the product here. Use the pencil icons to access more data entry fields`,
    position: "left"
  },
  {
    element: ".variant-list",
    intro: `<h4>Variants</h4>
    <hr>        
    Add variants of the same product here. `,
    position: "left"
  },
  {
    element: ".rui .gallery-drop-pane",
    intro: `<h4>Upload Image</h4>
    <hr> 
    Select and upload your product's default image.`,
    position: "right"
  },
  {
    element: ".rui.toolbar-group.right>button:last-child",
    intro: `<h4>Publish</h4>
    <hr> 
    Use this button to make your changes available to the rest of the app`,
    position: "right"
  },
  {
    element: ".rui.toolbar-group.right>button:nth-last-child(2)",
    intro: `<h4>Visibility</h4>
    <hr> 
    Use this button to hide or show the products in your store`,
    position: "right"
  }
];
export default {
  productSteps,
  dashboardSteps
};
