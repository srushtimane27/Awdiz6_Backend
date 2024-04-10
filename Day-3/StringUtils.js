function CapitalString(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}
// console.log(CapitalString("akshay"));

function ReverseString(str){
    return str.split("").reverse().join("");
}
// console.log(ReverseString("Hey"))
module.exports = { CapitalString, ReverseString };