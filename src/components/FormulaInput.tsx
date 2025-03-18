// FormulaInput.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useFormulaStore } from '../store/store';
import { useAutocomplete } from '../hooks/useAutocomplete';
import Tag from './Tag';
import { calculateFormula } from '../utils/calculate';
import './FormulaInput.css'; // Optional for styling




// const FormulaInput: React.FC = () => {
//   const { formula, setFormula } = useFormulaStore();
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [showOptions, setShowOptions] = useState(false);
//   const [selectedSuggestion, setSelectedSuggestion] = useState<{ name: string; category: string } | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Extract the currently typed value (last word/part of the formula)
//   const getCurrentTypedValue = (formula: string): string => {
//     const parts = formula.split(/[\s+\-*/()]/); // Split by spaces or operators
//     return parts[parts.length - 1]; // Return the last part
//   };

//   // Fetch autocomplete suggestions for the currently typed value
//   const currentTypedValue = getCurrentTypedValue(formula);
//   const { data: suggestions } = useAutocomplete(currentTypedValue);

//   // Handle input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setFormula(value); // Update the formula
//     setShowSuggestions(true); // Show suggestions
//   };

//   // Handle suggestion selection
//   const handleSuggestionClick = (suggestion: { name: string; category: string }) => {
//     const currentTypedValue = getCurrentTypedValue(formula);
//     const newFormula = formula.replace(currentTypedValue, suggestion.name); // Replace the current typed value with the suggestion
//     setFormula(newFormula); // Update the formula
//     setSelectedSuggestion(suggestion); // Set the selected suggestion
//     setShowOptions(true); // Show options dropdown
//     setShowSuggestions(false); // Hide suggestions
//   };

//   // Handle option selection
//   const handleOptionClick = (option: string) => {
//     if (selectedSuggestion) {
//       setFormula(`${formula} ${option}`); // Add the option next to the autocomplete value
//       setShowOptions(false); // Hide options dropdown
//     }
//   };

//   // Handle blur (hide suggestions and options when the input loses focus)
//   const handleBlur = () => {
//     setTimeout(() => {
//       setShowSuggestions(false);
//       setShowOptions(false);
//     }, 200);
//   };

//   // Calculate the result
//   const result = calculateFormula(formula);

//   return (
//     <div>
//       {/* Single input field for formula */}
//       <input
//         ref={inputRef}
//         type="text"
//         value={formula}
//         onChange={handleInputChange}
//         onFocus={() => setShowSuggestions(true)}
//         onBlur={handleBlur}
//         placeholder="Enter formula"
//       />

//       {/* Autocomplete suggestions */}
//       {showSuggestions && suggestions && (
//         <ul className="suggestions-list">
//           {suggestions.map((suggestion) => (
//             <li
//               key={suggestion.id}
//               onClick={() => handleSuggestionClick(suggestion)}
//             >
//               {suggestion.name} ({suggestion.category})
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Options dropdown */}
//       {showOptions && selectedSuggestion && (
//         <div className="options-dropdown">
//           <h4>Options for {selectedSuggestion.category}</h4>
//           <ul>
//             <li onClick={() => handleOptionClick('Option_1')}>Option_1</li>
//             <li onClick={() => handleOptionClick('Option_2')}>Option_2</li>
//             <li onClick={() => handleOptionClick('Option_3')}>Option_3</li>
//           </ul>
//         </div>
//       )}

//       {/* Display calculated result */}
//       <div>Result: {result}</div>
//     </div>
//   );
// };

// export default FormulaInput;







// const FormulaInput: React.FC = () => {
//   const { formula, setFormula } = useFormulaStore();
//   const [inputValue, setInputValue] = useState('');
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [selectedAutocomplete, setSelectedAutocomplete] = useState<{ name: string; category: string } | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const { data: suggestions } = useAutocomplete(inputValue);

//   // Extract the currently typed value (last word/part of the formula)
//   const getCurrentTypedValue = (formula: string): string => {
//     const parts = formula.split(/[\s+\-*/()]/); // Split by spaces or operators
//     return parts[parts.length - 1]; // Return the last part
//   };

//   // Handle input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setFormula(value); // Update the formula
//     setInputValue(getCurrentTypedValue(value)); // Update the input value for autocomplete
//     setShowSuggestions(true); // Show suggestions
//   };

