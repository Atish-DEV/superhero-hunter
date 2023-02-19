$(document).ready(function(e){
    let allHeroList=document.querySelector('#container');
    function display(data){
        let superHeroList=data.data.results;
        for(item of superHeroList){
           // console.log(item.name);
           let img=item.thumbnail.path+'.'+item.thumbnail.extension;
           let name=item.name;
           let description=item.description;
           let singleHeroDetails=document.createElement('div');
           singleHeroDetails.classList.add('singleHero');
           let singleHeroImg=document.createElement('img');
           singleHeroImg.setAttribute('src',img);
           let singleHeroName=document.createElement('h2');
           singleHeroName.innerHTML=name;
           let singleHeroDesc=document.createElement('h3');
           singleHeroDesc.innerHTML=description;
           singleHeroDetails.append(singleHeroImg);
           singleHeroDetails.append(singleHeroName);
           singleHeroDetails.append(singleHeroDesc);
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