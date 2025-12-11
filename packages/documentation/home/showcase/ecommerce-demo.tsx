import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Card,
  Carousel,
  Rate,
  RadioGroup,
  CheckBox,
  InputNumber,
  Button,
  Image,
  Tabs,
  Text,
  Notification,
  Accordion,
  Progress,
  Avatar,
  Tags,
} from '@lib';
import {
  product,
  relatedProducts,
  customerReviews,
  productFAQs,
} from './showcase-data';
import styles from './ecommerce-demo.module.scss';

interface CartItem {
  id: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export const EcommerceDemo: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [protectionPlan, setProtectionPlan] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const notificationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeTab = 'Details'; // Default active tab

  const shippingOptions = useMemo(
    () => [
      { id: 'standard', label: 'Standard Shipping', price: 0, eta: '5-7 days' },
      { id: 'express', label: 'Express Shipping', price: 15, eta: '2-3 days' },
      { id: 'overnight', label: 'Overnight Shipping', price: 30, eta: '1 day' },
    ],
    []
  );

  const handleAddToCart = () => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          quantity,
          selectedColor,
          selectedSize,
        },
      ];
    });
    setShowNotification(true);
    if (notificationTimer.current) {
      clearTimeout(notificationTimer.current);
    }
    notificationTimer.current = setTimeout(() => setShowNotification(false), 3000);
  };

  // const tabLabels = useMemo(() => ['Details', 'Reviews', 'Shipping'], []);

  const colorOptions = useMemo(
    () =>
      product.colors.map(color => ({
        checked: color.name === selectedColor,
        label: color.name,
        value: color.name,
      })),
    [selectedColor]
  );
  const featureTags = useMemo(
    () =>
      product.features.slice(0, 6).map(name => ({
        name,
        readonly: true,
        tagStyle: 'fill' as const,
      })),
    []
  );

  const discountedPrice = product.price;
  const savingsAmount = product.originalPrice - discountedPrice;
  const shippingCost = useMemo(
    () =>
      shippingOptions.find(option => option.id === selectedShipping)?.price ?? 0,
    [shippingOptions, selectedShipping]
  );
  const selectedShippingLabel = useMemo(
    () =>
      shippingOptions.find(option => option.id === selectedShipping)?.label ?? '',
    [shippingOptions, selectedShipping]
  );
  const addOnsTotal = useMemo(
    () => (protectionPlan ? 19.99 : 0) + (giftWrap ? 4.5 : 0),
    [giftWrap, protectionPlan]
  );
  const subtotal = useMemo(
    () => quantity * discountedPrice,
    [discountedPrice, quantity]
  );
  const orderTotal = useMemo(
    () => subtotal + shippingCost + addOnsTotal,
    [addOnsTotal, shippingCost, subtotal]
  );

  useEffect(
    () => () => {
      if (notificationTimer.current) {
        clearTimeout(notificationTimer.current);
      }
    },
    []
  );

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
                <Image
                  src={image}
                  alt={`${product.name} - ${index + 1}`}
                  height={400}
                  expandImageOnClick
                  loaderSize="md"
                  showLoader
                />
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
                  <Rate
                    value={Math.floor(product.rating) as 1 | 2 | 3 | 4 | 5}
                    disabled
                    iconCount={5}
                  />
                  <Text type="secondary" size="sm">
                    {product.rating} ({product.reviewCount} reviews)
                  </Text>
                </div>
              </div>

              {/* Price section */}
              <div className={styles.priceSection}>
                <div className={styles.prices}>
                  <span className={styles.currentPrice}>
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className={styles.originalPrice}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span
                    style={{
                      backgroundColor: '#fbbf2420',
                      borderRadius: '4px',
                      color: '#f59e0b',
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '4px 12px',
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
                      backgroundColor: product.inStock
                        ? '#22c55e20'
                        : '#ef444420',
                      borderRadius: '6px',
                      color: product.inStock ? '#22c55e' : '#ef4444',
                      fontSize: '13px',
                      fontWeight: 600,
                      padding: '6px 14px',
                    }}
                  >
                    {product.inStock
                      ? `✓ ${product.stock} In Stock`
                      : '✕ Out of Stock'}
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
                <label htmlFor="product-color-selector">Color</label>
                <div id="product-color-selector">
                  <RadioGroup
                    items={colorOptions}
                    onSelected={setSelectedColor}
                  />
                </div>
              </div>

              {/* Size selection */}
              <div className={styles.optionSection}>
                <label htmlFor="product-size-selector">Size</label>
                <div id="product-size-selector" className={styles.sizeOptions}>
                  {product.sizes.map(size => (
                    <Button
                      key={size}
                      label={size}
                      type={size === selectedSize ? 'primary' : 'default'}
                      onClick={() => setSelectedSize(size)}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className={styles.optionSection}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label id="product-quantity-label">Quantity</label>
                <div aria-labelledby="product-quantity-label">
                  <InputNumber
                    start={1}
                    end={99}
                    value={quantity}
                    onChange={setQuantity}
                  />
                </div>
              </div>

              <div className={styles.optionSection}>
                <label>Add-ons</label>
                <div className={styles.addOnOptions}>
                  <CheckBox
                    label="2-year protection plan (+$19.99)"
                    isChecked={protectionPlan}
                    onChange={(_, selected) => setProtectionPlan(Boolean(selected))}
                  />
                  <CheckBox
                    label="Gift wrap (+$4.50)"
                    isChecked={giftWrap}
                    onChange={(_, selected) => setGiftWrap(Boolean(selected))}
                  />
                </div>
              </div>

              <div className={styles.summarySection}>
                <div className={styles.summaryRow}>
                  <Text size="sm" type="secondary">
                    Subtotal
                  </Text>
                  <Text size="sm" weight="600">
                    ${subtotal.toFixed(2)}
                  </Text>
                </div>
                <div className={styles.summaryRow}>
                  <Text size="sm" type="secondary">
                    {selectedShippingLabel || 'Shipping'}
                  </Text>
                  <Text size="sm" weight="600">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </Text>
                </div>
                <div className={styles.summaryRow}>
                  <Text size="sm" type="secondary">
                    Add-ons
                  </Text>
                  <Text size="sm" weight="600">
                    {addOnsTotal === 0 ? 'None' : `$${addOnsTotal.toFixed(2)}`}
                  </Text>
                </div>
                <div className={styles.summaryRowTotal}>
                  <Text size="sm" weight="600">
                    Order total
                  </Text>
                  <Text size="md" weight="700">
                    ${orderTotal.toFixed(2)}
                  </Text>
                </div>
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
              <div className={styles.featureTags}>
                <Tags items={featureTags} readonly wrap tagStyle="fill" accent="rounded" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Product info tabs */}
      <Card className={styles.infoCard}>
        <Tabs
          labels={['Details', 'Specifications', 'Reviews', 'FAQ']}
          activeTab={activeTab}
        >
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
                  <RadioGroup
                    layout="column"
                    items={shippingOptions.map(option => ({
                      checked: option.id === selectedShipping,
                      label: `${option.label} (${option.eta}) ${
                        option.price === 0
                          ? '- Free'
                          : `- $${option.price.toFixed(2)}`
                      }`,
                      value: option.id,
                    }))}
                    onSelected={value => setSelectedShipping(value as string)}
                  />
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
                      <span className={styles.ratingNumber}>
                        {product.rating}
                      </span>
                      <Rate
                        value={Math.floor(product.rating) as 1 | 2 | 3 | 4 | 5}
                        disabled
                        iconCount={5}
                      />
                      <Text type="secondary" size="sm">
                        Based on {product.reviewCount} reviews
                      </Text>
                    </div>
                  </div>
                </div>
                <Button label="Write a Review" type="default" size="sm" />
              </div>

              <div className={styles.reviewsList}>
                {customerReviews.map(review => (
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
                      <Rate
                        value={review.rating as 1 | 2 | 3 | 4 | 5}
                        disabled
                        iconCount={5}
                      />
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
                  content: <Text size="sm">{faq.answer}</Text>,
                  header: faq.question,
                  id: `faq-${index}`,
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
          {relatedProducts.map(related => (
            <div key={related.id} className={styles.relatedCard}>
              <Card>
                <div className={styles.relatedImageWrapper}>
                  <Image
                    src={related.image}
                    alt={related.name}
                    height={220}
                    loaderSize="sm"
                    showLoader
                  />
                  {related.originalPrice &&
                    related.price < related.originalPrice && (
                      <span className={styles.relatedDiscount}>
                        {Math.round(
                          ((related.originalPrice - related.price) /
                            related.originalPrice) *
                            100
                        )}
                        % OFF
                      </span>
                    )}
                </div>
                <div className={styles.relatedContent}>
                  <Text size="sm" weight="600">
                    {related.name}
                  </Text>
                  <div className={styles.relatedMeta}>
                    <Rate
                      value={Math.floor(related.rating) as 1 | 2 | 3 | 4 | 5}
                      disabled
                      iconCount={5}
                      size="sm"
                    />
                    <Text type="secondary" size="xs">
                      ({related.rating})
                    </Text>
                  </div>
                  <div className={styles.relatedPricing}>
                    <span className={styles.relatedPrice}>
                      ${related.price.toFixed(2)}
                    </span>
                    {related.originalPrice &&
                      related.price < related.originalPrice && (
                        <span className={styles.relatedOriginalPrice}>
                          ${related.originalPrice.toFixed(2)}
                        </span>
                      )}
                  </div>
                  <Button
                    label="Quick View"
                    type="default"
                    size="sm"
                    style={{ marginTop: '8px', width: '100%' }}
                  />
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
