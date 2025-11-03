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
} from '@lib';
import { product, relatedProducts } from './showcase-data';
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

  return (
    <div className={styles.ecommerceContainer}>
      {/* Header with cart count */}
      <div className={styles.header}>
        <h2>{product.name}</h2>
        <div className={styles.cartBadge}>
          🛒 {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart
        </div>
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

              {/* Stock status */}
              <div className={styles.stockStatus}>
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    backgroundColor: product.inStock ? '#22c55e20' : '#ef444420',
                    color: product.inStock ? '#22c55e' : '#ef4444',
                  }}
                >
                  {product.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                </span>
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
        <Tabs labels={tabLabels} activeTab={activeTab}>
          <div className={styles.tabContent}>
            <div className={styles.detailsList}>
              <h3>Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.tabContent}>
            <div className={styles.reviewsSection}>
              <h3>Customer Reviews</h3>
              <Text type="secondary" size="sm">
                {product.reviewCount} verified customer reviews
              </Text>
              <div className={styles.reviewSummary}>
                <div className={styles.reviewItem}>
                  <Rate value={5} disabled iconCount={5} />
                  <Text type="secondary" size="xs">
                    5★ 145 reviews
                  </Text>
                </div>
                <div className={styles.reviewItem}>
                  <Rate value={4} disabled iconCount={5} />
                  <Text type="secondary" size="xs">
                    4★ 142 reviews
                  </Text>
                </div>
                <div className={styles.reviewItem}>
                  <Rate value={3} disabled iconCount={5} />
                  <Text type="secondary" size="xs">
                    3★ 35 reviews
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.tabContent}>
            <div className={styles.shippingSection}>
              <h3>Shipping Information</h3>
              <div className={styles.shippingOptions}>
                <CheckBox label="Standard Shipping (5-7 days) - Free" />
                <CheckBox label="Express Shipping (2-3 days) - $15" />
                <CheckBox label="Overnight Shipping (1 day) - $30" />
              </div>
            </div>
          </div>
        </Tabs>
      </Card>

      {/* Related products */}
      <div className={styles.relatedSection}>
        <h3>Related Products</h3>
        <Carousel autoPlay={0}>
          {relatedProducts.map((related) => (
            <div key={related.id} className={styles.relatedCard}>
              <Card>
                <div className={styles.relatedImageWrapper}>
                  <img src={related.image} alt={related.name} />
                </div>
                <div className={styles.relatedContent}>
                  <Text size="sm" weight="600">
                    {related.name}
                  </Text>
                  <div className={styles.relatedMeta}>
                    <Rate value={Math.floor(related.rating) as 1 | 2 | 3 | 4 | 5} disabled iconCount={5} />
                    <Text type="secondary" size="xs">
                      {related.rating}
                    </Text>
                  </div>
                  <div className={styles.relatedPrice}>
                    ${related.price.toFixed(2)}
                  </div>
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
