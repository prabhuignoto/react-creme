# Algolia Search Integration Guide

This document outlines how the React Creme documentation uses Algolia for component search and how to configure it.

## Overview

React Creme uses **Algolia DocSearch** for fast, efficient component search across the documentation site. Search is integrated in:
- Header (all pages)
- Landing page navbar
- Sidebar navigation (built-in component filter)

## Current Status

✅ **Algolia DocSearch is integrated and active**

All search functionality uses the `@docsearch/react` library, which is the official Algolia solution for documentation sites.

## Environment Variables

To enable Algolia search, you need to configure three environment variables in your `.env` file (documentation package root):

```env
# Algolia Configuration
VITE_APP_ALGOLIA_APP_ID=your_app_id_here
VITE_APP_ALGOLIA_API_KEY=your_public_search_api_key_here
VITE_APP_ALGOLIA_INDEX_NAME=your_index_name_here
```

### Getting Your Algolia Credentials

1. **Create an Algolia Account**: Visit [algolia.com](https://www.algolia.com) and sign up
2. **Get Your App ID**: Found in your dashboard under "Settings" → "API Keys"
3. **Get Your Search API Key**:
   - Use the **PUBLIC Search API Key** (not the Admin API Key)
   - Found under "Settings" → "API Keys" → "Search-only API Key"
4. **Create/Get Your Index Name**:
   - Default name in the codebase: `react_creme_components`
   - You can create a new index in the Algolia dashboard

## Search Integration Points

### 1. Header Search (Desktop & Mobile)
**File**: `packages/documentation/home/header/index.tsx`

The header displays DocSearch across all pages and works on both desktop and mobile devices.

```tsx
<DocSearch
  apiKey={import.meta.env.VITE_APP_ALGOLIA_API_KEY as string}
  appId={import.meta.env.VITE_APP_ALGOLIA_APP_ID as string}
  indexName={import.meta.env.VITE_APP_ALGOLIA_INDEX_NAME as string}
  hitComponent={AlgoliaHit}
  disableUserPersonalization
  placeholder="Search components..."
/>
```

### 2. Landing Page Search
**File**: `packages/documentation/home/landing/navbar.tsx`

DocSearch is integrated into the landing page navbar, allowing visitors to search for components directly from the landing page.

### 3. Sidebar Component Search
**File**: `packages/documentation/home/sidebar-home.tsx`

The sidebar has built-in search enabled (`enableSearch={true}`) that filters the component list as users type. This provides a fast, client-side search of the component directory.

## Setting Up Algolia Index

### Using Algolia Web Crawler (Recommended for Documentation)

1. Go to your Algolia Dashboard
2. Navigate to "Crawler" → "New Crawler"
3. Set the start URL to: `https://your-documentation-url.com`
4. Configure crawler settings:
   - **Allowed domains**: Your documentation domain
   - **Search parameters**: Include paths, titles, and content
   - **Inclusion patterns**: Include all component pages
5. Run the crawler to index your site
6. The crawler will automatically extract structured content

### Manual Index Creation (If Needed)

You can manually push content to Algolia using the `algoliasearch` SDK:

```typescript
import algoliasearch from 'algoliasearch';

const client = algoliasearch('YOUR_APP_ID', 'YOUR_ADMIN_API_KEY');
const index = client.initIndex('react_creme_components');

const records = [
  {
    objectID: '1',
    name: 'Button',
    category: 'Inputs',
    description: 'A clickable button component',
    url: '/button',
  },
  // ... more components
];

index.saveObjects(records);
```

## Indexing Component Data

The searchable index should include:

- **Component Name**: e.g., "Button", "Card", "Dialog"
- **Category**: e.g., "Inputs", "Layouts", "Feedback"
- **Description**: Brief description of the component
- **URL**: Link to the component documentation page
- **Metadata**: Any additional searchable attributes

Current component categories in React Creme:
- Getting Started
- Layout
- Content
- Inputs
- Feedback
- Data
- Navigation
- Overlay
- Utilities

## Customization

### Custom Hit Component

The `AlgoliaHit` component in the header transforms Algolia results into clickable links:

```tsx
const AlgoliaHit = ({
  hit,
  children,
}: {
  children: ReactNode;
  hit: { url: string };
}) => {
  const route = `/${hit.url.split('/').pop()}`;
  return (
    <div className="rc-algolia-hit" style={{ width: '100%' }}>
      <Link to={route}>{children}</Link>
    </div>
  );
};
```

Modify this component to customize how search results are displayed and navigated.

### Search Placeholder

The placeholder text can be customized in each DocSearch instance:

```tsx
<DocSearch
  // ... other props
  placeholder="Search components..."
/>
```

## Troubleshooting

### Search Not Working

1. **Check environment variables**: Ensure `VITE_APP_ALGOLIA_*` are set correctly
2. **Verify credentials**: Double-check your App ID and API Key in Algolia Dashboard
3. **Check index name**: Make sure the index exists in Algolia and contains data
4. **Browser console**: Look for error messages in the browser console

### Index Not Updated

1. **Run crawler again**: If using Web Crawler, manually trigger a crawl
2. **Verify URL structure**: Ensure the crawler can access your documentation URLs
3. **Check robots.txt**: Make sure the crawler isn't blocked by robots.txt

### Slow Search Results

1. **Optimize index**: Review Algolia's indexing settings in the dashboard
2. **Reduce searchable attributes**: Index only necessary fields
3. **Use faceted search**: Filter results by category to narrow results

## Performance Metrics

- **Search latency**: < 100ms (typical for Algolia)
- **Index size**: Components + descriptions + metadata
- **Query complexity**: Simple text search (no complex queries)

## References

- [Algolia Documentation](https://www.algolia.com/doc/)
- [@docsearch/react Documentation](https://docsearch.algolia.com/)
- [Algolia Web Crawler](https://www.algolia.com/doc/tools/crawler/getting-started/overview/)

## Future Enhancements

- [ ] Add search analytics to track popular queries
- [ ] Implement faceted search by category
- [ ] Add keyboard shortcuts for search focus (Cmd+K / Ctrl+K)
- [ ] Enable recent searches feature
- [ ] Add search suggestions based on component popularity
- [ ] Implement search synonyms (e.g., "modal" → "dialog")
