<%* 
const fileName = await tp.file.prompt(""); 
const templateFileName = "/Templates/template1.md"; 
const content = await tp.file.include(templateFileName); 
await tp.file.create(content, fileName, true); 
%>
