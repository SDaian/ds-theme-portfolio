# Frontend Interview Simulation Guide

## 📌 JavaScript Fundamentals

### 🔹 var, let, and const - What's the difference?

**Key Differences:**
- **Scope**: `var` is function-scoped, `let` and `const` are block-scoped
- **Hoisting**: All are hoisted, but `let` and `const` can't be used before declaration
- **Re-declaration**: `var` allows re-declaration, `let` and `const` don't
- **Reassignment**: `var` and `let` can be reassigned, `const` cannot

**Example with Scoping:**
```javascript
function scopeExample() {
  if (true) {
    var varVariable = "I'm function scoped";
    let letVariable = "I'm block scoped";
    const constVariable = "I'm also block scoped";
  }
  
  console.log(varVariable); // ✅ Works - "I'm function scoped"
  console.log(letVariable); // ❌ ReferenceError
  console.log(constVariable); // ❌ ReferenceError
}
```

### 🔹 What is hoisting in JavaScript?

**Simple Definition:** Hoisting means variable and function declarations are moved to the top of their scope during compilation.

**How it works:**
```javascript
// What you write:
console.log(myVar); // undefined (not an error!)
var myVar = 5;

// How JavaScript sees it:
var myVar; // Declaration hoisted
console.log(myVar); // undefined
myVar = 5; // Assignment stays in place
```

**With let/const:**
```javascript
console.log(myLet); // ❌ ReferenceError: Cannot access before initialization
let myLet = 10;
```

### 🔹 What is Temporal Dead Zone?

**Simple Definition:** The period between when a variable is hoisted and when it's declared where you can't access it.

```javascript
console.log(typeof myVar); // "undefined"
console.log(typeof myLet); // ❌ ReferenceError (TDZ)

var myVar = 1;
let myLet = 2;
```

### 🔹 JavaScript Promises - Handling Async Code

**What is a Promise?**
A Promise represents a future value that will be available later (resolved) or an error (rejected).

```javascript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Data loaded successfully!");
  }, 2000);
});

// Using a Promise
myPromise
  .then(result => console.log(result))
  .catch(error => console.log(error));
```

**Three States:**
- **Pending**: Initial state
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

### 🔹 Promises vs Async/Await

**Promises (Traditional):**
```javascript
fetchUser()
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts))
  .catch(error => console.log(error));
```

**Async/Await (Modern):**
```javascript
async function getUserPosts() {
  try {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    console.log(posts);
  } catch (error) {
    console.log(error);
  }
}
```

**Key Differences:**
- Async/await makes code look synchronous
- Better error handling with try/catch
- Easier to debug and read

### 🔹 Destructuring in JavaScript

**Simple Definition:** Extract values from objects and arrays into separate variables.

**Array Destructuring:**
```javascript
const colors = ['red', 'blue', 'green'];
const [first, second] = colors;
console.log(first); // 'red'
console.log(second); // 'blue'
```

**Object Destructuring:**
```javascript
const person = { name: 'John', age: 30, city: 'NYC' };
const { name, age } = person;
console.log(name); // 'John'
console.log(age); // 30

// With renaming
const { name: fullName } = person;
console.log(fullName); // 'John'
```

## 📌 React Fundamentals

### 🔹 Class vs Functional Components

**Class Components (Old Way):**
```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  render() {
    return <div>Count: {this.state.count}</div>;
  }
}
```

**Functional Components (Modern Way):**
```javascript
function MyComponent() {
  const [count, setCount] = useState(0);
  
  return <div>Count: {count}</div>;
}
```

**Key Differences:**
- Functional components are simpler and shorter
- Use hooks for state and lifecycle
- Better performance
- Easier to test

### 🔹 Props Drilling & Solutions

**What is Props Drilling?**
Passing props through multiple component levels even when intermediate components don't need them.

**Problem:**
```javascript
// App -> Header -> Navigation -> UserMenu
function App() {
  const user = { name: 'John' };
  return <Header user={user} />;
}

function Header({ user }) {
  return <Navigation user={user} />; // Just passing through
}

function Navigation({ user }) {
  return <UserMenu user={user} />; // Just passing through
}
```

**Solutions:**
1. **Context API** (React built-in)
2. **Redux** (State management)
3. **Component composition**

### 🔹 Redux vs Context API

**When to use Context API:**
- Small to medium applications
- Simple state sharing
- Less frequent updates
- No time-travel debugging needed

**When to use Redux:**
- Large, complex applications
- Frequent state updates
- Need debugging tools (DevTools)
- Complex state logic
- Multiple developers working

**Context API Example:**
```javascript
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
    </UserContext.Provider>
  );
}

function Header() {
  const { user } = useContext(UserContext);
  return <div>Hello, {user?.name}</div>;
}
```

### 🔹 React Performance Optimization

**1. React.memo** - Prevent unnecessary re-renders:
```javascript
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data.name}</div>;
});
```

**2. useMemo** - Memoize expensive calculations:
```javascript
function Component({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);
  
  return <div>{expensiveValue}</div>;
}
```

**3. useCallback** - Memoize functions:
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return <Child onClick={handleClick} />;
}
```

**4. Code Splitting** - Load components when needed:
```javascript
const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 🔹 useReducer Hook

**When to use:** When you have complex state logic or multiple related state values.

```javascript
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

### 🔹 Refs in React

**What are Refs?** Direct access to DOM elements or component instances.

**Common Use Cases:**
- Focus management
- Triggering animations
- Integrating with third-party libraries

```javascript
function FocusInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

**forwardRef** - Pass refs to child components:
```javascript
const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});
```

### 🔹 React Routing Implementation

**Using React Router:**

```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users/123">User Profile</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function UserProfile() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}
```

**Key Components:**
- **BrowserRouter**: Provides routing context
- **Routes**: Container for route definitions
- **Route**: Individual route definition
- **Link**: Navigation links
- **useParams**: Access route parameters
- **useNavigate**: Programmatic navigation

## 🎯 Interview Tips

1. **Practice coding** these concepts
2. **Explain your thinking** out loud
3. **Ask clarifying questions** when unsure
4. **Start simple** then add complexity
5. **Test your solutions** mentally

Remember: It's not just about knowing the answer, but explaining the "why" behind your choices!