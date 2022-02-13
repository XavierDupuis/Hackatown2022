import { Pipe } from "@angular/core";

@Pipe({
    name: "phone"
})
export class PhonePipe {
    transform(rawNum: string) {
        const size = rawNum.length;
        const thirdPart = [...rawNum].slice(size - 4, size);
        const secondPart = [...rawNum].slice(size - 7, size - 4);
        const firstPart = [...rawNum].slice(size - 10, size - 7);

        let result = "";
        for (const part of [firstPart, secondPart, thirdPart]) {
            result += '-'
            for (const num of part) {
                result += num
            }
        }
        result = result.slice(1, 13)
        return result;
    }
}