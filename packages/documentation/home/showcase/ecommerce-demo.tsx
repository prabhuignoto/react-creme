import React, { useMemo, useState } from 'react';
import {
  Card,
  Carousel,
  Rate,
  RadioGroup,
  CheckBox,
  InputNumber,
  Button,
  Tabs,
  Text,
  Notification,
  Accordion,
  Progress,
  Avatar,
  Tooltip,
} from '@lib';
import { product, relatedProducts, customerReviews, productFAQs } from './showcase-data';
import styles from './ecommerce-demo.module.scss';

interface CartItem {
  id: string;
  quantity: number;
  selectedColor: string;
}

export const EcommerceDemo: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const activeTab = 'Details'; // Default active tab

  const handleAddToCart = () => {
    setCartItems((prev) => [
      ...prev,
      {
        id: product.id,
        quantity,
        selectedColor,
      },
    ]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const tabLabels = useMemo(() => ['Details', 'Reviews', 'Shipping'], []);

  const colorOptions = useMemo(
    () =>
      product.colors.map((color) => ({
        label: color.name,
        value: color.name,
        checked: color.name === selectedColor,
      })),
    [selectedColor],
  );

  const discountedPrice = product.price;
  const savingsAmount = product.originalPrice - discountedPrice;

  const getTrustBadge = (label: string, icon: string) => (
    <div className={styles.trustBadgeItem}>
      <span className={styles.trustIcon}>{icon}</span>
      <Text size="xs" type="secondary">
        {label}
      </Text>
    </div>
  );

  return (
    <div className={styles.ecommerceContainer}>
      {/* Header with cart count */}
      <div className={styles.header}>
        <div>
          <Text size="sm" type="secondary" weight="600">
            {product.brand}
          </Text>
          <h2>{product.name}</h2>
          <Text size="xs" type="secondary">
            SKU: {product.sku}
          </Text>
        </div>
        <div className={styles.cartBadge}>
          🛒 {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {/* Trust Badges */}
      <div className={styles.trustBadges}>
        {getTrustBadge('Free Shipping', '🚚')}
        {getTrustBadge('2-Year Warranty', '✓')}
        {getTrustBadge('30-Day Returns', '↺')}
        {getTrustBadge('Secure Payment', '🔒')}
      </div>

      {/* Product showcase */}
      <div className={styles.productShowcase}>
        {/* Image carousel */}
        <div className={styles.imageSection}>
          <Carousel autoPlay={0}>
            {product.images.map((image, index) => (
              <div key={index} className={styles.carouselImage}>
                <img src={image} alt={`${product.name} - ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Product details */}
        <div className={styles.detailsSection}>
          <Card>
            <div className={styles.cardContent}>
              {/* Rating and reviews */}
              <div className={styles.ratingSection}>
                <div className={styles.ratingRow}>
                  <Rate value={Math.floor(product.rating) as 1 | 2 | 3 | 4 | 5} disabled iconCount={5} />
                  <Text type="secondary" size="sm">
                    {product.rating} ({product.reviewCount} reviews)
                  </Text>
                </div>
              </div>

              {/* Price section */}
              <div className={styles.priceSection}>
                <div className={styles.prices}>
                  <span className={styles.currentPrice}>${discountedPrice.toFixed(2)}</span>
                  <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: '#fbbf2420',
                      color: '#f59e0b',
                    }}
                  >
                    {product.discount}% OFF
                  </span>
                </div>
                <Text type="secondary" size="sm">
                  You save ${savingsAmount.toFixed(2)}
                </Text>
              </div>

              {/* Stock status and delivery */}
              <div className={styles.stockDeliverySection}>
                <div className={styles.stockInfo}>
                  <span
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      backgroundColor: product.inStock ? '#22c55e20' : '#ef444420',
                      color: product.inStock ? '#22c55e' : '#ef4444',
                    }}
                  >
                    {product.inStock ? `✓ ${product.stock} In Stock` : '✕ Out of Stock'}
                  </span>
                  {product.inStock && (
                    <Text size="xs" type="secondary">
                      Order within 3 hours for same-day dispatch
                    </Text>
                  )}
                </div>
                {product.inStock && (
                  <div className={styles.deliveryEstimate}>
                    <Text size="sm" weight="600">
                      Estimated Delivery
                    </Text>
                    <Text size="xs" type="secondary">
                      Jan 15-17, 2025
                    </Text>
                    <Progress value={75} />
                    <Text size="xs" type="secondary">
                      Order processing: 75% complete
                    </Text>
                  </div>
                )}
              </div>

              {/* Color selection */}
              <div className={styles.optionSection}>
                <label>Color</label>
                <RadioGroup
                  items={colorOptions}
                  onSelected={setSelectedColor}
                />
              </div>

              {/* Size selection */}
              <div className={styles.optionSection}>
                <label>Size</label>
                <div className={styles.sizeOptions}>
                  {product.sizes.map((size) => (
                    <Button key={size} label={size} type="default" />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className={styles.optionSection}>
                <label>Quantity</label>
                <InputNumber start={1} end={99} value={quantity} onChange={setQuantity} />
              </div>

              {/* Action buttons */}
              <div className={styles.actionButtons}>
                <Button
                  label="Add to Cart"
                  type="primary"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                />
                <Button label="♥ Wishlist" type="default" />
              </div>

              {/* Description */}
              <div className={styles.descriptionSection}>
                <Text size="sm">{product.description}</Text>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Product info tabs */}
      <Card className={styles.infoCard}>
        <Tabs labels={['Details', 'Specifications', 'Reviews', 'FAQ']} activeTab={activeTab}>
          {/* Details Tab */}
          <div className={styles.tabContent}>
            <div className={styles.detailsList}>
              <h3>Product Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className={styles.shippingSection}>
                <h3>Shipping Options</h3>
                <div className={styles.shippingOptions}>
                  <CheckBox label="Standard Shipping (5-7 days) - Free" />
                  <CheckBox label="Express Shipping (2-3 days) - $15.00" />
                  <CheckBox label="Overnight Shipping (1 day) - $30.00" />
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Tab */}
          <div className={styles.tabContent}>
            <div className={styles.specificationsSection}>
              <h3>Technical Specifications</h3>
              <div className={styles.specsGrid}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className={styles.specItem}>
                    <Text size="sm" type="secondary">
                      {key}
                    </Text>
                    <Text size="sm" weight="600">
                      {value}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Tab */}
          <div className={styles.tabContent}>
            <div className={styles.reviewsSection}>
              <div className={styles.reviewsHeader}>
                <div>
                  <h3>Customer Reviews</h3>
                  <div className={styles.ratingOverview}>
                    <div className={styles.averageRating}>
                      <span className={styles.ratingNumber}>{product.rating}</span>
                      <Rate value={Math.floor(product.rating) as 1 | 2 | 3 | 4 | 5} disabled iconCount={5} />
                      <Text type="secondary" size="sm">
                        Based on {product.reviewCount} reviews
                      </Text>
                    </div>
                  </div>
                </div>
                <Button label="Write a Review" type="default" size="sm" />
              </div>

              <div className={styles.reviewsList}>
                {customerReviews.map((review) => (
                  <Card key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewAuthor}>
                        <Avatar name={review.author} size="sm" />
                        <div>
                          <Text size="sm" weight="600">
                            {review.author}
                          </Text>
                          {review.verified && (
                            <Text size="xs" type="secondary">
                              ✓ Verified Purchase
                            </Text>
                          )}
                        </div>
                      </div>
                      <Text size="xs" type="secondary">
                        {new Date(review.date).toLocaleDateString()}
                      </Text>
                    </div>
                    <div className={styles.reviewRating}>
                      <Rate value={review.rating as 1 | 2 | 3 | 4 | 5} disabled iconCount={5} />
                      <Text size="sm" weight="600">
                        {review.title}
                      </Text>
                    </div>
                    <Text size="sm">{review.content}</Text>
                    <div className={styles.reviewFooter}>
                      <Text size="xs" type="secondary">
                        {review.helpful} people found this helpful
                      </Text>
                      <Button label="👍 Helpful" type="default" size="sm" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Tab */}
          <div className={styles.tabContent}>
            <div className={styles.faqSection}>
              <h3>Frequently Asked Questions</h3>
              <Accordion
                items={productFAQs.map((faq, index) => ({
                  id: `faq-${index}`,
                  header: faq.question,
                  content: <Text size="sm">{faq.answer}</Text>,
                }))}
              />
            </div>
          </div>
        </Tabs>
      </Card>

      {/* Related products */}
      <div className={styles.relatedSection}>
        <div className={styles.relatedHeader}>
          <h3>You May Also Like</h3>
          <Text type="secondary" size="sm">
            Customers also viewed these products
          </Text>
        </div>
        <Carousel autoPlay={0}>
          {relatedProducts.map((related) => (
            <div key={related.id} className={styles.relatedCard}>
              <Card>
                <div className={styles.relatedImageWrapper}>
                  <img src={related.image} alt={related.name} />
                  {related.originalPrice && related.price < related.originalPrice && (
                    <span className={styles.relatedDiscount}>
                      {Math.round(((related.originalPrice - related.price) / related.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
                <div className={styles.relatedContent}>
                  <Text size="sm" weight="600">
                    {related.name}
                  </Text>
                  <div className={styles.relatedMeta}>
                    <Rate value={Math.floor(related.rating) as 1 | 2 | 3 | 4 | 5} disabled iconCount={5} size="sm" />
                    <Text type="secondary" size="xs">
                      ({related.rating})
                    </Text>
                  </div>
                  <div className={styles.relatedPricing}>
                    <span className={styles.relatedPrice}>${related.price.toFixed(2)}</span>
                    {related.originalPrice && related.price < related.originalPrice && (
                      <span className={styles.relatedOriginalPrice}>${related.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <Button label="Quick View" type="default" size="sm" style={{ width: '100%', marginTop: '8px' }} />
                </div>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className={styles.notificationWrapper}>
          <Notification title="Added to Cart!">
            <Text>
              {quantity} x {product.name} added to your cart
            </Text>
          </Notification>
        </div>
      )}
    </div>
  );
};
