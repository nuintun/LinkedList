/**
 * @function isNull
 * @description 是否为空值
 * @param value 需要验证的值
 */
export function isNull(value: any): value is null {
  return value === null;
}

/**
 * @function normalizeIndex
 * @description 标准化开始索引
 * @param size 双链表长度
 * @param fromIndex 开始索引
 */
export function normalizeIndex(size: number, fromIndex: number = 0): number {
  return fromIndex < 0 ? Math.max(0, size + fromIndex) : fromIndex;
}
