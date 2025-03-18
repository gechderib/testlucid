// FormulaInput.tsx
import React, { useState } from 'react';
import { useFormulaStore } from '../store/store';
import { useAutocomplete } from '../hooks/useAutocomplete';
import Tag from './Tag';
import { calculateFormula } from '../utils/calculate';
import './FormulaInput.css'; // Optional for styling



// Sample options for each category
const categoryOptions: Record<string, string[]> = {
  'category 1': ['Option 1A', 'Option 1B', 'Option 1C'],
  'category 2': ['Option 2A', 'Option 2B'],
  'category 3': ['Option 3A', 'Option 3B', 'Option 3C'],
  'category 4': ['Option 4A', 'Option 4B'],
};

const FormulaInput: React.FC = () => {
  const { formula, setFormula } = useFormulaStore();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<{ name: string; category: string } | null>(null);
  // Extract the currently typed value (last word/part of the formula)
  const getCurrentTypedValue = (formula: string): string => {
    const parts = formula.split(/[\s+\-*/()]/);
    return parts[parts.length - 1]; // Return the last part
  };

  const { data: suggestions } = useAutocomplete(getCurrentTypedValue(formula));

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormula(value); // Update the formula
    setShowSuggestions(true); // Show suggestions
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: { name: string; category: string }) => {
    setSelectedSuggestion(suggestion); // Set the selected suggestion
    setShowSuggestions(false); // Hide suggestions
  };

  // Handle option selection
  const handleOptionClick = (option: string) => {
    if (selectedSuggestion) {
      const newFormula = formula.replace(selectedSuggestion.name, option);
      setFormula(newFormula); // Replace the suggestion name with the selected option
      setSelectedSuggestion(null); // Clear the selected suggestion
    }
  };

  // Handle blur (hide suggestions when the input loses focus)
  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200); // Delay to allow click on suggestions
  };

  // Define variables and their values
  const variables = {
    x: 10,
    y: 20,
    'name 3': 30, // Example variable with a space in the name
  };

  // Calculate the result
  const result = calculateFormula(formula, variables, suggestions || []);

  return (
    <div>
      {/* Single input field for formula */}
      <input
        type="text"
        value={formula}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleBlur}
        placeholder="Enter formula"
      />

      {/* Autocomplete suggestions */}
      {showSuggestions && suggestions && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name} ({suggestion.category}) - Value: {suggestion.value}
            </li>
          ))}
        </ul>
      )}

      {/* Options dropdown for the selected suggestion */}
      {selectedSuggestion && (
        <div className="options-dropdown">
          <h4>Options for {selectedSuggestion.category}</h4>
          <ul>
            {categoryOptions[selectedSuggestion.category]?.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display calculated result */}
      <div>Result: {result}</div>
    </div>
  );
};

export default FormulaInput;