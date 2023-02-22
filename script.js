$(document).ready(function(e){
    let allHeroList=document.querySelector('#container>.row');
    let getFavList=localStorage.getItem('favHero');
   // let btn=document.querySelector('.myBtn');
    let closeBtn=document.querySelector('#closeBtn');
    let modal=document.querySelector('#modal');
    let nameContent=document.querySelector('#name-content');
    let imageContent=document.querySelector('.img-container>img');
    let descContent=document.querySelector('#desc-content');
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
           let heroImgNameDiv=document.createElement('div');
           heroImgNameDiv.classList.add('imgDiv');
           singleHeroDetails.classList.add('col-md-3');
           singleHeroDetails.classList.add('p-2');
           singleHeroDetails.classList.add('singleHero');
           let singleHeroImg=document.createElement('img');
           singleHeroImg.setAttribute('src',img);
          singleHeroImg.classList.add('img-fluid');
           let singleHeroName=document.createElement('h4');
           singleHeroName.innerHTML=name;
           heroImgNameDiv.append(singleHeroImg);
           heroImgNameDiv.append(singleHeroName);
           singleHeroDetails.append(heroImgNameDiv);
           let btnDiv=document.createElement('div');
           btnDiv.classList.add('actionBtn');
          let actionBtnFav=document.createElement('button');
          if(favListArr){
            if(favListArr.indexOf(item.id)>-1){
                actionBtnFav.innerHTML='Remove from Favorite';
                actionBtnFav.style.backgroundColor='rgba(73, 247, 73, 0.979)';
            }
            else{
                actionBtnFav.innerHTML='Add to Favorite';
                actionBtnFav.style.backgroundColor='orange';
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
             e.target.style.backgroundColor='rgba(73, 247, 73, 0.979)';
             e.target.innerHTML='Remove from Favorite';
            }else{
                const index=favHeros.indexOf(item.id);
                if(index>-1){
                    favHeros.splice(index,1);
                    console.log(favHeros);
                    localStorage.removeItem('favHero');
                    localStorage.setItem("favHero", JSON.stringify(favHeros));
                }
                e.target.style.backgroundColor='orange';
                e.target.innerHTML='Add to Favorite';
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
        //    singleHeroDetails.append(singleHeroImg);
        //    singleHeroDetails.append(singleHeroName);
        btnDiv.append(actionBtnFav);
        btnDiv.append(actionBtnShowDetails);
        //   singleHeroDetails.append(actionBtnFav);
        //    singleHeroDetails.append(actionBtnShowDetails);
        singleHeroDetails.append(btnDiv);
           allHeroList.append(singleHeroDetails);
        }
    }
    $('form').on('submit',function(e){
        $('.loader').css('display','flex');
        $('.instruction').css('display','none');
        allHeroList.innerHTML='';
        console.log('hit');
        e.preventDefault();
        let searchHero=$('#nameStartsWith').val().trim();
        if(searchHero.length==0){
            alert('Enter a valid name');
            location.reload();
        }
        //console.log(searchHero);
        let url=`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=8199d7f9453bbe2730f2401786e12ba6&hash=0333d0c98ba986f005fd7a580173db88&nameStartsWith=${searchHero}`;
        $.ajax({
            url:url,
            method:'GET',
            success:function(data){
                console.log(data.data.results.length);
                if(data.data.results.length>0){
                display(data);
                $('.loader').css('display','none');
                }
                else{
                    alert('Not found');
                    location.reload();
                }
            }
        });
        // $.get(url,function(data){
        //     //console.log(data);
        //     display(data);
        // });

    });
})