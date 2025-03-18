// calculate.ts
export const calculateFormula = (
 formula: string,
 variables: Record<string, number>,
 suggestions: { name: string; value: number | string }[]
): string => {
 // Replace autocomplete suggestion names with their values
 let parsedFormula = formula;
 suggestions.forEach((suggestion) => {
   parsedFormula = parsedFormula.replace(new RegExp(suggestion.name, 'g'), suggestion.value.toString());
 });

 // Replace variables with their values
 parsedFormula = parsedFormula.replace(/[a-zA-Z]+(\s*\d+)?/g, (match) => {
   const variableName = match.trim(); // Remove any spaces
   return variables[variableName]?.toString() || '0'; // Replace with value or 0 if not found
 });

 try {
   // Evaluate the parsed formula
   return eval(parsedFormula).toString();
 } catch (e) {
   return 'Invalid formula';
 }
};