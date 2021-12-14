export interface AutoCompleteProps {
  onChange?: (value: string) => void;
  suggestions: string[];
  suggestionsWidth?: number;
  placeholder?: string;
}
