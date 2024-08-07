
# Product Card Component

## User Story

As a customer shopping on our e-commerce website, I want to view and interact with a detailed product card so that I can make an informed decision about purchasing the product.

### Acceptance Criteria

1. **Product Information:**
   - Display product name, description, and price clearly
   - Show a high-quality product image
   - Indicate product availability status

2. **Quantity Selection:**
   - Allow easy quantity adjustment
   - Prevent selection above maximum allowed quantity
   - Provide clear feedback for maximum quantity errors

3. **Product Variants:**
   - Enable selection of variants (e.g., sizes, colors)
   - Update price and availability based on variant selection

4. **Add to Cart:**
   - Allow adding product to cart with selected quantity and variant
   - Provide clear confirmation of successful cart addition
   - Disable "Add to Cart" button for out-of-stock products

5. **Wishlist:**
   - Enable adding product to wishlist

6. **Product Reviews:**
   - Display average rating and review count

7. **Responsive Design:**
   - Ensure correct display on desktop and mobile devices

8. **Persistence:**
    - Remember selected quantity and variant across page refreshes
    - Error Handling: Display clear error messages for network issues

### Additional Considerations

- Accessibility: Ensure the component is usable with screen readers and keyboard navigation

## Collaborative - Development Guidelines

1. Use data-testid attributes for key elements to facilitate testing
2. Implement responsive design using a mobile-first approach
3. Ensure all interactive elements are keyboard accessible
4. Optimize images and animations for performance
6. Follow the ID convention outlined below for all elements

### ID Convention

To ensure predictability and consistency in our component structure, we follow these conventions for IDs:

1. **Prefix**: All IDs should start with `pc-` (short for "product card") to avoid conflicts with other components.

2. **Naming Structure**: Use the format `pc-[element]-[modifier]`, where:
   - `[element]` describes the UI element (e.g., title, price, image)
   - `[modifier]` (optional) provides additional context (e.g., original, discounted)

3. **Use Kebab Case**: Separate words with hyphens for readability.

4. **Be Specific**: IDs should be as specific as necessary to uniquely identify the element.

5. **Avoid Numbering**: Use descriptive terms instead of numbers for multiple similar elements.

Examples of correctly formatted IDs:

- `pc-title`
- `pc-price-original`
- `pc-price-discounted`
- `pc-image-main`
- `pc-button-add-to-cart`
- `pc-variant-selector-color`

These ID conventions should be reflected in both the component's HTML structure and the selectors defined in `cypress/support/product-card.data.js`.

## Development and Testing Strategy

Our approach to developing and testing the Product Card component is designed to facilitate collaborative work in an agile environment where the feature is under active development.

### Extracted Selectors and Test Data

We've centralized our selectors and test data in `cypress/support/product-card.data.js`. This approach offers several benefits:

1. **Single Source of Truth**: All selectors are defined in one place, making it easy to update them as the component's structure evolves.

2. **Reduced Test Fragility**: By using data-testid attributes and centralized selectors, we make our tests more resilient to changes in the component's HTML structure or styling.

3. **Improved Collaboration**: Developers and QA can easily update selectors or test data without modifying the test logic.

4. **Easier Maintenance**: When the component's structure changes, we only need to update the selectors in one file, rather than throughout multiple test files.

Example of selectors following the ID convention:

```javascript
export const selectors = {
  productTitle: '[data-testid="pc-title"]',
  originalPrice: '[data-testid="pc-price-original"]',
  discountedPrice: '[data-testid="pc-price-discounted"]',
  addToCartButton: '[data-testid="pc-button-add-to-cart"]',
  quantityInput: '[data-testid="pc-quantity-input"]',
};
```

### Collaborative Development Process

Given that the Product Card is under active development, we've structured our workflow to support rapid iterations and frequent changes:

1. **Incremental Test Development**:
   - Start with basic tests for core functionality.
   - Add placeholder tests for planned features.
   - Gradually fill in and expand tests as new features are implemented.

2. **Continuous Updates to Selectors**:
   - As developers make changes to the component, they should update the selectors file accordingly.
   - Regular sync-ups between developers and QA ensure everyone is aware of structural changes.

3. **Code Reviews**:
   - Include both the component changes and corresponding test updates in the same pull request.
   - Reviewers should ensure that selectors are updated along with component changes.

4. **ID Consistency**:
   - When adding new elements to the component, follow the established ID convention.
   - Update the `product-card.data.js` file with new selectors that match the ID convention.

### Flexibility in Testing

Our testing strategy is designed to be flexible and adaptable:

1. **Placeholder Tests**: We include placeholder tests for planned features, allowing us to outline expected behavior before implementation.

2. **Conditional Tests**: Some tests are wrapped in conditional statements, allowing them to be skipped if a feature isn't ready yet.

3. **Easy Updates**: The centralized selectors make it simple to update tests when the component structure changes.

### Best Practices for Collaboration

1. **Regular Communication**: Hold brief, regular meetings to discuss changes to the component structure and update the selector file together.

2. **Documentation**: Keep the README and comments in the selector file up-to-date to help team members understand the current state of development.

3. **Pair Programming**: Consider pairing developers with QA when implementing new features to ensure testability from the start.

4. **Continuous Integration**: Set up CI to run tests automatically, helping catch issues early when selectors become outdated.
