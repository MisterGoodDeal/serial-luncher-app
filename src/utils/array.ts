export const removeItem = <T>(array: T[], condition: (item: T) => boolean) => {
    const index = array.findIndex(item => condition(item));
    removeItemByIndex(array, index);
}

export const removeItemByIndex = <T>(array: T[], index: number) => {
    array.splice(index, 1);
}