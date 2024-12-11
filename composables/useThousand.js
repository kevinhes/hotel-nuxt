export function useThousand() {
  /**
   * 將數字轉換為千分位格式
   * @param {number | string} value - 要格式化的數字
   * @param {string} locale - 地區設置 (預設 'en-US')
   * @returns {string} 格式化後的字串
   */
  const formatToThousand = (value, locale = 'en-US') => {
    if (typeof value === 'number' || !isNaN(Number(value))) {
      return Number(value).toLocaleString(locale);
    }
    return value;
  };

  return {
    formatToThousand,
  };
}
