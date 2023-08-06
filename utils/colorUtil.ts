export const getColorFromClass = (id?: string): string => {
  const allColors = [
    "bg-purpur",
    "bg-blub",
    "bg-pch",
    "bg-antiquewhite",
    "bg-beige",
    "bg-azure",
    "bg-aliceblue",
    "bg-bisque"
  ];

  if (!id) return allColors[Math.floor(Math.random() * allColors.length)]; // Return random color if id is undefined

  const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  const hashValue = simpleHash(id);
  const index = Math.abs(hashValue) % allColors.length;

  return allColors[index];
};
