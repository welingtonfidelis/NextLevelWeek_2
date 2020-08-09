export default function convertHouserToMinutes(time: string) {
    const [hour, minute] = time.split(':').map(Number);
    const timeInMinutes = (hour * 60) + minute;

    return timeInMinutes;
}