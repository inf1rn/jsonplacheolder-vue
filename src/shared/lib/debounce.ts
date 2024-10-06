export const debounce = <F extends (...args: any[]) => any>(
  fn: F,
  wait: number = 250
) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  function debounced(...args: Parameters<F>): any {
    const later = () => {
      timeout = undefined;
      fn.apply(this, args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  }

  return debounced;
};
