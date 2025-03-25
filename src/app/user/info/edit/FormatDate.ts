function formatDate(input: string): string {
  const sliceNumber = input.replace(/\D/g, '').slice(0, 8);

  if (sliceNumber.length <= 4) return sliceNumber;
  if (sliceNumber.length <= 6) return `${sliceNumber.slice(0, 4)}-${sliceNumber.slice(4)}`;
  return `${sliceNumber.slice(0, 4)}-${sliceNumber.slice(4, 6)}-${sliceNumber.slice(6)}`;
}

export default formatDate;
