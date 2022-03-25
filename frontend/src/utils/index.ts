import {TestDataSource} from "../models/test.model";

export const omitKeys = (obj: any, keys: any)  => {
    let dup: any = {};
    for (let key in obj) {
        if (keys.indexOf(key) == -1) {
            dup[key] = obj[key];
        }
    }
    return dup;
}