const url = "https://kontests.net/api/v1/all"
const puttingData = document.getElementById('data')
const searchInput = document.getElementById('search-input');
let count = 0;

localStorage.setItem('HackerRank' , 'https://www.hackerrank.com/blog/wp-content/uploads/blog-no-img-cursorlogo-e1588888720902.png')
localStorage.setItem('HackerEarth' , 'https://upload.wikimedia.org/wikipedia/commons/e/e8/HackerEarth_logo.png')
localStorage.setItem('AtCoder' ,'https://saved-work.desmos.com/calc_thumbs/production/c1lfnsj1nz.png')
localStorage.setItem('LeetCode' , 'https://repository-images.githubusercontent.com/314091861/8c489d80-2ad2-11eb-96f0-9559eae37f57')
localStorage.setItem('CodeForces' , 'https://cdn.iconscout.com/icon/free/png-256/code-forces-3629285-3031869.png')
localStorage.setItem('CodeChef' , 'https://i.pinimg.com/originals/c5/d9/fc/c5d9fc1e18bcf039f464c2ab6cfb3eb6.jpg')
localStorage.setItem('Kick Start' , 'http://www.mladiinfo.eu/wp-content/uploads/2020/05/75642397_202483967434562_2620245142245736448_n.jpg')

let items = []

async function fetchData(){
    const data = await fetch(url)
    let codeforcesData = await fetch("https://kontests.net/api/v1/codeforces")
    const response = await data.json();
    codeforcesData = await codeforcesData.json();

    for(item in response){
        items.push(response[item]);
    }

    for(item in codeforcesData){
        items.push(codeforcesData[item])
    }
    count++;

    getData(items)
}


async function getData(items){
    dataHere = ""
    
    for(item in items){
        const details = items[item]
        // console.log(details)
        details.site =  details.site ? details.site : 'CodeForces'        
        let image = localStorage.getItem(details.site)
        // console.log(image)
        if(!image) image = ""
        dataHere += `<div class="card mx-2 my-2" style="width: 18rem; border: 1px solid #696969;">
        <img class="card-img-top" src= "${image}">
        <div class="card-body">
        <h5 class="card-title">${details.name}</h5>
        <p class="card-text"><strong>Site:</strong> ${details.site}</p>
        <p class="card-text"><strong>Start-time:</strong> ${details.start_time}</p>
        <p class="card-text"><strong>End-time:</strong> ${details.end_time}</p>
        <p class="card-text"><strong>Duration:</strong> ${details.duration / 60} min</p>
        <a href="${details.url}" target = "_blank" class="btn btn-dark">Go to contest</a>
        </div>
        </div>`
    }
    puttingData.innerHTML = dataHere
    //  console.log(dataHere)
}

function filerData(value){
    let another = items
    another = another.filter((item) =>{
        return (value === item.site.substring(0 , value.toString().length))
    })
    getData(another)
}

searchInput.addEventListener('change', async(e) =>{
    console.log( e.target.value)
    filerData(e.target.value);
})

document.getElementById('Submit-btn').addEventListener('click' , (e) =>{
      e.preventDefault();
      if(e.target.value.toString().length > 0) filerData(e.target.value)
})

fetchData()