import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
dayjs.locale("zh-tw");

export function useFormatDate() {
  const formatDate = (date) => {
    const newDate = dayjs(date).format("M 月 D 日 dddd"); // 使用 dddd 表示星期
    return newDate;
  };

  return {
    formatDate,
  };
}
