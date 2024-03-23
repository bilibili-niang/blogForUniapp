import colors from "../static/color/colors.json";

const colorsMap = colors;

colorsMap.forEach(item => {
    // @ts-ignore
    colorsMap[item.pinyin] = {
        color: item.RGBA,
        hover: item.bleak
    };
});


// 截取时间
export const getTimeByStr = (str: string): string => !str ? '0' : str.slice(0, 10) + " " + str.slice(11, 16);
// 查找颜色
export const findColor = function (pinyin: any): any {
    const obj = colorsMap[pinyin];
    return obj || false;
};
export const borderColor = "#ccccd6";

/**
 * 深克隆
 */
export const deepClone = function (obj: any): any {
    if (obj instanceof Array) {
        let result = [];
        for (let i = 0; i < obj.length; i++) {
            result.push(deepClone(obj[i]));
        }
        return result;
    } else if (obj instanceof Object) {
        let result = {};
        for (let key in obj) {
            result[key] = deepClone(obj[key]);
        }
        return result;
    } else {
        return obj;
    }
};