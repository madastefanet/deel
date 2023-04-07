<!-- @format -->

## 1.What is the difference between Component and PureComponent? give an example where it might break my app.

The main difference between Component and PureComponent is that PureComponent implements shouldComponentUpdate with a shallow comparison of the component's props and state, while Component does not.

using PureComponent might break your app if your component relies on deep object comparisons or working with mutable data structures.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

If the component relies on context data to render, the shouldComponentUpdate method might prevent the component from re-rendering when the context data changes. To avoid this, should check if that context data is part of the component's props or state, and that includes it in the shouldComponentUpdate check.

## 3. Describe 3 ways to pass information from a component to its PARENT.

a. Callback functions: Pass a function as a prop from the parent to the child, and call that function in the child component when needed.
b. Two-way data binding: Use a controlled component pattern where the parent manages the state and passes it down to the child component as a prop.
c. Context API: Use React's Context API to provide and consume data throughout the component

## 4. Give 2 ways to prevent components from re-rendering.

a. Implement `shouldComponentUpdate` and return false when no re-render is needed  
b. use react.memo for FC

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragment is usefull when returning when a component needs to return multiple elements at the top level avoiding unnecessary markup.
Cases when might break your app: when relying on CSS rules to target immediate children or when you expect a specific DOM structure for 3rd party libraries.

## 6. Give 3 examples of the HOC pattern.

a. withRouter: A HOC provided by React Router to pass route-related props to a component.
b. connect: A HOC from Redux that connects a component to the Redux store.
c. withStyles: A HOC from Material-UI that injects styles into a component.

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.

a. Promises: Use the .catch() method or the second argument of .then() to handle errors.
b. Callbacks: Typically, the first argument of the callback function is an error object, which is checked before handling the result.
c. Async/await: Use try/catch blocks to handle exceptions within async functions.

## 8. How many arguments does setState take and why is it async.

2 arguments : an updater function or obj that describe the state updates and an optional callback function executated when the state gets updated. It is async because React batches state updates for performance reasons and applies them at an appropriate time, usually during the next render cycle.

## 9. List the steps needed to migrate a Class to Function Component.

1.  Convert class declation to function
2.  Replace state obj with useState hook for each state property
3.  change lifecycle methods to useEffect
4.  this.props becames props
5.  this.state converts to specific variables
6.  Remove all this keyword

## 10. List a few ways styles can be used with components.

a. inline - usting style attribute
b. CSS modules: Import a locally-scoped CSS file and apply class names to components.
c. external CSS: Use a regular CSS file and apply class names using the className prop.

## 11. How to render an HTML string coming from the server.

Use property dangerouslySetInnerHTML prop, which takes an object with a \_\_html key