//   // Handle suggestion selection
//   const handleSuggestionClick = (suggestion: { name: string; category: string }) => {
//     const currentTypedValue = getCurrentTypedValue(formula);
//     const newFormula = formula.replace(currentTypedValue, `${suggestion.name} [Option_1]`); // Add the autocomplete value with a default option
//     setFormula(newFormula); // Update the formula
//     setSelectedAutocomplete(suggestion); // Set the selected autocomplete
//     setShowSuggestions(false); // Hide suggestions
//   };

//   // Handle option selection
//   const handleOptionClick = (option: string) => {
//     if (selectedAutocomplete) {
//       const newFormula = formula.replace(`[Option_1]`, `[${option}]`); // Replace the default option with the selected option
//       setFormula(newFormula); // Update the formula
//       setSelectedAutocomplete(null); // Clear the selected autocomplete
//     }
//   };

//   // Handle blur (hide suggestions and options when the input loses focus)
//   const handleBlur = () => {
//     setTimeout(() => {
//       setShowSuggestions(false);
//       setSelectedAutocomplete(null);
//     }, 200);
//   };

//   // Calculate the result
//   const result = calculateFormula(formula);

//   return (
//     <div>
//       {/* Single input field for formula */}
//       <input
//         ref={inputRef}
//         type="text"
//         value={formula}
//         onChange={handleInputChange}
//         onFocus={() => setShowSuggestions(true)}
//         onBlur={handleBlur}
//         placeholder="Enter formula"
//       />

//       {/* Autocomplete suggestions */}
//       {showSuggestions && suggestions && (
//         <ul className="suggestions-list">
//           {suggestions.map((suggestion) => (
//             <li
//               key={suggestion.id}
//               onClick={() => handleSuggestionClick(suggestion)}
//             >
//               {suggestion.name} ({suggestion.category})
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Options dropdown */}
//       {selectedAutocomplete && (
//         <div className="options-dropdown">
//           <h4>Options for {selectedAutocomplete.name}</h4>
//           <ul>
//             <li onClick={() => handleOptionClick('Option_1')}>Option_1</li>
//             <li onClick={() => handleOptionClick('Option_2')}>Option_2</li>
//             <li onClick={() => handleOptionClick('Option_3')}>Option_3</li>
//           </ul>
//         </div>
//       )}

//       {/* Display calculated result */}
//       <div>Result: {result}</div>
//     </div>
//   );
// };

// export default FormulaInput;



// FormulaInput.tsx

// const FormulaInput: React.FC = () => {
//   const { formula, setFormula } = useFormulaStore();
//   const [inputValue, setInputValue] = useState('');
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [selectedAutocomplete, setSelectedAutocomplete] = useState<{ name: string; category: string } | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const { data: suggestions } = useAutocomplete(inputValue);

//   // Extract the currently typed value (last word/part of the formula)
//   const getCurrentTypedValue = (formula: string): string => {
//     const parts = formula.split(/[\s+\-*/()]/); // Split by spaces or operators
//     return parts[parts.length - 1]; // Return the last part
//   };

//   // Handle input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setFormula(value); // Update the formula
//     setInputValue(getCurrentTypedValue(value)); // Update the input value for autocomplete
//     setShowSuggestions(true); // Show suggestions
//   };

//   // Handle suggestion selection
//   const handleSuggestionClick = (suggestion: { name: string; category: string }) => {
//     const currentTypedValue = getCurrentTypedValue(formula);
//     const newFormula = formula.replace(currentTypedValue, `${suggestion.name}`); // Add the autocomplete value
//     setFormula(newFormula); // Update the formula
//     setSelectedAutocomplete(suggestion); // Set the selected autocomplete
//     setShowSuggestions(false); // Hide suggestions
//   };

//   // Handle option selection
//   const handleOptionClick = (option: string) => {
//     if (selectedAutocomplete) {
//       const newFormula = formula.replace(selectedAutocomplete.name, `${selectedAutocomplete.name} ${option}`); // Add the option next to the autocomplete value
//       setFormula(newFormula); // Update the formula
//       setSelectedAutocomplete(null); // Clear the selected autocomplete
//     }
//   };

//   // Handle blur (hide suggestions and options when the input loses focus)
//   const handleBlur = () => {
//     setTimeout(() => {
//       setShowSuggestions(false);
//       setSelectedAutocomplete(null);
//     }, 200);
//   };

//   // Calculate the result
//   const result = calculateFormula(formula);

