export const typeTextEffect = (fullText, onTick, onComplete, speed = 15) => {
  let index = 0;

  const interval = setInterval(() => {
    index++;
    
    // Only pass the string back to the caller
    onTick(fullText.slice(0, index));

    if (index >= fullText.length) {
      clearInterval(interval);
      if (onComplete) onComplete();
    }
  }, speed);
};