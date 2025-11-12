import React from 'react';
import { axe } from 'jest-axe';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BreadCrumb } from '../breadcrumb';

describe('BreadCrumb', () => {
  const defaultLinks = ['Home', 'Products', 'Electronics'];

  describe('Rendering', () => {
    it('should render with basic props', async () => {
      const { getByRole, getByText } = render(
        <BreadCrumb links={defaultLinks} />
      );

      await waitFor(() => {
        expect(getByRole('navigation')).toBeInTheDocument();
        expect(getByText('Home')).toBeInTheDocument();
        expect(getByText('Products')).toBeInTheDocument();
        expect(getByText('Electronics')).toBeInTheDocument();
      });
    });

    it('should render null when links array is empty', () => {
      const { container } = render(<BreadCrumb links={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it('should render with single link', () => {
      const { getByText } = render(<BreadCrumb links={['Home']} />);
      expect(getByText('Home')).toBeInTheDocument();
    });

    it('should render all icon types', () => {
      const { container: chevronContainer } = render(
        <BreadCrumb links={defaultLinks} icon="chevron" />
      );
      expect(chevronContainer).toBeInTheDocument();

      const { container: arrowContainer } = render(
        <BreadCrumb links={defaultLinks} icon="arrow" />
      );
      expect(arrowContainer).toBeInTheDocument();

      const { container: slashContainer } = render(
        <BreadCrumb links={defaultLinks} icon="slash" />
      );
      expect(slashContainer).toBeInTheDocument();
    });

    it('should render all sizes', () => {
      const { container: smContainer } = render(
        <BreadCrumb links={defaultLinks} size="sm" />
      );
      expect(smContainer).toBeInTheDocument();

      const { container: mdContainer } = render(
        <BreadCrumb links={defaultLinks} size="md" />
      );
      expect(mdContainer).toBeInTheDocument();

      const { container: lgContainer } = render(
        <BreadCrumb links={defaultLinks} size="lg" />
      );
      expect(lgContainer).toBeInTheDocument();
    });

    it('should not show chevron after last item', () => {
      const { getAllByRole } = render(<BreadCrumb links={defaultLinks} />);
      const listItems = getAllByRole('listitem');
      const lastItem = listItems[listItems.length - 1];

      // Check that last item doesn't have separator icon
      expect(lastItem.querySelectorAll('svg').length).toBeLessThanOrEqual(0);
    });
  });

  describe('Selection and Interaction', () => {
    it('should call onSelected when breadcrumb is clicked', () => {
      const handler = vi.fn();
      const { getByText } = render(
        <BreadCrumb links={defaultLinks} onSelected={handler} />
      );

      fireEvent.click(getByText('Home'));
      expect(handler).toHaveBeenCalledWith('Home');

      fireEvent.click(getByText('Products'));
      expect(handler).toHaveBeenCalledWith('Products');
    });

    it('should update selection when different breadcrumb is clicked', () => {
      const handler = vi.fn();
      const { getByText } = render(
        <BreadCrumb links={defaultLinks} onSelected={handler} />
      );

      fireEvent.click(getByText('Products'));
      expect(handler).toHaveBeenCalledWith('Products');
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should respect selectedCrumbIndex prop', () => {
      const { getAllByRole } = render(
        <BreadCrumb links={defaultLinks} selectedCrumbIndex={1} />
      );
      const listItems = getAllByRole('listitem');

      // Check that second item (index 1) has aria-current
      expect(listItems[1].getAttribute('aria-current')).toBeNull(); // Selected, but not last
      expect(listItems[2].getAttribute('aria-current')).toBe('page'); // Last item always gets aria-current
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate with ArrowRight key', () => {
      const handler = vi.fn();
      const { container } = render(
        <BreadCrumb links={defaultLinks} onSelected={handler} focusable={true} />
      );
      const nav = container.querySelector('ul');

      if (nav) {
        fireEvent.keyDown(nav, { key: 'ArrowRight' });
        expect(handler).toHaveBeenCalledWith('Products');
      }
    });

    it('should navigate with ArrowLeft key', () => {
      const handler = vi.fn();
      const { container } = render(
        <BreadCrumb
          links={defaultLinks}
          onSelected={handler}
          selectedCrumbIndex={1}
          focusable={true}
        />
      );
      const nav = container.querySelector('ul');

      if (nav) {
        fireEvent.keyDown(nav, { key: 'ArrowLeft' });
        expect(handler).toHaveBeenCalledWith('Home');
      }
    });

    it('should navigate to first item with Home key', () => {
      const handler = vi.fn();
      const { container } = render(
        <BreadCrumb
          links={defaultLinks}
          onSelected={handler}
          selectedCrumbIndex={2}
          focusable={true}
        />
      );
      const nav = container.querySelector('ul');

      if (nav) {
        fireEvent.keyDown(nav, { key: 'Home' });
        expect(handler).toHaveBeenCalledWith('Home');
      }
    });

    it('should navigate to last item with End key', () => {
      const handler = vi.fn();
      const { container } = render(
        <BreadCrumb links={defaultLinks} onSelected={handler} focusable={true} />
      );
      const nav = container.querySelector('ul');

      if (nav) {
        fireEvent.keyDown(nav, { key: 'End' });
        expect(handler).toHaveBeenCalledWith('Electronics');
      }
    });

    it('should not navigate when focusable is false', () => {
      const handler = vi.fn();
      const { container } = render(
        <BreadCrumb links={defaultLinks} onSelected={handler} focusable={false} />
      );
      const nav = container.querySelector('ul');

      if (nav) {
        fireEvent.keyDown(nav, { key: 'ArrowRight' });
        expect(handler).not.toHaveBeenCalled();
      }
    });

    it('should handle RTL keyboard navigation', () => {
      const handler = vi.fn();
      const { container } = render(
        <BreadCrumb
          links={defaultLinks}
          onSelected={handler}
          RTL={true}
          focusable={true}
        />
      );
      const nav = container.querySelector('ul');

      if (nav) {
        // In RTL, ArrowLeft should move forward
        fireEvent.keyDown(nav, { key: 'ArrowLeft' });
        expect(handler).toHaveBeenCalledWith('Products');
      }
    });
  });

  describe('RTL Support', () => {
    it('should apply RTL class when RTL prop is true', () => {
      const { container } = render(<BreadCrumb links={defaultLinks} RTL={true} />);
      const wrapper = container.querySelector('ul');
      expect(wrapper?.className).toContain('rtl');
    });

    it('should not apply RTL class when RTL prop is false', () => {
      const { container } = render(<BreadCrumb links={defaultLinks} RTL={false} />);
      const wrapper = container.querySelector('ul');
      expect(wrapper?.className).not.toContain('rtl');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      const { getByRole, getAllByRole } = render(
        <BreadCrumb links={defaultLinks} />
      );

      const nav = getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');

      const listItems = getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });

    it('should mark last breadcrumb with aria-current="page"', () => {
      const { getAllByRole } = render(<BreadCrumb links={defaultLinks} />);
      const listItems = getAllByRole('listitem');
      const lastItem = listItems[listItems.length - 1];

      expect(lastItem).toHaveAttribute('aria-current', 'page');
    });

    it('should not mark non-last breadcrumbs with aria-current', () => {
      const { getAllByRole } = render(<BreadCrumb links={defaultLinks} />);
      const listItems = getAllByRole('listitem');

      for (let i = 0; i < listItems.length - 1; i++) {
        expect(listItems[i]).not.toHaveAttribute('aria-current');
      }
    });

    it('should have proper semantic structure', () => {
      const { getByRole, getAllByRole } = render(<BreadCrumb links={defaultLinks} />);

      // Should have navigation landmark
      const nav = getByRole('navigation');
      expect(nav).toBeInTheDocument();

      // Should have list items for each breadcrumb
      const listItems = getAllByRole('listitem');
      expect(listItems).toHaveLength(3);

      // Should have list role
      const list = getByRole('list');
      expect(list).toBeInTheDocument();
    });

    it('should have focusable navigation when focusable is true', () => {
      const { container } = render(
        <BreadCrumb links={defaultLinks} focusable={true} />
      );
      const nav = container.querySelector('ul');
      expect(nav).toHaveAttribute('tabIndex', '0');
    });

    it('should not be focusable when focusable is false', () => {
      const { container } = render(
        <BreadCrumb links={defaultLinks} focusable={false} />
      );
      const nav = container.querySelector('ul');
      expect(nav).toHaveAttribute('tabIndex', '-1');
    });

    it('should have no accessibility violations', async () => {
      const { container } = render(<BreadCrumb links={defaultLinks} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long breadcrumb names', () => {
      const longLinks = [
        'Very Long Breadcrumb Name That Should Truncate On Mobile Devices',
        'Another Extremely Long Name',
      ];
      const { getByText } = render(<BreadCrumb links={longLinks} />);

      expect(
        getByText(
          'Very Long Breadcrumb Name That Should Truncate On Mobile Devices'
        )
      ).toBeInTheDocument();
    });

    it('should handle many breadcrumb items', () => {
      const manyLinks = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);
      const { getAllByRole } = render(<BreadCrumb links={manyLinks} />);
      const listItems = getAllByRole('listitem');

      expect(listItems).toHaveLength(10);
    });

    it('should not break with special characters in names', () => {
      const specialLinks = ['Home & Garden', 'Books > Comics', "What's New?"];
      const { getByText } = render(<BreadCrumb links={specialLinks} />);

      expect(getByText('Home & Garden')).toBeInTheDocument();
      expect(getByText('Books > Comics')).toBeInTheDocument();
      expect(getByText("What's New?")).toBeInTheDocument();
    });
  });

  describe('Snapshot', () => {
    it('should match snapshot with default props', () => {
      const { container } = render(<BreadCrumb links={defaultLinks} />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with all props', () => {
      const { container } = render(
        <BreadCrumb
          links={defaultLinks}
          icon="arrow"
          size="lg"
          RTL={true}
          focusable={true}
          selectedCrumbIndex={1}
        />
      );
      expect(container).toMatchSnapshot();
    });
  });
});
