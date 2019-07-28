export const limitContent = (content, limitNum) => {
  let limitedContent = content;
  if (content.length > limitNum) {
    limitedContent = limitedContent.substring(0, limitNum);
    limitedContent = `${limitedContent}...`;
  }
  return limitedContent;
};

export const removeUnderscore = searchType => {
  let finalSearchType = searchType;
  // Validate if search type has _
  if (searchType.indexOf('_') !== -1) {
    // Split by _
    finalSearchType = finalSearchType.split('_');
    // Join the split strings with a space
    finalSearchType = finalSearchType.join(' ');
  }
  return finalSearchType;
};
