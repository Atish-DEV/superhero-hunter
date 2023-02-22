$(document).ready(function(){
    let getFavList=localStorage.getItem('favHero');
    let closeBtn=document.querySelector('#closeBtn');
    let modal=document.querySelector('#modal');
    let nameContent=document.querySelector('#name-content');
    let imageContent=document.querySelector('.img-container>img');
    let descContent=document.querySelector('#desc-content');
  //let favHerosDetails=[];
    let favListArr=JSON.parse(getFavList);
    let allHeroList=document.querySelector('#container>.row');
    function constructAppend(data){
      let superHeroList=data.data.results;
      for(let item of superHeroList){
        let img=item.thumbnail.path+'.'+item.thumbnail.extension;
        let name=item.name;
        let description=item.description;
         let singleHeroDetails=document.createElement('div');
         let heroImgNameDiv=document.createElement('div');
         singleHeroDetails.classList.add('col-md-3');
         singleHeroDetails.classList.add('singleHero');
         singleHeroDetails.classList.add('col-md-3');
           singleHeroDetails.classList.add('p-2');
           singleHeroDetails.classList.add('singleHero');
         let singleHeroImg=document.createElement('img');
         singleHeroImg.setAttribute('src',img);
         singleHeroImg.classList.add('img-fluid');
         let singleHeroName=document.createElement('h2');
         singleHeroName.innerHTML=name;
         heroImgNameDiv.append(singleHeroImg);
         heroImgNameDiv.append(singleHeroName);
         singleHeroDetails.append(heroImgNameDiv);
        //  let singleHeroDesc=document.createElement('h3');
        //  singleHeroDesc.innerHTML=description;
        let btnDiv=document.createElement('div');
        btnDiv.classList.add('actionBtn');
        let actionBtnFav=document.createElement('button');
        actionBtnFav.innerHTML='Remove from Favorite';
        actionBtnFav.style.backgroundColor='rgba(73, 247, 73, 0.979)';
        actionBtnFav.addEventListener('click',function(e){
          let parentElem=e.target.parentElement.parentElement;
          //console.log(favListArr);
          const index=favListArr.indexOf(item.id);
          if(index>-1){
            favListArr.splice(index,1);
           localStorage.removeItem('favHero');
           localStorage.setItem("favHero", JSON.stringify(favListArr));
          parentElem.remove(); 
          }        
        });
        let actionBtnShowDetails=document.createElement('button');
         actionBtnShowDetails.innerHTML='Show Details';
         actionBtnShowDetails.onclick=function(e){
          //console.log('click');
          nameContent.innerHTML=name;
          imageContent.setAttribute('src',img);
          if(description.length>0){
              descContent.innerHTML=description;
          }
          else{
              descContent.innerHTML=' Not much information is available for this Character...But you can explore ..';
          }
          modal.style.display='block';
      }
      closeBtn.addEventListener('click',function(){
        modal.style.display='none';
    });
    window.onclick=function(e){
        if(e.target==modal){
            modal.style.display='none';
        }
    }
        //singleHeroDetails.append(singleHeroImg);
        //singleHeroDetails.append(singleHeroName);
        //singleHeroDetails.append(singleHeroDesc);
        btnDiv.append(actionBtnFav);
        btnDiv.append(actionBtnShowDetails);
        // singleHeroDetails.append(actionBtnFav);
        // singleHeroDetails.append(actionBtnShowDetails);
        singleHeroDetails.append(btnDiv);
        allHeroList.append(singleHeroDetails);
      }
    }
    if(favListArr.length>0){
      for(let item of favListArr){
        if(item){
        let url='https://gateway.marvel.com/v1/public/characters/'+item+'?ts=1&apikey=8199d7f9453bbe2730f2401786e12ba6&hash=0333d0c98ba986f005fd7a580173db88';
        $.get(url,function(data){
         //console.log(data);
          //favHerosDetails.push(data.data.results);
           //console.log(favHerosDetails);
          //console.log(favHerosDetails);
          constructAppend(data);
       });
        }
      }
    }
  });