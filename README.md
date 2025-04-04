# @mikesha/react-verification-code-input

A customizable React component for verification code input fields commonly used in two-factor authentication (2FA), OTP verification, and security code confirmation workflows.

> Originally forked from [react-verification-code-input](https://github.com/suweya/react-verification-code-input), but completely reworked with TypeScript support, accessibility improvements, and modern React patterns.

## Support me
If you like what I'm doing, support me: https://ko-fi.com/mykeshato

## Features

- 📱 Mobile-friendly with keyboard support
- ⌨️ Keyboard navigation between fields
- 🔤 Support for both text and numeric inputs
- 🎨 Highly customizable styling
- ♿ Built with accessibility in mind
- 🧩 TypeScript support with full type definitions
- 🔄 Built-in loading state

## Installation

```bash
# npm
npm install --save @mikesha/react-verification-code-input

# yarn
yarn add @mikesha/react-verification-code-input

# pnpm
pnpm add @mikesha/react-verification-code-input
```

## Basic Usage

```jsx
import React from 'react';
import ReactCodeInput from '@mikesha/react-verification-code-input';

function VerificationForm() {
  const handleComplete = (code) => {
    console.log('Completed code:', code);
    // Submit code to your verification API
  };

  return (
    <div>
      <h2>Enter verification code</h2>
      <ReactCodeInput fields={6} onComplete={handleComplete} />
    </div>
  );
}
```

## Advanced Usage

```jsx
import React, { useRef } from 'react';
import ReactCodeInput, { ReactCodeInputRefInstance } from '@mikesha/react-verification-code-input';

function AuthenticationForm() {
  const codeInputRef = useRef < ReactCodeInputRefInstance > null;

  const handleChange = (value) => {
    console.log('Current value:', value);
  };

  const handleComplete = (code) => {
    console.log('Completed code:', code);
    // Verify the code
  };

  const resetCode = () => {
    codeInputRef.current?.clearValues();
  };

  return (
    <div className="auth-form">
      <h2>Two-Factor Authentication</h2>
      <p>Enter the 6-digit code sent to your device</p>

      <ReactCodeInput
        ref={codeInputRef}
        fields={6}
        type="number"
        onChange={handleChange}
        onComplete={handleComplete}
        className="verification-code-container"
        inputClassNames="verification-code-input"
        placeholder="0"
      />

      <div className="form-actions">
        <button onClick={resetCode}>Clear</button>
        <button>Resend Code</button>
      </div>
    </div>
  );
}
```

## Props

| Prop               | Type                      | Default         | Description                                                                                                                                               |
| ------------------ | ------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`             | `'text' \| 'number'`      | `'number'`      | Input type. When set to `'number'`, only numeric inputs are accepted.                                                                                     |
| `fields`           | `number`                  | `6`             | Number of input fields to display.                                                                                                                        |
| `onChange`         | `(value: string) => void` | `undefined`     | Callback triggered whenever any input value changes. Returns concatenated string of all values.                                                           |
| `onComplete`       | `(value: string) => void` | `undefined`     | Callback triggered when all fields have been filled. Returns concatenated string of all values.                                                           |
| `autoFocus`        | `boolean`                 | `true`          | Automatically focus the first input field when component mounts.                                                                                          |
| `loading`          | `boolean`                 | `false`         | Shows a loading indicator over the input fields.                                                                                                          |
| `loadingComponent` | `JSX.Element`             | Built-in loader | Custom loading component to display when `loading` is true.                                                                                               |
| `className`        | `string`                  | `''`            | CSS class applied to the main container.                                                                                                                  |
| `inputClassNames`  | `string \| string[]`      | `[]`            | CSS class(es) applied to input fields. If a string is provided, it's applied to all fields. If an array, each item is applied to the corresponding field. |
| `values`           | `string \| string[]`      | `undefined`     | Pre-filled values for the input fields. Can be a string (which will be split across fields) or an array of individual values.                             |
| `disabled`         | `boolean`                 | `false`         | Disables all input fields.                                                                                                                                |
| `required`         | `boolean`                 | `false`         | Sets all input fields as required for form validation.                                                                                                    |
| `placeholder`      | `string \| string[]`      | `[]`            | Placeholder text for input fields. If a string is provided, it's applied to all fields. If an array, each item is applied to the corresponding field.     |
| `id`               | `string`                  | `undefined`     | Base ID for input fields. Each field will have this base ID appended with its index (e.g., `my-code-0`, `my-code-1`).                                     |

## Methods

The component exposes methods through a ref:

| Method          | Description                                          |
| --------------- | ---------------------------------------------------- |
| `clearValues()` | Clears all input fields and focuses the first field. |

To use these methods, create a ref and pass it to the component:

```jsx
const codeInputRef = useRef(null);

// Later in your component:
<button onClick={() => codeInputRef.current.clearValues()}>
  Reset Code
</button>

<ReactCodeInput ref={codeInputRef} />
```

## Keyboard Navigation

The component supports the following keyboard controls:

- **Backspace**: Clears the current field and moves focus to the previous field if the current field is empty
- **Left Arrow**: Moves focus to the previous field
- **Right Arrow**: Moves focus to the next field
- **Typing a character**: Automatically moves focus to the next field after input

## Styling

The component comes with minimal default styling to handle layout. Apply your own styles using the `className` and `inputClassNames` props:

```css
/* Example CSS */
.verification-container {
  margin: 24px 0;
}

.verification-input {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 18px;
  margin: 0 4px;
}

.verification-input:focus {
  border-color: #4c84ff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(76, 132, 255, 0.2);
}
```

## TypeScript Support

The package includes TypeScript definitions. Import types when using refs:

```tsx
import ReactCodeInput, { ReactCodeInputRefInstance, ReactCodeInputProps } from '@mikesha/react-verification-code-input';

// Use in your component
const codeInputRef = useRef<ReactCodeInputRefInstance>(null);

const customProps: ReactCodeInputProps = {
  fields: 4,
  type: 'text'
  // other props...
};

return <ReactCodeInput {...customProps} ref={codeInputRef} />;
```

## Examples

### OTP Verification Form

```jsx
import React, { useState } from 'react';
import ReactCodeInput from '@mikesha/react-verification-code-input';

function OTPVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleComplete = async (code) => {
    setLoading(true);
    setError('');

    try {
      // Example API call
      const response = await verifyOTP(code);
      if (response.success) {
        // Navigate to next screen or show success
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-form">
      <h2>Verify Your Account</h2>
      <p>We've sent a verification code to your phone</p>

      <ReactCodeInput fields={6} onComplete={handleComplete} loading={loading} className="otp-container" />

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
```

### Customizing the Loading Component

```jsx
import React from 'react';
import ReactCodeInput from '@mikesha/react-verification-code-input';

const CustomLoader = () => (
  <div className="custom-loader">
    <div className="spinner"></div>
    <p>Verifying...</p>
  </div>
);

function VerificationWithCustomLoader() {
  return <ReactCodeInput fields={4} loading={true} loadingComponent={<CustomLoader />} />;
}
```

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [MikeSha](https://github.com/MikeSha)
