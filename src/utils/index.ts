export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-gray-500",
  };
  return statusColors[status] || "bg-gray-500";
};
