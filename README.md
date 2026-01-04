# Mini E-Commerce Product & Cart Application

A production-quality React application demonstrating clean architecture, efficient state management, and React best practices.

## Architecture Overview

### Folder Structure
```
src/
  components/          # Reusable UI components
    Cart/             # Shopping cart component
    EmptyState/       # Empty state component
    Filters/          # Search, filter, and sort controls
    ProductCard/      # Individual product card
    ProductList/      # Product grid layout
    ProductModal/     # Product details modal (bonus)
  context/            # React Context providers
    CartContext.js    # Global cart state management
  hooks/              # Custom React hooks
    useProducts.js    # Product data fetching
    useFilters.js     # Filtering and sorting logic
  utils/              # Utility functions
    api.js           # API client
    constants.js     # Application constants
    debounce.js      # Debounce utility
  App.js             # Main application component
  index.js           # Application entry point
```

### Key Architectural Decisions

1. **State Management**
   - Context API for global cart state (prevents prop drilling)
   - Local state for component-specific data
   - useReducer for complex cart state logic

2. **Performance Optimization**
   - React.memo for component memoization
   - useMemo for expensive computations (filtering, sorting)
   - Debounced search to reduce API calls
   - Product list doesn't re-render on cart updates (isolated state)

3. **Separation of Concerns**
   - Custom hooks for business logic
   - Components focus on presentation
   - Utilities handle side effects (API calls, localStorage)

4. **Code Quality**
   - Single Responsibility Principle
   - Reusable components
   - Clear naming conventions
   - Proper error handling

## Features

### Core Requirements
- ✅ Product listing (15-20 products in grid layout)
- ✅ Product details (name, price, category, stock status)
- ✅ Add to cart functionality
- ✅ Search products by name
- ✅ Filter by category
- ✅ Sort by price (Low→High, High→Low)
- ✅ Clear all filters
- ✅ Combined filter functionality
- ✅ Cart management (add, remove, update quantity)
- ✅ Stock validation
- ✅ Total items and price display
- ✅ Empty states
- ✅ No unnecessary re-renders

### Bonus Features
- ✅ localStorage persistence
- ✅ Debounced search
- ✅ Product details modal

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Technical Stack

- React 18.2.0
- CSS Modules for styling
- Fetch API for data fetching
- Context API for state management

## API

The application uses [DummyJSON API](https://dummyjson.com/products) to fetch product data.

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) with ES6+ support.

