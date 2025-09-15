'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const frontendInterviewData = {
  title: 'Frontend Interview Preparation',
  subtitle:
    'Comprehensive guide with frequently asked questions to ace your frontend development interviews',
  sections: [
    {
      title: 'JavaScript & ES6 Fundamentals',
      questions: [
        {
          question: 'What is the difference between var, let, and const?',
          answer:
            "<strong>Key differences:</strong><br/>• <strong>Scope:</strong> <code>var</code> is function-scoped, <code>let</code> and <code>const</code> are block-scoped<br/>• <strong>Hoisting:</strong> all are hoisted, but <code>let</code> and <code>const</code> can't be used before declaration<br/>• <strong>Re-declaration:</strong> <code>var</code> allows re-declaration, <code>let</code> and <code>const</code> don't<br/>• <strong>Reassignment:</strong> <code>var</code> and <code>let</code> can be reassigned, <code>const</code> cannot<br/><br/><em>Example:</em> In an if block, <code>var</code> variables are accessible outside the block, while <code>let</code> and <code>const</code> are not.",
        },
        {
          question: 'What is hoisting in JavaScript?',
          answer:
            "Hoisting means variable and function declarations are moved to the top of their scope during compilation. With var, the declaration is hoisted and initialized with undefined. With let and const, they're hoisted but not initialized, creating a Temporal Dead Zone where you can't access them before declaration.",
        },
        {
          question: 'What is the Temporal Dead Zone?',
          answer:
            "The Temporal Dead Zone is the period between when a variable is hoisted and when it's declared where you can't access it. For example, accessing a let or const variable before its declaration throws a ReferenceError, while var would return undefined.",
        },
        {
          question: 'How do JavaScript Promises work?',
          answer:
            'A <strong>Promise</strong> represents a future value that will be available later (resolved) or an error (rejected).<br/><br/><strong>Three states:</strong><br/>• <strong>Pending:</strong> initial state<br/>• <strong>Fulfilled:</strong> operation completed successfully<br/>• <strong>Rejected:</strong> operation failed<br/><br/>They help handle asynchronous operations with <code>.then()</code> for success and <code>.catch()</code> for errors.',
        },
        {
          question: 'What is the difference between Promises and async/await?',
          answer:
            'Promises use .then() chains which can become complex. Async/await makes asynchronous code look synchronous and is easier to read and debug. Async functions always return a Promise, and await pauses execution until the Promise resolves. Error handling is better with try/catch blocks instead of .catch().',
        },
        {
          question: 'How does destructuring work in JavaScript?',
          answer:
            'Destructuring extracts values from objects and arrays into separate variables. For arrays: const [first, second] = colors extracts first two elements. For objects: const { name, age } = person extracts those properties. You can also rename variables: const { name: fullName } = person.',
        },
        {
          question: 'Explain closures in JavaScript',
          answer:
            'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. This happens because functions in JavaScript form closures over the environment in which they were created, maintaining references to outer variables. Closures are useful for data privacy, creating function factories, and maintaining state in asynchronous operations.',
        },
        {
          question: 'What is the difference between debouncing and throttling?',
          answer:
            'Debouncing delays function execution until after a specified time has passed since the last invocation - useful for search inputs to avoid excessive API calls. Throttling limits function execution to once per specified time interval - useful for scroll events to maintain performance. Debouncing waits for a pause in activity, while throttling ensures regular execution intervals.',
        },
      ],
    },
    {
      title: 'React Development',
      questions: [
        {
          question: 'What is the Virtual DOM and how does it work?',
          answer:
            'The Virtual DOM is a JavaScript representation of the real DOM kept in memory. React creates a virtual DOM tree, and when state changes, it creates a new virtual DOM tree, compares (diffs) it with the previous one, and updates only the changed elements in the real DOM. This makes updates more efficient by minimizing expensive DOM operations.',
        },
        {
          question: 'What are React Hooks and why were they introduced?',
          answer:
            'React Hooks are functions that let you use state and other React features in functional components. They were introduced to avoid the complexity of class components, enable better code reuse through custom hooks, and provide a more direct API to React concepts. Common hooks include useState, useEffect, useContext, and useReducer.',
        },
        {
          question: 'How do you create a custom hook?',
          answer:
            'Custom hooks are JavaScript functions that start with "use" and can call other hooks. They allow you to extract component logic into reusable functions. Example: A useApi hook that manages data, loading, and error states for API calls. It uses useState for state management and useEffect for the API request, returning an object with data, loading, and error values that components can destructure and use.',
        },
        {
          question:
            'What happens when you remove the dependency array in useEffect?',
          answer:
            'The dependency array controls when useEffect runs. With an empty array [], it runs once after mount. With dependencies [count], it runs when those values change. With NO dependency array, it runs after every render, which can cause performance issues and infinite loops. Always include a dependency array to control when effects should run.',
        },
        {
          question: 'What are the different ways to handle state in React?',
          answer:
            '<strong>State can be handled using:</strong><br/>1. <code>useState</code> hook for local component state<br/>2. <code>useReducer</code> for complex state logic<br/>3. <strong>Context API</strong> for sharing state across components<br/>4. External libraries like <strong>Redux, Zustand, or Jotai</strong> for global state management<br/>5. Server state libraries like <strong>React Query or SWR</strong> for API data management',
        },
        {
          question: 'What is the difference between state and props?',
          answer:
            '<strong>State</strong> is <em>mutable</em> and internal to a component, managed by the component itself and can trigger re-renders when changed - used for local component data.<br/><br/><strong>Props</strong> are <em>immutable</em> (read-only) and passed from parent components, controlled by the parent and received as function arguments - used for communication between components.<br/><br/><strong>Examples:</strong><br/>State: <code>const [count, setCount] = useState(0)</code><br/>Props: <code>function Child({ name, age }) { return &lt;div&gt;{name} is {age} years old&lt;/div&gt;; }</code>',
        },
        {
          question:
            'What is the difference between Class and Functional components?',
          answer:
            "Class components use ES6 classes with lifecycle methods and this.state for state management. Functional components are simpler functions that use hooks for state and lifecycle. Functional components are modern React's preferred approach - they're shorter, have better performance, are easier to test, and use hooks instead of lifecycle methods.",
        },
        {
          question: 'What is props drilling and how do you solve it?',
          answer:
            "Props drilling is passing props through multiple component levels even when intermediate components don't need them. Solutions include: 1) Context API for simple state sharing in small-medium apps, 2) Redux for complex applications with frequent updates, and 3) Component composition to avoid unnecessary prop passing.",
        },
        {
          question: 'When should you use Redux vs Context API?',
          answer:
            'Use Context API for small to medium applications with simple state sharing and less frequent updates. Use Redux for large, complex applications with frequent state updates, when you need debugging tools (DevTools), complex state logic, or multiple developers working on the project.',
        },
        {
          question: 'How do you optimize React application performance?',
          answer:
            '<strong>Key optimization techniques:</strong><br/>1. <code>React.memo</code> to prevent unnecessary re-renders<br/>2. <code>useMemo</code> for memoizing expensive calculations<br/>3. <code>useCallback</code> for memoizing functions<br/>4. <strong>Code splitting</strong> with <code>React.lazy</code> and <code>Suspense</code><br/>5. Proper <code>key</code> props in lists<br/>6. Avoiding inline objects and functions in JSX',
        },
        {
          question: 'When and how do you use useReducer?',
          answer:
            "Use useReducer when you have complex state logic or multiple related state values. It works like Redux - you define a reducer function that takes current state and action, then returns new state. Dispatch actions to update state. It's better than multiple useState calls for complex state management.",
        },
        {
          question: 'What are Refs and when do you use them?',
          answer:
            'Refs provide direct access to DOM elements or component instances. Common use cases: focus management, triggering animations, and integrating with third-party libraries. Use useRef() in functional components. forwardRef allows passing refs to child components. Avoid overusing refs - prefer declarative patterns when possible.',
        },
        {
          question: 'How do you implement routing in React?',
          answer:
            'Use React Router with key components: BrowserRouter (provides routing context), Routes (container for routes), Route (individual route definitions), Link (navigation), useParams (access route parameters), and useNavigate (programmatic navigation). Define routes with path and element props, and use dynamic segments with colons like /users/:id.',
        },
        {
          question: 'What are Microfrontends and how do they work with React?',
          answer:
            '<strong>Microfrontends</strong> is an architectural pattern that extends microservices to the frontend, allowing teams to develop, deploy, and maintain parts of a web application independently.<br/><br/><strong>Key Concepts:</strong><br/>• <strong>Independent deployment:</strong> Each microfrontend can be deployed separately<br/>• <strong>Technology agnostic:</strong> Different teams can use different frameworks<br/>• <strong>Team autonomy:</strong> Teams own their complete stack (frontend + backend)<br/>• <strong>Shared runtime:</strong> Multiple apps compose into a single user experience<br/><br/><strong>Implementation approaches:</strong><br/>• <strong>Module Federation:</strong> Webpack 5 feature for dynamic imports<br/>• <strong>Single-SPA:</strong> Framework for orchestrating multiple apps<br/>• <strong>Web Components:</strong> Standard for creating reusable components<br/>• <strong>Iframe integration:</strong> Simple but limited approach<br/><br/><strong>Benefits:</strong> Scalable teams, technology diversity, independent releases<br/><strong>Challenges:</strong> Complexity, shared state management, bundle duplication',
        },
      ],
    },
    {
      title: 'React Architecture',
      questions: [
        {
          question: 'What are Higher-Order Components (HOCs)?',
          answer: 'A <strong>HOC</strong> is a function that takes a component and returns a new component with additional functionality. Used to share logic between components without repeating code.<br/><br/><strong>When to use:</strong> For reusing logic like authentication, data handling, or service subscriptions.<br/><br/><strong>Example:</strong> <code>withAuth(Component)</code> - wraps a component with authentication logic.<br/><br/><strong>Pros:</strong> Logic reusability, separation of concerns<br/><strong>Cons:</strong> Can complicate component tree, debugging challenges'
        },
        {
          question: 'What is the Render Props pattern?',
          answer: 'A pattern that involves passing a function as a prop to a component, which handles dynamic content rendering.<br/><br/><strong>When to use:</strong> When you need to share rendering logic, like dynamic lists or components that depend on external data.<br/><br/><strong>Example:</strong> <code>&lt;DataFetcher render={(data) =&gt; ...} /&gt;</code><br/><br/><strong>Pros:</strong> Flexible rendering, avoids HOCs in many cases<br/><strong>Cons:</strong> More verbose code, less common since Hooks'
        },
        {
          question: 'What are Compound Components?',
          answer: 'A pattern where multiple components work together sharing implicit state, usually through a parent component.<br/><br/><strong>When to use:</strong> For creating flexible component APIs like menus, tabs, or accordions.<br/><br/><strong>Example:</strong> <code>&lt;Toggle&gt;&lt;Toggle.On /&gt;&lt;Toggle.Off /&gt;&lt;Toggle.Button /&gt;&lt;/Toggle&gt;</code><br/><br/><strong>Pros:</strong> Intuitive and flexible API, easy to extend<br/><strong>Cons:</strong> Context dependency can complicate logic'
        },
        {
          question: 'What is the Container/Presentational pattern?',
          answer: 'Separates components into two types: <strong>containers</strong> (handle logic and state) and <strong>presentational</strong> (handle UI).<br/><br/><strong>When to use:</strong> To improve maintainability and reusability of components.<br/><br/><strong>Example:</strong><br/>Container: <code>UserContainer</code> (fetches data)<br/>Presentational: <code>UserList</code> (renders UI)<br/><br/><strong>Pros:</strong> Clear separation of concerns, easy to test<br/><strong>Cons:</strong> More files, less common with Hooks'
        },
        {
          question: 'When should you use Custom Hooks?',
          answer: '<strong>Custom Hooks</strong> encapsulate reusable logic in functions that use native React hooks.<br/><br/><strong>When to use:</strong> To share logic between components without HOCs or render props.<br/><br/><strong>Example:</strong> <code>useFetch(url)</code> - returns { data, loading }<br/><br/><strong>Pros:</strong> Simplifies logic reuse, cleaner than HOCs/render props<br/><strong>Cons:</strong> Requires good design to avoid coupling<br/><br/><em>Note:</em> Custom hooks have largely replaced HOCs and render props in modern React'
        },
        {
          question: 'What is the difference between Controlled and Uncontrolled components?',
          answer: '<strong>Controlled components</strong> have their state managed by React. <strong>Uncontrolled components</strong> use refs to access values directly from the DOM.<br/><br/><strong>When to use:</strong><br/>• Controlled: When you need to handle form state in React<br/>• Uncontrolled: For simple forms or external library integration<br/><br/><strong>Examples:</strong><br/>Controlled: <code>value={state} onChange={setState}</code><br/>Uncontrolled: <code>ref={inputRef}</code><br/><br/><strong>Pros/Cons:</strong><br/>• Controlled: More control, more code/renders<br/>• Uncontrolled: Less code, less predictable'
        },
        {
          question: 'How do you implement Global State management?',
          answer: 'Use a global state system to share data between components without manually passing props.<br/><br/><strong>When to use:</strong> When multiple components need to access or modify the same state.<br/><br/><strong>Options:</strong><br/>• <strong>Context API:</strong> Built-in, good for medium apps<br/>• <strong>Redux:</strong> External library, complex apps<br/>• <strong>Zustand/Jotai:</strong> Lightweight alternatives<br/><br/><strong>Pros:</strong> Avoids prop drilling, ideal for large apps<br/><strong>Cons:</strong> Can complicate data flow, overhead for small apps'
        },
        {
          question: 'How do SOLID principles apply to React development?',
          answer: '<strong>SOLID principles</strong> guide clean, robust code design in React:<br/><br/><strong>1. Single Responsibility Principle (SRP):</strong><br/>Components and hooks should have one purpose<br/>• <code>&lt;UserCard&gt;</code> only displays user data<br/>• <code>useFetchUsers</code> handles data retrieval<br/><br/><strong>2. Open/Closed Principle (OCP):</strong><br/>Components should be extensible without modification<br/>• Use composition or HOCs to add functionality<br/><br/><strong>3. Liskov Substitution Principle (LSP):</strong><br/>Sub-components should be interchangeable with parent types<br/>• A <code>&lt;Button&gt;</code> variant should work wherever base <code>&lt;Button&gt;</code> is expected<br/><br/><strong>4. Interface Segregation Principle (ISP):</strong><br/>Avoid forcing components to depend on unused props<br/>• Pass only necessary data via props or context<br/><br/><strong>5. Dependency Inversion Principle (DIP):</strong><br/>Depend on abstractions, not implementations<br/>• Inject data service into hook rather than hardcoding API calls<br/><br/><em>Result:</em> React apps become modular, reusable, and easier to maintain.'
        }
      ],
    },
    {
      title: 'Testing & Best Practices',
      questions: [
        {
          question:
            'How do you test React components with Jest and React Testing Library?',
          answer:
            "Use React Testing Library for user-centric testing. Key methods: render() to mount components, screen.getByText/getByRole for queries, fireEvent/userEvent for interactions, and waitFor() for async operations. Focus on testing behavior users see rather than implementation details. Example: render(<Counter />), find elements with screen.getByRole('button'), simulate clicks with userEvent.click(), and assert with expect().toBeInTheDocument().",
        },
        {
          question: 'What are the best practices for React component testing?',
          answer:
            'Best practices include: 1) Test user behavior, not implementation details, 2) Use semantic queries (getByRole, getByLabelText) over getByTestId, 3) Test components in isolation with mocked dependencies, 4) Use userEvent over fireEvent for more realistic interactions, 5) Test error boundaries and loading states, 6) Keep tests simple and focused on one behavior, 7) Use waitFor() for async operations and avoid act() warnings.',
        },
        {
          question: 'What are React development best practices?',
          answer:
            '<strong>Component Design:</strong><br/>• Keep components small and focused<br/>• Use composition over inheritance<br/>• Prefer functional components with hooks<br/>• Extract custom hooks for reusable logic<br/><br/><strong>Performance:</strong><br/>• Use <code>React.memo</code> for expensive components<br/>• Memoize callbacks and calculations<br/>• Implement code splitting<br/>• Use React DevTools Profiler<br/><br/><strong>State Management:</strong><br/>• Start with local state, lift up when needed<br/>• Use Context for app-wide state (theme, auth)<br/>• Consider Redux for complex interactions<br/>• Keep state minimal<br/><br/><strong>Testing:</strong><br/>• Test behavior, not implementation<br/>• Use React Testing Library<br/>• Mock external dependencies<br/>• Aim for high coverage on critical paths',
        },
        {
          question: 'What is Test-Driven Development (TDD) in React?',
          answer:
            '<strong>Test-Driven Development (TDD)</strong> involves writing tests before implementing code, ensuring each piece of functionality is tested and meets requirements from the start.<br/><br/><strong>TDD Process in React:</strong><br/>1. <strong>Write a Failing Test:</strong> Define expected behavior using Jest with React Testing Library<br/>2. <strong>Write Code:</strong> Implement minimum code to make the test pass<br/>3. <strong>Refactor:</strong> Improve code while keeping tests passing<br/><br/><strong>Benefits of TDD in React:</strong><br/>• <strong>Reliability:</strong> Tests ensure components and hooks behave as expected, catching bugs early<br/>• <strong>Maintainability:</strong> Encourages modular code (e.g., separating useUser from UserList)<br/>• <strong>Confidence in Refactoring:</strong> Tests act as a safety net for safe code improvements<br/>• <strong>Integration with Clean Architecture:</strong> Enforces testable, loosely coupled layers<br/><br/><em>Result:</em> TDD promotes robust, maintainable, and bug-free React applications through a clear development cycle.',
        },
      ],
    },
    {
      title: 'Code Snippets',
      questions: [
        {
          question: 'How do you implement React.memo for performance optimization?',
          answer:
            '<strong>React.memo</strong> is a higher-order component that memoizes the result and prevents re-renders if props haven\'t changed.<br/><br/><strong>Code Example:</strong><br/><br/><code><pre>// Memoized component to prevent re-renders if props don\'t change<br/>const UserCard = React.memo(({ user, onSelect }) => {<br/>  console.log(`Rendering UserCard for ${user.name}`);<br/>  return (<br/>    &lt;div onClick={() => onSelect(user.id)}&gt;<br/>      {user.name} ({user.email})<br/>    &lt;/div&gt;<br/>  );<br/>});</pre></code><br/><br/><strong>Key Points:</strong><br/>• Only re-renders when <code>user</code> or <code>onSelect</code> props change<br/>• Performs shallow comparison of props by default<br/>• Best for expensive components that receive stable props<br/>• Can provide custom comparison function as second argument',
        },
        {
          question: 'How do you use useMemo and useCallback for performance optimization?',
          answer:
            '<strong>useMemo</strong> memoizes expensive calculations, while <strong>useCallback</strong> memoizes function references to prevent unnecessary re-renders.<br/><br/><strong>Code Example:</strong><br/><br/><code><pre>// Memoize filtered users to avoid recalculating on every render<br/>const filteredUsers = useMemo(() => {<br/>  console.log(\'Filtering users\');<br/>  return users.filter((user) =><br/>    user.name.toLowerCase().includes(searchTerm.toLowerCase())<br/>  );<br/>}, [users, searchTerm]);<br/><br/>// Memoize the onSelect callback to prevent re-creating it<br/>const handleSelectUser = useCallback((userId) => {<br/>  console.log(`Selected user with ID: ${userId}`);<br/>}, []); // Empty deps if no dependencies needed</pre></code><br/><br/><strong>Key Differences:</strong><br/>• <strong>useMemo:</strong> Memoizes computed values (expensive calculations)<br/>• <strong>useCallback:</strong> Memoizes function references (prevents child re-renders)<br/>• Both depend on dependency arrays to determine when to recalculate<br/>• Use when performance profiling shows actual benefits',
        },
        {
          question: 'How do you implement Code Splitting with React.lazy and Suspense?',
          answer:
            '<strong>Code Splitting</strong> allows you to load components dynamically, reducing initial bundle size and improving performance by loading components only when needed.<br/><br/><strong>Code Example:</strong><br/><br/><code><pre>const LazyComponent = lazy(() => import(\'./HeavyComponent\'));<br/><br/>function App() {<br/>  return (<br/>    &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;<br/>      &lt;LazyComponent /&gt;<br/>    &lt;/Suspense&gt;<br/>  );<br/>}</pre></code><br/><br/><strong>Key Points:</strong><br/>• <strong>React.lazy():</strong> Dynamically imports components using dynamic import()<br/>• <strong>Suspense:</strong> Handles loading states while component loads<br/>• <strong>Fallback:</strong> Shows loading UI during component loading<br/>• <strong>Bundle splitting:</strong> Creates separate chunks for better performance<br/>• Best for large components or route-based splitting',
        },
      ],
    },
  ],
};

