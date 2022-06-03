export const handlePaginationParams = (param: string, defaultValue: number): number => {
    const result = parseInt(param);
    if(isNaN(result) || Math.sign(result) < 1) return defaultValue;
    return result;
} 