import leavesData from "./leaves.json";

export const getLeaves = () => {
  const storedLeaves = localStorage.getItem("leaves");

  if (storedLeaves) {
    try {
      return JSON.parse(storedLeaves);
    } catch {
      localStorage.removeItem("leaves");
    }
  }

  localStorage.setItem("leaves", JSON.stringify(leavesData));
  return leavesData;
};

export const saveLeaves = (leaves) => {
  localStorage.setItem("leaves", JSON.stringify(leaves));
};
