// FS MODULES

const fs = require("fs")

// Create and write into the file

fs.writeFile('hello.txt', "welcome to this new file", (error) => {
    if(error){
        console.log(error)
    }else{
        console.log("File successfully created")
    }
})


// Read from the file

fs.readFile('hello.txt',"utf8",(error, data)=>{
    if(error) throw error;
    console.log(data)
});