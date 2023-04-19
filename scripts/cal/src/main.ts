import strings from "node-strings"

enum Months {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

enum Day {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

function main () {
    let time = new Date()
    console.error(`month - day
_______________________________
|  1  |  2  |  3  |  4  |  5  |
|  6  |  7  |  8  |  9  | 10  |
| 11  | 12  | 13  | 14  | 16  |
| 17  | 18  | 19  | 20  | 21  |
| 22  | 23  | 24  | 25  | 26  |
| 27  | 28  | 29  | 30  | 31  |
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
`
    .replace("month", strings.red(Months[time.getMonth()]))
    .replace("day", strings.magenta(Day[time.getUTCDay()]))
    .replace((time.getDay() + 1).toString(), strings.yellow((time.getDay() + 1).toString())))
}

main()