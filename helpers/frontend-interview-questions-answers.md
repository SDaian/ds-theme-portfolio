# Frontend Interview Questions & Answers

*Based on Ekaterina Korzneva's LinkedIn post about her Junior Frontend Developer interview experience*

## 💬 Getting Started

### 1. Introduce yourself (an elevator pitch really helps here)

**Answer:**
"Hi, I'm a passionate frontend developer with expertise in React, JavaScript, and TypeScript. I have experience building responsive, user-friendly web applications and enjoy solving complex problems through clean, maintainable code. I'm particularly interested in performance optimization and creating seamless user experiences. I'm always eager to learn new technologies and collaborate with teams to deliver high-quality products."

### 2. Why web development, and why React?

**Answer:**
"I chose web development because I love the combination of creativity and logic it requires. There's something deeply satisfying about turning ideas into interactive experiences that users can engage with immediately. I chose React specifically because:
- Its component-based architecture promotes reusability and maintainability
- The virtual DOM provides excellent performance optimization
- It has a rich ecosystem and strong community support
- The declarative approach makes code more predictable and easier to debug
- It's widely adopted in the industry, making it valuable for career growth"

## ⚛️ React Fundamentals

### 3. Component Lifecycle

**Answer:**
React components have three main lifecycle phases:

**Mounting:**
- `constructor()` - Initialize state and bind methods
- `componentDidMount()` - Runs after component is mounted (API calls, subscriptions)

**Updating:**
- `componentDidUpdate()` - Runs after component updates (side effects based on props/state changes)
- `getSnapshotBeforeUpdate()` - Capture info before DOM updates

**Unmounting:**
- `componentWillUnmount()` - Cleanup (remove listeners, cancel requests)

**Modern Hooks Equivalent:**
- `useEffect()` can handle all lifecycle phases:
  - Mount: `useEffect(() => {}, [])`
  - Update: `useEffect(() => {})`
  - Cleanup: `useEffect(() => { return () => {} }, [])`

### 4. Virtual DOM

**Answer:**
The Virtual DOM is a JavaScript representation of the real DOM kept in memory. It's a programming concept where a "virtual" representation of the UI is kept in memory and synced with the "real" DOM.

**How it works:**
1. When state changes, React creates a new virtual DOM tree
2. React compares (diffs) the new tree with the previous virtual DOM tree
3. React calculates the minimum changes needed
4. React updates only the changed parts in the real DOM

**Benefits:**
- Faster updates (batch processing)
- Better performance (fewer DOM manipulations)
- Predictable updates
- Cross-browser compatibility

### 5. Difference between state & props

**Answer:**

| **State** | **Props** |
|-----------|-----------|
| Mutable (can be changed) | Immutable (read-only) |
| Internal to component | Passed from parent component |
| Managed by component itself | Controlled by parent |
| Can trigger re-renders when changed | Received as function arguments |
| Local component data | Communication between components |

```javascript
// State example
const [count, setCount] = useState(0);

// Props example
function Child({ name, age }) {
  return <div>{name} is {age} years old</div>;
}
```

### 6. Hooks

**Answer:**
Hooks are functions that let you "hook into" React state and lifecycle features from functional components.

**Common Hooks:**
- `useState()` - Manage component state
- `useEffect()` - Handle side effects and lifecycle
- `useContext()` - Access context values
- `useReducer()` - Complex state management
- `useCallback()` - Memoize functions
- `useMemo()` - Memoize expensive calculations
- `useRef()` - Access DOM elements or persist values

**Rules of Hooks:**
1. Only call hooks at the top level
2. Only call hooks from React functions
3. Use the same order in every render

### 7. Dependency array in useEffect – what happens if it's removed?

**Answer:**
The dependency array controls when useEffect runs:

```javascript
// With empty dependency array - runs once after mount
useEffect(() => {
  console.log('Runs once');
}, []);

// With dependencies - runs when dependencies change
useEffect(() => {
  console.log('Runs when count changes');
}, [count]);

// NO dependency array - runs after every render
useEffect(() => {
  console.log('Runs after every render');
}); // ← No array = runs every time
```

**If removed:** The effect runs after every render, which can cause:
- Performance issues
- Infinite loops (if the effect updates state)
- Unnecessary API calls
- Memory leaks

