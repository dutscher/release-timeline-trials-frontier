export function bem(block, element, modifier) {
  const blockElement = block + (element ? `__${element}` : '');
  let modifiers = [];
  if (modifiers.length > 0) {
    modifier = modifiers
      // remove empty ones and false
      .filter((item) => item && item !== '' && item.trim() !== '')
      // do bem modifier
      .map((_modifier) => `${blockElement}--${_modifier}`);
  }
  return [ blockElement, ...modifier ].join(' ');
}