type DateFormatOptions = {
  showDay?: boolean;
  showWeekday?: boolean;
  showMonth?: boolean;
  showYear?: boolean;
};

const DateUtils = {
  formatDate(
    date: Date,
    options: DateFormatOptions = { showDay: true, showMonth: true }
  ): string {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const weekdays = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let parts: string[] = [];

    if (options.showWeekday) parts.push(weekday);
    if (options.showDay) parts.push(day.toString());
    if (options.showMonth) parts.push(`de ${month}`);
    if (options.showYear) parts.push(`de ${year}`);

    return parts.join(", ").replace(", de", " de");
  },
};

export default DateUtils;
