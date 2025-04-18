# Preview Components

This folder contains components for previewing URLs in iframes.

## Components

### PreviewFrame

`PreviewFrame` is a component that renders a URL in an iframe with loading status.

#### Props

- `url` (string): The URL to be loaded in the iframe.
- `refreshKey` (number): A key to trigger refreshing the iframe. When this value changes, the iframe reloads.
- `onReady` (function): A callback function that is called when the iframe has finished loading.

### PreviewManager

`PreviewManager` manages multiple PreviewFrames with a tabbed interface.

#### Props

- `urls` (string[]): An array of URLs to be previewed.

Features:
- Tabbed interface for navigating between previews
- Individual and batch refresh capabilities
- Loading indicators
- Responsive design

### PreviewDemo

`PreviewDemo` is a demonstration component that showcases the PreviewManager with a form for adding and removing URLs.

## Usage

```tsx
// Basic usage
import PreviewManager from '@/components/PreviewManager';

export default function MyPage() {
  const urls = [
    'https://example.com',
    'https://another-example.com'
  ];
  
  return <PreviewManager urls={urls} />;
}

// For a complete demo with URL management
import PreviewDemo from '@/components/PreviewDemo';

export default function MyPage() {
  return <PreviewDemo />;
}
```

## Demo Page

A demo page is available at `/preview` that showcases all the functionality of these components. 