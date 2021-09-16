const a = 200;

const getTimeFormatter = (data) => {
  const m = new Date(data).getMinutes().toString();
  const s = new Date(data).getSeconds().toString();
  return `${m.length === 1 ? 0 + m : m}:${s.length === 1 ? 0 + s : s}`;
};

getTimeFormatter(a);
