const Div_api = document.getElementById("Div_of_api");
const sort_button = document.getElementById("sort_button");
const content_div = document.getElementById("Div_of_content");
const sort_f = document.getElementById("sort");


// const load = () =>{
//         const res =fetch(
//             "https://openapi.programming-hero.com/api/videos/categories"
//         );

//         const data = res.json();
//         api_bar(data.data);
//         console.log(api_bar);
// }
const load = async () => {
      const response = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories")
      const data = await response.json();
      api_bar(data.data);
    } 

const api_bar = (data) =>{
    data.forEach((element) => {
        const div = document.createElement("div");
        div.classList.add("bar");

        div.innerHTML =`
        <button class="All_buton" id="${element.category_id}" onclick ="card('${element.category_id}')">${element.category}</button>
        `;
        Div_api.appendChild(div);
        
    });
};

function parse (stringofview){
    const multiplier = stringofview[stringofview.length] == "K" ? 1000 : stringofview[stringofview.length] == 'M' ? 1000000 : 1;
  return parseFloat(stringofview) * multiplier;
};

function sta(data){
    if (data && data.data && Array.isArray(data.data)) {
        data.data = data.data.sort((a, b) => {
            const A = a.others && a.others.views ? parse(a.others.views) : 0;
            const B = b.others && b.others.views ? parse(b.others.views) : 0;
            return B - A;
        });

        return data.data;
    }
}
function hours_convertor(seconds){
    if(isNaN(seconds) || seconds == 0) return "";
    
    let hours = Math.floor(seconds/3600);
    let minutes = Math.floor((seconds % 3600) / 60);
  
    return `${hours} hours ${minutes} minutes`;
  }
  

async function card(dataid){
    const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${dataid}`
      );
    const data = await response.json();

    if (data.status) {
      funcofcard(data.data,data.status);
      sort_f.addEventListener("click",() =>{
          var sortData = sta(data);
          funcofcard(sortData,data.status);
          console.log(sortData);
      })
    }
    else{
      sortData = undefined;
      Show_No_content_section(data)
    }
}
function Show_No_content_section(d){
    while(content_div.firstChild){
        content_div.removeChild(content_div.firstChild);
    }
    sort_button.style.display ='none';
  
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("card_main_container");
    mainContainer.innerHTML = `
        <div class="empty_card">
            <img src="./images/Icon.png" alt="image of card">
            <p>Oops!! Sorry, There is no content here</p>
        </div>`;
        content_div.appendChild(mainContainer);
        
  }

  const funcofcard = (data,Status) => {
    if(Status){
    while(content_div.firstChild){
        content_div.removeChild(content_div.firstChild);
    }

    sort_button.style.display ='inline-flex';
    data.forEach((dataInfo) => {
      
      const main_div = document.createElement("div");
      main_div.classList.add("card_main_container");
      main_div.innerHTML = `
          <div class="image_of_card position-relative">
              <img src="${dataInfo.thumbnail}" alt="image of card">
              <p class="hours_content">${hours_convertor(dataInfo.others.posted_date)}</p>
          </div>
          <div class="details_container_card">
              <div class="logo_of_card mt-3">
                  <img src="${dataInfo.authors[0].profile_picture}" alt="">
              </div>
              <div class="info_of_card lh-base mt-3">
                  <h3>${dataInfo.title}</h3>
                  <p class="profile_name">${dataInfo.authors[0].profile_name}</p>
                  <img src="${dataInfo.authors[0].verified ? './images/verified.png' : './images/1280px-HD_transparent_picture.png'}" alt="">
                  <p>${dataInfo.others.views} views</p>
              </div>
          </div>
      `;
      content_div.appendChild(main_div);
    });
    }
    else{
      Show_No_content_section(data) 
    }
  };
  // Creatre contentSection  end
  load();
  card(1000)