const FrontendInterviewPreparation = () => {
  const [openIndex, setOpenIndex] = useState<string | null>('0-0');

  const handleToggle = (sectionIndex: number, questionIndex: number) => {
    const currentId = `${sectionIndex}-${questionIndex}`;
    setOpenIndex(openIndex === currentId ? null : currentId);
  };

  return (
    <div className='mt-[65px]'>
      <section className='py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6'>
              {frontendInterviewData.title}
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              {frontendInterviewData.subtitle}
            </p>
          </div>

          <div className='max-w-4xl mx-auto space-y-12'>
            {frontendInterviewData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 border-b-2 border-blue-200 dark:border-blue-800 pb-2'>
                  {section.title}
                </h2>

                <div className='space-y-4'>
                  {section.questions.map((faq, questionIndex) => {
                    const currentId = `${sectionIndex}-${questionIndex}`;
                    const isOpen = openIndex === currentId;

                    return (
                      <div
                        key={questionIndex}
                        className='bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'
                      >
                        <button
                          onClick={() =>
                            handleToggle(sectionIndex, questionIndex)
                          }
                          className='w-full text-left flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200'
                        >
                          <h3 className='font-semibold text-lg text-gray-900 dark:text-gray-100 pr-4'>
                            {faq.question}
                          </h3>

                          <div className='flex-shrink-0'>
                            {isOpen ? (
                              <ChevronUp className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                            ) : (
                              <ChevronDown className='w-5 h-5 text-gray-400 dark:text-gray-500' />
                            )}
                          </div>
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen
                              ? 'max-h-none opacity-100 pb-6'
                              : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className='px-6'>
                            <div className='border-t border-gray-200 dark:border-gray-600 pt-4'>
                              <div 
                                className='text-gray-600 dark:text-gray-300 leading-relaxed'
                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrontendInterviewPreparation;
