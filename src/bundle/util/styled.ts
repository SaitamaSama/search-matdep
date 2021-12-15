const breakpoints: { [index: string]: number } = {
  sm: 0,
  md: 500,
  lg: 768,
  xl: 992,
};

export const mq = Object.keys(breakpoints)
  .map((key) => [key, breakpoints[key]] as [string, number])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });
