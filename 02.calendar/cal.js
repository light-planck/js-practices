import minimist from "minimist";
import dayjs from "dayjs";
import "dayjs/locale/ja.js";

const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土"];

const main = () => {
  dayjs.locale("ja");

  const options = parseOptions();
  const date = dayjs()
    .set("year", options.y)
    .set("month", options.m - 1);

  console.log(`       ${date.format("M月 YYYY")}`);

  console.log(WEEK_DAYS.join(" "));

  process.stdout.write("   ".repeat(date.set("date", 1).day()));

  Array.from({ length: date.daysInMonth() }, (_, i) => i + 1).forEach((d) => {
    process.stdout.write(d.toString().padStart(2, " ") + " ");
    if (date.set("date", d).day() === 6) console.log();
  });
  console.log();
};

const parseOptions = () => {
  const options = minimist(process.argv.slice(2));
  return {
    m: options.m ? options.m : dayjs().month() + 1,
    y: options.y ? options.y : dayjs().year(),
  };
};

main();
