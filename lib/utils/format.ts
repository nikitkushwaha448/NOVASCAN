// Client-safe text formatting utilities

export function formatContentForDisplay(
  content: string, 
  maxLength: number = 300,
  preserveLinks: boolean = false
): {
  content: string;
  originalContent: string;
  isTruncated: boolean;
  originalLength: number;
  truncatedLength: number;
} {
  if (!content) {
    return {
      content: '',
      originalContent: '',
      isTruncated: false,
      originalLength: 0,
      truncatedLength: 0,
    };
  }
  
  const trimmed = content.trim();
  const isTruncated = trimmed.length > maxLength;
  const truncatedContent = isTruncated ? trimmed.substring(0, maxLength) + '...' : trimmed;
  
  return {
    content: truncatedContent,
    originalContent: trimmed,
    isTruncated,
    originalLength: trimmed.length,
    truncatedLength: truncatedContent.length,
  };
}
