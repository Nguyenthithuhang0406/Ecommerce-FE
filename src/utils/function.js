export const formatNumber = (number) => {
  if (!Number.isInteger(number)) {
    number = Math.floor(number);
  }

  return number.toLocaleString("de-DE");
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() trả về 0-11
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
