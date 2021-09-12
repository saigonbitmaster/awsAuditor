import {getUserGroups} from './cmds'
import {iamReport} from "./utils"

getUserGroups(data => {
let result = iamReport(data);
console.log(result)
});