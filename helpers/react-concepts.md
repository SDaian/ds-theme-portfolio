# React Concepts Reference

A comprehensive guide to essential React concepts and patterns.

## 🔹 Core Concepts

### Components
```jsx
// Functional Component
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Class Component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### Props
```jsx
// Props are read-only data passed to components
function UserCard({ user, onEdit }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  );
}

// Usage
<UserCard user={{ id: 1, name: 'John' }} onEdit={handleEdit} />
```

### State
```jsx
// Local state with useState
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

## 🔹 Lifecycle Methods

### Class Component Lifecycle
```jsx
class MyComponent extends React.Component {
  componentDidMount() {
    // Called after component is mounted
    console.log('Component mounted');
  }
  
  componentDidUpdate(prevProps, prevState) {
    // Called after component updates
    if (prevProps.userId !== this.props.userId) {
      this.fetchUserData();
    }
  }
  
  componentWillUnmount() {
    // Cleanup before component is removed
    clearInterval(this.timer);
  }
  
  render() {
    return <div>{this.props.content}</div>;
  }
}
```

### Functional Equivalents with Hooks
```jsx
function MyComponent({ userId, content }) {
  // componentDidMount + componentWillUnmount
  useEffect(() => {
    console.log('Component mounted');
    
    return () => {
      // Cleanup function (componentWillUnmount)
      console.log('Component will unmount');
    };
  }, []); // Empty dependency array = mount/unmount only
  
  // componentDidUpdate
  useEffect(() => {
    fetchUserData();
  }, [userId]); // Run when userId changes
  
  return <div>{content}</div>;
}
```

## 🔹 React Hooks

### useState
```jsx
function FormExample() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic
    setErrors({ name: !name ? 'Name required' : '' });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      {errors.name && <span>{errors.name}</span>}
    </form>
  );
}
```

### useEffect
```jsx
function DataFetcher({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let cancelled = false;
    
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await api.getUser(userId);
        if (!cancelled) {
          setUser(response.data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to fetch user:', error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    
    fetchUser();
    
    return () => {
      cancelled = true; // Cleanup: prevent state updates if component unmounts
    };
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  return user ? <div>{user.name}</div> : <div>User not found</div>;
}
```

### useContext
```jsx
// Create context
const ThemeContext = createContext();

// Provider
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  );
}

// Consumer
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <header className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </header>
  );
}
```

### Custom Hooks
```jsx
// Custom hook for API calls
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(`/api/users/${userId}`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Welcome, {user.name}!</div>;
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  return [storedValue, setValue];
}
```

## 🔹 State Management

### Context API (Small to Medium Apps)
```jsx
// Best for: Theme, user auth, language settings
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  const login = async (credentials) => {
    const user = await authService.login(credentials);
    setUser(user);
  };
  
  return (
    <AppContext.Provider value={{ 
      user, 
      theme, 
      setTheme, 
      login 
    }}>
      {children}
    </AppContext.Provider>
  );
}
```

### Redux (Large Apps with Complex State)
```jsx
// Actions
const increment = () => ({ type: 'INCREMENT' });
const decrement = () => ({ type: 'DECREMENT' });

// Reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Component
function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

### Recoil (Facebook's Experimental State Management)
```jsx
// Atom (piece of state)
const countState = atom({
  key: 'countState',
  default: 0,
});

// Component
function Counter() {
  const [count, setCount] = useRecoilState(countState);
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

## 🔹 Routing

### Basic React Router
```jsx
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Nested Routes
```jsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />}>
          <Route path=":id" element={<ProductDetail />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <header>My App</header>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}
```

### Dynamic Routing & Navigation
```jsx
function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    navigate(-1); // Go back
    // Or navigate to specific route: navigate('/users');
  };
  
  return (
    <div>
      <h1>User {id}</h1>
      <button onClick={handleBack}>Go Back</button>
    </div>
  );
}
```

## 🔹 Performance

### React.memo (Component Memoization)
```jsx
// Only re-renders if props change
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data, onUpdate }) {
  console.log('Rendering ExpensiveComponent');
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});

// Custom comparison function
const MyComponent = React.memo(function MyComponent({ user }) {
  return <div>{user.name}</div>;
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  return prevProps.user.id === nextProps.user.id;
});
```

### useMemo & useCallback
```jsx
function SearchResults({ query, items }) {
  // Memoize expensive calculations
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);
  
  // Memoize callback functions
  const handleItemClick = useCallback((itemId) => {
    console.log('Item clicked:', itemId);
    // Handle click logic
  }, []); // No dependencies = function never changes
  
  return (
    <div>
      {filteredItems.map(item => (
        <SearchItem 
          key={item.id} 
          item={item} 
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
}
```

### Lazy Loading & Code Splitting
```jsx
// Lazy load components
const LazyComponent = lazy(() => import('./LazyComponent'));
const AnotherLazyComponent = lazy(() => 
  import('./AnotherComponent').then(module => ({
    default: module.AnotherComponent
  }))
);

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lazy" element={<LazyComponent />} />
          <Route path="/another" element={<AnotherLazyComponent />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Route-based code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

### Virtual Scrolling (for Large Lists)
```jsx
// Using react-window for performance
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      Item {items[index].name}
    </div>
  );
  
  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

## 🔹 Testing

### Jest + React Testing Library
```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter Component', () => {
  test('renders initial count', () => {
    render(<Counter />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
  
  test('increments count when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    const incrementButton = screen.getByRole('button', { name: '+' });
    await user.click(incrementButton);
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
  
  test('handles async operations', async () => {
    render(<AsyncComponent />);
    
    const button = screen.getByText('Load Data');
    fireEvent.click(button);
    
    // Wait for async operation
    await waitFor(() => {
      expect(screen.getByText('Data loaded')).toBeInTheDocument();
    });
  });
});
```

### Testing Custom Hooks
```jsx
import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

describe('useCounter Hook', () => {
  test('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });
  
  test('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

### Snapshot Testing
```jsx
import renderer from 'react-test-renderer';
import Button from './Button';

test('Button component snapshot', () => {
  const tree = renderer
    .create(<Button onClick={() => {}}>Click me</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

### Testing Context
```jsx
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import ThemedButton from './ThemedButton';

const renderWithTheme = (ui, { theme = 'light' } = {}) => {
  return render(
    <ThemeProvider value={{ theme }}>
      {ui}
    </ThemeProvider>
  );
};

test('renders with light theme', () => {
  renderWithTheme(<ThemedButton />);
  expect(screen.getByRole('button')).toHaveClass('light-theme');
});
```

## Best Practices

### Component Design
- Keep components small and focused
- Use composition over inheritance
- Prefer functional components with hooks
- Extract custom hooks for reusable logic

### Performance
- Use React.memo for expensive components
- Memoize callbacks and expensive calculations
- Implement code splitting for large applications
- Use React DevTools Profiler to identify bottlenecks

### State Management
- Start with local state, lift up when needed
- Use Context for app-wide state (theme, auth)
- Consider Redux for complex state interactions
- Keep state as minimal as possible

### Testing
- Test behavior, not implementation
- Use React Testing Library over Enzyme
- Mock external dependencies
- Aim for high test coverage on critical paths