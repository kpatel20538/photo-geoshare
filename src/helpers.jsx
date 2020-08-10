export const suppress = (func) => async (...args) => {
  try {
    return await func(...args);
  } catch (error) {
    console.log(`SUPPRESSED: ${error.name}`)
  }
}