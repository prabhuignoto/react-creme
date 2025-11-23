/**
 * Button Component - Interactive Playground Example
 *
 * This example demonstrates the main features of the Button component:
 * - Different types (primary, default, danger)
 * - Different sizes (sm, md, lg)
 * - Loading state (isBusy)
 * - Disabled state
 * - Click handlers
 * - Custom styling
 */

export const playgroundCode = `import { useState } from 'react';
import { Button } from 'react-creme';
import 'react-creme/css';

export default function App() {
  const [clickCount, setClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  const handleAsyncAction = () => {
    setIsLoading(true);
    // Simulate async operation
    setTimeout(() => {
      setIsLoading(false);
      alert('Action completed!');
    }, 2000);
  };

  return (
    <div style={{
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <div>
        <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Button Component</h2>
        <p style={{ color: '#666', margin: 0 }}>
          Click count: <strong>{clickCount}</strong>
        </p>
      </div>

      {/* Default Buttons */}
      <section>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Basic Buttons</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button onClick={handleClick}>
            Default Button
          </Button>
          <Button type="primary" onClick={handleClick}>
            Primary Button
          </Button>
          <Button type="danger" onClick={handleClick}>
            Danger Button
          </Button>
        </div>
      </section>

      {/* Button Sizes */}
      <section>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size="sm" onClick={handleClick}>
            Small
          </Button>
          <Button size="md" onClick={handleClick}>
            Medium
          </Button>
          <Button size="lg" onClick={handleClick}>
            Large
          </Button>
        </div>
      </section>

      {/* Button States */}
      <section>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>States</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button disabled>
            Disabled Button
          </Button>
          <Button
            isBusy={isLoading}
            onClick={handleAsyncAction}
            type="primary"
          >
            {isLoading ? 'Loading...' : 'Click for Async Action'}
          </Button>
        </div>
      </section>

      {/* Accents */}
      <section>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Accents</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button accent="flat" type="primary" onClick={handleClick}>
            Flat Button
          </Button>
          <Button accent="rounded" type="primary" onClick={handleClick}>
            Rounded Button
          </Button>
        </div>
      </section>

      {/* Try It Yourself */}
      <section style={{
        marginTop: '1rem',
        padding: '1rem',
        background: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <h3 style={{ fontSize: '1rem', marginTop: 0, marginBottom: '0.5rem' }}>
          💡 Try it yourself!
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>
          Edit the code above to customize the buttons. Try changing:
        </p>
        <ul style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          <li>Button <code>type</code> (primary, default, danger)</li>
          <li>Button <code>size</code> (sm, md, lg)</li>
          <li>Button <code>accent</code> (flat, rounded)</li>
          <li>Add custom <code>style</code> props</li>
        </ul>
      </section>
    </div>
  );
}`;