### 8. useRef hook

**Answer:**
`useRef` returns a mutable ref object with a `.current` property that persists across renders.

**Use cases:**
1. **Accessing DOM elements:**
```javascript
const inputRef = useRef(null);

const focusInput = () => {
  inputRef.current.focus();
};

return <input ref={inputRef} />;
```

2. **Storing mutable values that don't trigger re-renders:**
```javascript
const renderCount = useRef(0);
renderCount.current += 1; // Doesn't cause re-render
```

**Key differences from state:**
- Doesn't trigger re-renders when changed
- Mutable object
- Persists between renders

### 9. Key prop

**Answer:**
The `key` prop is a special attribute used by React to identify list items and optimize rendering.

**Purpose:**
- Helps React identify which items have changed, been added, or removed
- Enables efficient updates to lists
- Maintains component state correctly

```javascript
// Good - using unique, stable keys
{users.map(user => (
  <UserComponent key={user.id} user={user} />
))}

// Bad - using array index (can cause issues)
{users.map((user, index) => (
  <UserComponent key={index} user={user} />
))}
```

**Best practices:**
- Use stable, unique identifiers
- Avoid array indices for dynamic lists
- Keep keys consistent across renders

### 10. useMemo hook

**Answer:**
`useMemo` memoizes expensive calculations and returns the cached result if dependencies haven't changed.

```javascript
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]); // Only recalculates when 'data' changes
```

**When to use:**
- Expensive calculations
- Preventing unnecessary re-creation of objects
- Optimizing child component renders

**When NOT to use:**
- Simple calculations
- Every computation (premature optimization)
- When dependencies change frequently

### 11. Controlled vs uncontrolled components

**Answer:**

**Controlled Components:**
- Form data is handled by React component's state
- Input values are controlled by React
- Single source of truth

```javascript
const [value, setValue] = useState('');

return (
  <input 
    value={value} 
    onChange={(e) => setValue(e.target.value)} 
  />
);
```

**Uncontrolled Components:**
- Form data is handled by the DOM
- Use refs to access input values
- DOM is the source of truth

```javascript
const inputRef = useRef(null);

const handleSubmit = () => {
  console.log(inputRef.current.value);
};

return <input ref={inputRef} />;
```

## 📝 Take-home Assignment Questions

### 12. Responsiveness of images

**Answer:**
Several techniques for responsive images:

**CSS Approaches:**
```css
/* Basic responsive image */
img {
  max-width: 100%;
  height: auto;
}

/* Object-fit for aspect ratio control */
img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
```

**HTML5 Picture Element:**
```html
<picture>
  <source media="(min-width: 768px)" srcset="large.jpg">
  <source media="(min-width: 480px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Responsive image">
</picture>
```

**React Implementation:**
```javascript
const ResponsiveImage = ({ src, alt }) => (
  <img 
    src={src}
    alt={alt}
    style={{
      maxWidth: '100%',
      height: 'auto',
      display: 'block'
    }}
  />
);
```

### 13. Lazy loading of images

**Answer:**
Lazy loading delays image loading until they're needed (usually when they enter the viewport).

**Native Lazy Loading:**
```html
<img src="image.jpg" loading="lazy" alt="Description">
```

**React with Intersection Observer:**
```javascript
const LazyImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef}>
      {isLoaded ? (
        <img src={src} alt={alt} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
```

**Libraries:**
- `react-lazyload`
- `react-intersection-observer`
- `react-lazy-load-image-component`

### 14. What are the options for implementing infinite scroll, and why did you choose yours?

**Answer:**
**Options for Infinite Scroll:**

1. **Intersection Observer API (Recommended)**
   - Modern, performant browser API
   - Automatically detects when elements enter viewport
   - No scroll event listeners needed

2. **Scroll Event Listeners**
   - Traditional approach
   - Calculate scroll position manually
   - Can be performance-heavy

3. **Third-party Libraries**
   - `react-infinite-scroll-component`
   - `react-window` / `react-virtualized`

**My Choice: Intersection Observer**

