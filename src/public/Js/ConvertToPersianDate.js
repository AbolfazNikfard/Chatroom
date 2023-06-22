export default class PersianDate extends Date {
    constructor(...args) {
        super(...args);
    }

    toLocaleDateString = () => super.toLocaleDateString('fa-IR-u-nu-latn');
    getParts = () => this.toLocaleDateString().split("/")
    getDay = () => super.getDay() === 6 ? 0 : super.getDay() + 1
    getDate = () => this.getParts()[2];
    getMonth = () => this.getParts()[1] - 1;
    getYear = () => this.getParts()[0];
    getMonthName = () => this.toLocaleDateString("fa-IR", { month: 'long' });
    getDayName = () => this.toLocaleDateString("fa-IR", { weekday: 'long' });
    getTime = () => this.getHours() + ":" + this.getMinutes();
    getPersianDate = () => this.toLocaleDateString();
    getFullDatTimeInPersian = () => {
        const Date = this.getPersianDate().split("/");
        const Year = Date[0];
        const Month = Date[1]-1;
        const Day = Date[2];
        let monthName;
        switch(Month){
            case 1:{
                monthName = "فروردین";
                break;
            }
            case 2:{
                monthName = "اردیبهشت";
                break;
            }
            case 3:{
                monthName = "خرداد";
                break;
            }
            case 4:{
                monthName = "تیر";
                break;
            }
            case 5:{
                monthName = "مرداد";
                break;
            }
            case 6:{
                monthName = "شهریور";
                break;
            }
            case 7:{
                monthName = "مهر";
                break;
            }
            case 8:{
                monthName = "آبان";
                break;
            }
            case 9:{
                monthName = "آذر";
                break;
            }
            case 10:{
                monthName = "دی";
                break;
            }
            case 11:{
                monthName = "بهمن";
                break;
            }
            case 12:{
                monthName = "اسفند";
                break;
            }
        }
        return `${Year}/${Month}/${Day}`;
    }
}