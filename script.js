$(document).ready(function(e){
    let allHeroList=document.querySelector('#container');
    let getFavList=localStorage.getItem('favHero');
   let favHeros=[];
   let favListArr=JSON.parse(getFavList);
   favHeros=favHeros.concat(favListArr);
   console.log(favHeros);
   console.log(favListArr);
    function display(data){
        let superHeroList=data.data.results;
        for(let item of superHeroList){
           // console.log(item.name);
          // console.log(item);
           let img=item.thumbnail.path+'.'+item.thumbnail.extension;
           let name=item.name;
           let description=item.description;
           let singleHeroDetails=document.createElement('div');
           singleHeroDetails.classList.add('singleHero');
           let singleHeroImg=document.createElement('img');
           singleHeroImg.setAttribute('src',img);
           let singleHeroName=document.createElement('h2');
           singleHeroName.innerHTML=name;
          let actionBtnFav=document.createElement('button');
          if(favListArr){
            if(favListArr.indexOf(item.id)>-1){
                actionBtnFav.innerHTML='Remove from Favorite';
            }
            else{
                actionBtnFav.innerHTML='Add to Favorite';
            }
        }
          else{
            actionBtnFav.innerHTML='Add to Favorite';
          }
          actionBtnFav.addEventListener('click',function(e){
            if(e.target.innerHTML=='Add to Favorite'){
             favHeros.push(item.id);
             console.log(favHeros);
             //update localstorage
             //if localstorage key is not present create a new key
             if(!getFavList){
                localStorage.setItem("favHero", JSON.stringify(favHeros));
             }
             //if localstorage key is present updat the key
             else{
                localStorage.removeItem('favHero');
                localStorage.setItem("favHero", JSON.stringify(favHeros));
             }
             e.target.innerHTML='Remove from Favorite';
            }else{
                const index=favHeros.indexOf(item.id);
                if(index>-1){
                    favHeros.splice(index,1);
                    console.log(favHeros);
                    localStorage.removeItem('favHero');
                    localStorage.setItem("favHero", JSON.stringify(favHeros));
                }
                e.target.innerHTML='Add to Favorite';
            }
          });
          let actionBtnShowDetails=document.createElement('button');
            actionBtnShowDetails.innerHTML='Show Details';
           singleHeroDetails.append(singleHeroImg);
           singleHeroDetails.append(singleHeroName);
          singleHeroDetails.append(actionBtnFav);
           singleHeroDetails.append(actionBtnShowDetails);
           allHeroList.append(singleHeroDetails);
        }
    }
    $('form').on('submit',function(e){
        allHeroList.innerHTML='';
        console.log('hit');
        e.preventDefault();
        let searchHero=$('#nameStartsWith').val();
        //console.log(searchHero);
        let url=`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=8199d7f9453bbe2730f2401786e12ba6&hash=0333d0c98ba986f005fd7a580173db88&nameStartsWith=${searchHero}`;
        $.get(url,function(data){
            //console.log(data);
            display(data);
        });
    });
})