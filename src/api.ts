import data from "./data.json";

export interface Item {
  id: number
  label: string
  parentId?: number
}

/**
 * make an "API call" to get the data filtered by label.
 * @param {string} [label] - Filter on the item labels.
 * @return {Itemp[]} The list of items matching the filter if any
 */
export const getData = async (label?: string): Promise<Item[]> => {
  // Sleep 300ms to simulate latency and processing
  await new Promise((resolve) => setTimeout(resolve, 300));

  return label
    ? data.filter((d) => d.label.toLowerCase().includes(label.toLowerCase()))
    : data;
};
