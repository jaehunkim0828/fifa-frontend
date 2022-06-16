export default function date(d: string) {
    const dividedDate = d.split('-');
    const year = dividedDate[0];
    const month = dividedDate[1];
    const day = dividedDate[2].split('T')[0];
    const time = dividedDate[2].split('T')[1]
    return `${year}년 ${month}월 ${day}일 ${time}`;
}