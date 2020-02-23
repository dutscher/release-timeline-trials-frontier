const handleModifiers = (blockElement, modifiers) => {
    let modifier = [];
    if (modifiers.length > 0) {
        modifier = modifiers
            // remove all false and empty ones
            .filter((item) => item && item !== '' && item.trim() !== '')
            // build modifier
            .map((_modifier_) => `${blockElement}--${_modifier_}`);
    }
    return modifier;
};

export function bem(block, element, ...modifiers) {
    const blockElement = block + (element ? `__${element}` : '');
    return bm(blockElement, modifiers);
}

export function bm(blockElement, ...modifiers) {
  return [blockElement, ...handleModifiers(blockElement, modifiers)].join(' ');
}

export function m(blockElement, ...modifiers) {
    return [...handleModifiers(blockElement, modifiers)].join(' ');
}