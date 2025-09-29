type DateFormatOptions = {
  showDay?: boolean;
  showWeekday?: boolean;
  showMonth?: boolean;
  showYear?: boolean;
};

class DateUtils {
  private static readonly months = [
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

  private static readonly weekdays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  static formatDate(
    date: Date,
    options: DateFormatOptions = { showDay: true, showMonth: true }
  ): string {
    const day = date.getDate();
    const weekday = this.weekdays[date.getDay()];
    const month = this.months[date.getMonth()];
    const year = date.getFullYear();

    let parts: string[] = [];

    if (options.showWeekday) parts.push(weekday);
    if (options.showDay) parts.push(day.toString());
    if (options.showMonth) parts.push(`de ${month}`);
    if (options.showYear) parts.push(`de ${year}`);

    return parts.join(", ").replace(", de", " de");
  }

  static getActualMonthName(): string {
    const date = new Date();
    return this.months[date.getMonth()];
  }
}

export default DateUtils;
