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
