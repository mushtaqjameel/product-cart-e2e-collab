import { selectors, testData } from "../support/product-card.data";

describe("Product Card", () => {
  beforeEach(() => {
    cy.visit(testData.productPageUrl);
    cy.get(selectors.productCard).as("productCard");
  });

  // New tests and placeholders
  it("displays the correct product information", () => {
    cy.get("@productCard").within(() => {
      cy.get(selectors.productImage)
        .should("be.visible")
        .and("have.attr", "alt", testData.productName);
      cy.contains(testData.productName).should("be.visible");
      cy.contains(testData.productDescription).should("be.visible");
      cy.contains(testData.productPrice).should("be.visible");
    });
  });

  it("allows changing quantity", () => {
    cy.get(selectors.quantityInput).as("quantityInput");

    // Test integer values
    cy.get("@quantityInput").clear().type(testData.validIntegerQuantity);
    cy.get("@quantityInput").should(
      "have.value",
      testData.validIntegerQuantity
    );

    // Test decimal values (if allowed)
    if (testData.allowDecimalQuantities) {
      cy.get("@quantityInput").clear().type(testData.validDecimalQuantity);
      cy.get("@quantityInput").should(
        "have.value",
        testData.validDecimalQuantity
      );
    }

    // Test invalid input
    cy.get("@quantityInput").clear().type(testData.invalidQuantity);
    cy.get("@quantityInput").should("have.value", testData.defaultQuantity);
  });

  it("adds product to cart", () => {
    cy.get(selectors.cartCount)
      .as("cartCount")
      .should("contain", testData.initialCartCount);

    cy.get(selectors.addToCartButton).click();

    cy.get("@cartCount").should("contain", testData.initialCartCount + 1);

    cy.get(selectors.addToCartSuccessMessage).should("be.visible");
  });

  it("adds correct quantity to cart", () => {
    const testQuantity = "3";
    cy.get(selectors.quantityInput).clear().type(testQuantity);
    cy.get(selectors.addToCartButton).click();

    cy.get(selectors.viewCartButton).click();
    cy.get(selectors.cartItems)
      .should("contain", testData.productName)
      .and("contain", `Quantity: ${testQuantity}`);
  });

  it("displays out of stock message when applicable", () => {
    // TODO: Implement logic to set product as out of stock
    cy.get(selectors.outOfStockMessage).should("be.visible");
    cy.get(selectors.addToCartButton).should("be.disabled");
  });

  it("shows discount price when on sale", () => {
    // TODO: Implement logic to set product on sale
    cy.get(selectors.originalPrice).should(
      "have.css",
      "text-decoration",
      "line-through"
    );
    cy.get(selectors.discountPrice).should("be.visible");
  });

  it("allows selecting product variants (e.g., size, color)", () => {
    cy.get(selectors.variantSelector).select(testData.availableVariants[1]);
    // TODO: Assert that the correct variant is selected and price/image updates if needed
  });

  it("displays product reviews if available", () => {
    cy.get(selectors.reviewsSection).within(() => {
      cy.get(selectors.averageRating).should("be.visible");
      cy.get(selectors.reviewCount).should("be.visible");
    });
    // TODO: Implement and test review display functionality
  });

  it("handles maximum quantity limit", () => {
    cy.get(selectors.quantityInput)
      .clear()
      .type(testData.maxQuantity + 1);
    cy.get(selectors.quantityInput).should(
      "have.value",
      testData.maxQuantity.toString()
    );
    cy.get(selectors.maxQuantityError).should("be.visible");
  });

  it("persists selected quantity and variant in URL or local storage", () => {
    const testQuantity = "2";
    cy.get(selectors.quantityInput).clear().type(testQuantity);
    cy.get(selectors.variantSelector).select(testData.availableVariants[1]);

    // Refresh the page
    cy.reload();

    // Check if quantity and variant are persisted
    cy.get(selectors.quantityInput).should("have.value", testQuantity);
    cy.get(selectors.variantSelector).should(
      "have.value",
      testData.availableVariants[1]
    );
  });

  it("shows related products section", () => {
    cy.get(selectors.relatedProductsSection).should("be.visible");
    cy.get(selectors.relatedProductCard).should("have.length.at.least", 1);
  });

  it("allows adding to wishlist", () => {
    cy.get(selectors.wishlistButton).click();
    cy.get(selectors.wishlistConfirmation).should("be.visible");
    // TODO: Implement wishlist functionality and expand this test
  });

  it("displays product dimensions and weight when applicable", () => {
    cy.get(selectors.productSpecs).within(() => {
      cy.contains("Dimensions").should("be.visible");
      cy.contains("Weight").should("be.visible");
    });
  });

  it("handles network errors gracefully when adding to cart", () => {
    // Simulate a network error
    cy.intercept("POST", "/api/cart", { forceNetworkError: true }).as(
      "addToCartRequest"
    );

    cy.get(selectors.addToCartButton).click();
    cy.wait("@addToCartRequest");

    cy.get(selectors.networkErrorMessage).should("be.visible");
  });
});
