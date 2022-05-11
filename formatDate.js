const formatDate = (fecha) => {
  const date = new Date(
    fecha.split("-")[0],
    Number.parseInt(fecha.split("-")[1]) - 1,
    fecha.split("-")[2]
  );

  let day = new Intl.DateTimeFormat("es-AR", { weekday: "short" }).format(date);
  day = day.charAt(0).toUpperCase() + day.slice(1);
  let month = new Intl.DateTimeFormat("es-AR", { month: "long" }).format(date);
  month = month.charAt(0).toUpperCase() + month.slice(1);

  return `${day} ${fecha.split("-")[2]} ${month} (${fecha.split("-")[2]}/${
    fecha.split("-")[1]
  }/${fecha.split("-")[0]})`;
};

module.exports = formatDate;
