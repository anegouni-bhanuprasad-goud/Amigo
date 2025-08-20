const { GoogleGenerativeAI } = require("@google/generative-ai");


const apikey = "AIzaSyDHbYxYybUutoK-haEXaa42TRVbMlZ7XQY"

export async function testApi(api){
  console.log("Backend : TestAPI function invoked...")
  const genAI = new GoogleGenerativeAI(api)
  const model = genAI.getGenerativeModel({model : 'gemini-1.5-flash'})
  const response = await model.generateContent("just return 1 if this prompt reaches you")
  console.log(response.candidates[0].content.parts[0].text)
}


export default async function gen(prompt){

  const genAI = new GoogleGenerativeAI(apikey);
  const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash" ,
  tools : [{
    codeExecution : {}
  }]});


  console.log("Backend gen function initiated....")
  try{
    const result = await model.generateContent(prompt)
    if(result){
      console.log(result)
      console.log("\n\n")
      console.log(result.response.candidates[0].content.parts[0].text)
      return result
    }
  }catch(err){
    console.log(err);
  }
}

async function genWithImg(prompt,imgData1, imgMime1, imgData2, imgMime2){
  const model = genAI.getGenerativeModel({model : 'gemini-1.5-flash'})

  const imageData1 = {
    inlineData : {
      data : imgData1,
      mimeType: imgMime1,
    },
  }
  console.log("imageData-1 \n",imageData1)


  const imageData2 = {
    inlineData : {
      data : imgData2,
      mimeType: imgMime2,
    },
  }
  console.log("imageData-2\n",imageData2)

  try{
    const result = await model.generateContent([
      prompt,
      imageData1,
      imageData2,
    ])
  
    const response = await result.response
  
    console.log("Response : \n\n",response.candidates[0].content.parts[0].text)

    

    console.log("TextResponse : ", textResponse)
    return response
  }catch(err){
    console.log("Error Fetching Response : ", err)
    return err
  }
}

async function getResponseFromGemini(prompt, imgData){
  const model = genAI.getGenerativeModel({model : 'gemini-1.5-flash'})
  console.log("Data recieved by Gemini Function... ")

  /*
  img1 = {
    inlineData : {
      data : imgData[0].data,
      mimeType: imgData[0].mimeType,
    },
  }
  img2 ={
    inlineData : {
      data : imgData[1].data,
      mimeType: imgData[1].mimeType,
    },
  }

  sendingdata = [
    img1,
    img2,
  ]
  */

  sendingdata = [
    {
      inlineData :{
        data : imgData[0].data,
        mimeType: imgData[0].mimeType,
      }, 
    },
    {
      inlineData :{
        data : imgData[1].data,
        mimeType: imgData[1].mimeType,
      },
    }
  ]
  
  sendingData =[]
  for(let i=0; i<imgData.length; i++){
    sendingData.push({
      inlineData:{
        data : imgData[i].data,
        mimeType: imgData[i].mimeType,
    },
  })
  }
  

  console.log("image Data Length : ", sendingData.length)

  try{
    const result = await model.generateContent([prompt, ...sendingData])
    const response = await result.response
    console.log("Response : ", response.candidates[0].content.parts[0].text)
    return response.candidates[0].content.parts[0].text
  }catch(err){
    console.log("Error Fetching Response : ", err)
    return err
  }

}

