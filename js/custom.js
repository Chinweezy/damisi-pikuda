fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@damisipikuda')
.then((res) => res.json())
.then((data) => {

    // Filter the array
    const res = data.items //This is an array with the content. No feed, no info about author etc..
    const posts = res.filter(item => item.categories.length > 0) // That's the main trick* !

    function toText(node) {
        let tag = document.createElement('div')
        tag.innerHTML = node
        node = tag.innerText
        return node
     }

     function shortenText(text, startingPoint , maxLength) {
        return text.length > maxLength?
           text.slice(startingPoint, maxLength):
           text
       }

       let output = '';
       posts.forEach((item) => {
          output += `
          <div class="blog__post mt-3">
             <a href="${item.link}">
                <img src="${item.thumbnail}" class="blog__topImg"></img>
                <div class="blog__content">
                   <div class="blog_preview">
                      <h5 class="blog__title">${item.title}</h5>
                      <p class="blog__intro mt-3">${shortenText(toText(item.content),0, 80)+ '...'}</p>
                   </div>
                   <hr>
                   <div class="blog__info">
                      <span class="blog__date">${shortenText(item.pubDate,0 ,10)}</span>
                   </div>
                </div>
             <a/>
          </div>`
       })
       document.querySelector('.blog__slider').innerHTML = output
})