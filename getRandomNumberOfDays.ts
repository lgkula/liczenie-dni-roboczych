export const getRandomNumberOfDays = ({
  min,
  max,
}: {
  min: number;
  max: number;
}): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
