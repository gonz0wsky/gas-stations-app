export const sliceResetFns = new Set<() => void>();

export const clearStore = () => {
  sliceResetFns.forEach(resetFn => {
    resetFn();
  });
};
