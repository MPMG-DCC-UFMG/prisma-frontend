import { red, orange, volcano, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey } from '@ant-design/colors';

export class ColorService {

    static getColor(colorName) {
        const colors = {
            red: red,
            orange: orange,
            volcano: volcano,
            gold: gold,
            yellow: yellow,
            lime: lime,
            green: green,
            cyan: cyan,
            blue: blue,
            geekblue: geekblue,
            purple: purple,
            magenta: magenta,
            grey: grey
        }

        return colors[colorName] ? colors[colorName].primary : colors.grey.primary;
    }

}