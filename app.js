
// function searchSong(){
//  const inputSong = document.getElementById("input-song").value;

//  fetch(`https://api.lyrics.ovh/suggest/${inputSong}`)
//     .then(res => res.json())
//     .then(data =>{
//        // displayData = data;
//        console.log(data.data[0].title);
    
//     })

 
// }

document.getElementById("search").addEventListener('click', searchResult);
 function searchResult(){
    const removeResult = document.getElementById("showResult").innerHTML = "";
    const inputSong = document.getElementById("input-song").value;
    fetch(`https://api.lyrics.ovh/suggest/${inputSong}`)
      .then(res => res.json())
      .then(data =>{
           fetchData = data;
          for (let i = 0; i < data.data.length; i++) {
            // console.log(data.data[i].title);
            // console.log(data.data[i].album.cover_small);
            // console.log(data.data[i].artist.name);

           const title = data.data[i].title;
           const CoverImg = data.data[i].album.cover;
           const artistName = data.data[i].artist.name;
           document.getElementById("showResult").innerHTML += ` <div class="search-result col-md-8 mx-auto py-4">
           <div class="single-result row align-items-center my-3 p-3">
               <div class="col-md-3">
                 <img src="${CoverImg}" alt="cover-image">
               </div>
                 <div class="col-md-6">
                   <h3 id="title" class="lyrics-name">${title}</h3>   
                   <p id="artist-name" class="author lead">Album by <span>${artistName}</span></p>
                 </div>
               <div class="col-md-3 text-md-right text-center">
                   <button onclick="lyricsResult(${i})" class="btn btn-success">Get Lyrics</button>
               </div>
           </div>
       </div>`

       if (i == 9) {
        break;
       }
    }  
 })
}
function lyricsResult(lyric){
    const title = fetchData.data[lyric].title;
   // const coverImg = fetchData.data[lyric].album.cover;
    const titleName = fetchData.data[lyric].artist.name;

    fetch(`https://api.lyrics.ovh/v1/${title}/${titleName}`)
      .then(res => res.json())
      .then(data =>{
        const getLyrics = data.lyrics;
        if (data.lyrics == undefined) {
            alert("lyrics not found !")
        }
        else{
            document.getElementById("showLyrics").innerHTML += `<pre>${getLyrics}</pre>`
        }

      })


}