```javascript
const InfiniteScroll = ({ items, loadMore, hasMore }) => {
  const loadingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.content}</div>
      ))}
      {hasMore && <div ref={loadingRef}>Loading...</div>}
    </div>
  );
};
```

**Why Intersection Observer:**
- Better performance (no scroll calculations)
- Automatic cleanup
- Modern browser support
- More declarative approach

### 15. Why is it important to clean up event listeners?

**Answer:**
Cleaning up event listeners is crucial for:

**1. Memory Leaks Prevention:**
```javascript
useEffect(() => {
  const handleScroll = () => {
    // Handle scroll
  };

  window.addEventListener('scroll', handleScroll);

  // Cleanup to prevent memory leak
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

**2. Performance Issues:**
- Multiple listeners on the same event
- Listeners continue firing after component unmount
- Accumulation of unnecessary event handlers

**3. Unexpected Behavior:**
- State updates in unmounted components
- Multiple event handlers triggering
- Memory consumption growth

**4. React-specific Issues:**
```javascript
// This will cause warnings and potential issues
useEffect(() => {
  const timer = setInterval(() => {
    setState(prev => prev + 1); // Component might be unmounted
  }, 1000);

  // Always cleanup
  return () => clearInterval(timer);
}, []);
```

### 16. CSS Modules

**Answer:**
CSS Modules provide locally scoped CSS to avoid naming conflicts and improve maintainability.

**How it works:**
```css
/* Button.module.css */
.primary {
  background-color: blue;
  color: white;
}

.secondary {
  background-color: gray;
  color: black;
}
```

```javascript
// Button.jsx
import styles from './Button.module.css';

const Button = ({ variant, children }) => (
  <button className={styles[variant]}>
    {children}
  </button>
);
```

**Benefits:**
- **Scoped styles:** No global namespace pollution
- **Maintainability:** Easier to refactor and maintain
- **Modularity:** Styles are colocated with components
- **Build-time optimization:** Unused styles can be eliminated

**Alternatives:**
- Styled-components
- Emotion
- Tailwind CSS
- CSS-in-JS solutions

## 🤝 Team & Mindset

### 17. How would you act in a situation where you disagree with other juniors on which technology to use?

**Answer:**
When facing technology disagreements with fellow juniors:

**1. Listen and Understand:**
- Hear out their perspective completely
- Ask clarifying questions about their reasoning
- Try to understand the problem they're trying to solve

**2. Research and Present Facts:**
- Gather objective data about both options
- Consider factors like: learning curve, community support, performance, long-term maintenance
- Present pros and cons objectively

**3. Seek Senior Input:**
- Escalate to senior developers or tech leads
- Frame it as a learning opportunity, not a conflict
- Present both options and ask for guidance

**4. Focus on Project Goals:**
- Align discussion with project requirements
- Consider team expertise and timeline
- Think about long-term maintenance

**5. Be Open to Learning:**
- Maybe their solution is better than mine
- Use it as an opportunity to learn new technologies
- Compromise when necessary

**Example Response:**
"I would suggest we list the pros and cons of each technology, maybe do a small spike to test both approaches, and then consult with a senior developer. The most important thing is choosing what's best for the project and our team's success, not being 'right' about my preference."

## 🔑 Key Takeaways for Interview Preparation

### Technical Preparation:
- **Master the fundamentals:** Components, state, props, lifecycle, hooks
- **Understand performance:** Virtual DOM, memoization, optimization techniques
- **Practice problem-solving:** Implement common patterns (infinite scroll, lazy loading)
- **Know the ecosystem:** Popular libraries, testing frameworks, build tools

### Soft Skills Preparation:
- **Communication:** Practice explaining technical concepts simply
- **Collaboration:** Prepare examples of teamwork and conflict resolution
- **Learning mindset:** Show enthusiasm for continuous learning
- **Problem-solving approach:** Demonstrate systematic thinking

### Project Discussion:
- **Be ready to explain choices:** Why did you use specific technologies?
- **Discuss trade-offs:** What alternatives did you consider?
- **Share lessons learned:** What would you do differently?
- **Show growth:** How did you overcome challenges?

---

*This guide covers the essential frontend interview questions and provides comprehensive answers to help prepare for technical interviews. Remember to practice explaining these concepts in your own words and be ready to provide concrete examples from your experience.*