//   return (
//     <div>
//       {/* Single input field for formula */}
//       <input
//         ref={inputRef}
//         type="text"
//         value={formula}
//         onChange={handleInputChange}
//         onFocus={() => setShowSuggestions(true)}
//         onBlur={handleBlur}
//         placeholder="Enter formula"
//       />

//       {/* Autocomplete suggestions */}
//       {showSuggestions && suggestions && (
//         <ul className="suggestions-list">
//           {suggestions.map((suggestion) => (
//             <li
//               key={suggestion.id}
//               onClick={() => handleSuggestionClick(suggestion)}
//             >
//               {suggestion.name} ({suggestion.category})
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Options dropdown */}
//       {selectedAutocomplete && (
//         <div className="options-dropdown">
//           <h4>Options for {selectedAutocomplete.name}</h4>
//           <ul>
//             <li onClick={() => handleOptionClick('Option_1')}>Option_1</li>
//             <li onClick={() => handleOptionClick('Option_2')}>Option_2</li>
//             <li onClick={() => handleOptionClick('Option_3')}>Option_3</li>
//           </ul>
//         </div>
//       )}

//       {/* Display calculated result */}
//       <div>Result: {result}</div>
//     </div>
//   );
// };

// export default FormulaInput;




// FormulaInput.tsx
import {
  TextField,
  Button,
  Menu,
  MenuItem,
  List,
  ListItem,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import './FormulaInput.css';

const FormulaInput: React.FC = () => {
  const { formula, setFormula } = useFormulaStore();
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAutocomplete, setSelectedAutocomplete] = useState<{ name: string; category: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: suggestions } = useAutocomplete(inputValue);

  // Extract the currently typed value (last word/part of the formula)
  const getCurrentTypedValue = (formula: string): string => {
    const parts = formula.split(/[\s+\-*/()]/); // Split by spaces or operators
    return parts[parts.length - 1]; // Return the last part
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormula(value); // Update the formula
    setInputValue(getCurrentTypedValue(value)); // Update the input value for autocomplete
    setShowSuggestions(true); // Show suggestions
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: { name: string; category: string }) => {
    const currentTypedValue = getCurrentTypedValue(formula);
    const newFormula = formula.replace(currentTypedValue, `${suggestion.name}`); // Add the autocomplete value
    setFormula(newFormula); // Update the formula
    setSelectedAutocomplete(suggestion); // Set the selected autocomplete
    setShowSuggestions(false); // Hide suggestions
  };

  // Handle options button click
  const handleOptionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle option selection
  const handleOptionClick = (option: string) => {
    if (selectedAutocomplete) {
      const newFormula = formula.replace(selectedAutocomplete.name, `${selectedAutocomplete.name} ${option}`); // Add the option next to the autocomplete value
      setFormula(newFormula); // Update the formula
      setSelectedAutocomplete(null); // Clear the selected autocomplete
      setAnchorEl(null); // Close the menu
    }
  };

  // Handle blur (hide suggestions and options when the input loses focus)
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      setAnchorEl(null);
    }, 200);
  };

  // Calculate the result
  const result = calculateFormula(formula);

  return (
    <Box sx={{ padding: 3 }}>
      {/* Single input field for formula */}
      <TextField
        fullWidth
        variant="outlined"
        value={formula}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleBlur}
        placeholder="Enter formula"
        inputRef={inputRef}
        sx={{ marginBottom: 2 }}
      />

      {/* Autocomplete suggestions */}
      {showSuggestions && suggestions && (
        <Paper elevation={3} sx={{ maxHeight: 150, overflowY: 'auto', marginBottom: 2 }}>
          <List>
            {suggestions.map((suggestion) => (
              <ListItem
                key={suggestion.id}
                button
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Typography variant="body1">
                  {suggestion.name} ({suggestion.category})
                </Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Options dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleOptionClick('Option_1')}>Option_1</MenuItem>
        <MenuItem onClick={() => handleOptionClick('Option_2')}>Option_2</MenuItem>
        <MenuItem onClick={() => handleOptionClick('Option_3')}>Option_3</MenuItem>
      </Menu>

      {/* Display calculated result */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Result: {result}
      </Typography>

      {/* Options button */}
      {selectedAutocomplete && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleOptionsClick}
          sx={{ marginTop: 2 }}
        >
          Show Options for {selectedAutocomplete.name}
        </Button>
      )}
    </Box>
  );
};

export default FormulaInput;