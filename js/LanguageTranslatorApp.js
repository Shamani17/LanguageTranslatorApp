const translateBtn=document.getElementById("btn"),
icons=document.querySelectorAll(".row i")
selectTag=document.querySelectorAll(".select")
const fromtext=document.querySelector(".from-text")
totext=document.querySelector(".from-to")
const exchangeIcon=document.querySelector(".exchange")
selectTag.forEach((tag,id)=>{
    for(const country_code in countries)
    {
        let selected;
        if(id==0 && country_code=="en-GB")
        {
            selected="selected"
        }
        else if(id==1 && country_code=="hi-IN")
        {
            selected="selected"
        }
        let opt=`<option value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",opt);
    }
});
exchangeIcon.addEventListener("click",()=>
{
    let temptext=fromtext.value
    let templang=selectTag[0].value
    selectTag[0].value=selectTag[1].value
    selectTag[1].value=templang
    fromtext.value=totext.value
    totext.value=temptext
})
translateBtn.addEventListener("click",()=>
{
    let text=fromtext.value
    translateFrom=selectTag[0].value
    translateTo=selectTag[1].value
    const apiURL=`https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`
    fetch(apiURL).then(res=>res.json()).then(data=>
    {
        totext.value=data.responseData.translatedText
    })
})
const translateBtn2=document.querySelector(".from-text")
translateBtn2.addEventListener("keydown",function(event)
{
    
    if(event.key=="Enter")
    {
        let text=fromtext.value
        translateFrom=selectTag[0].value
        translateTo=selectTag[1].value
        console.log(text)
        const apiURL=`https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`
        fetch(apiURL).then(res=>res.json()).then(data=>
        {
          totext.value=data.responseData.translatedText
        })
    }
});
icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{ 
      if(target.classList.contains("fa-copy"))
      {
        if(target.id=="from")
        {
            navigator.clipboard.writeText(fromtext.value)
        }
        else
        {
            navigator.clipboard.writeText(totext.value)
        }
      }
      else
      {
        let utterance
        if(target.id=="from")
        {
            utterance=new SpeechSynthesisUtterance(fromtext.value)
            utterance.lang=selectTag[0].value
        }
        else
        {
            utterance=new SpeechSynthesisUtterance(totext.value)
            utterance.lang=selectTag[1].value
        }
        speechSynthesis.speak(utterance)
      }
    })
})