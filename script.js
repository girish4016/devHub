
let search_but = document.querySelector('.search_button');
let search_bar = document.querySelector('.search_bar');

search_but.addEventListener('click',search_user);
search_bar.addEventListener('keypress',function(e){if(e.key==='Enter')search_user();});


search_user();

async function search_user(){
    let search_bar = document.querySelector('.search_bar');
    let username = search_bar.value;
    if(username==="")username = 'github';
    let apcall = await fetch(`https://api.github.com/users/${username}`);
    let userDet = await apcall.json();
    // Test
    console.log(username)
    console.log(userDet);
    // 

    
    update_details(userDet);
}


function update_details (userDet){

    // avatar
    let user_img = document.querySelector('.imag');
    user_img.style.backgroundImage = `none`;
    user_img.style.backgroundImage = `url(${userDet?.avatar_url})`;

    // username
    if(userDet?.name != null)
    document.querySelector('.real_name').innerHTML = userDet?.name;
    else
    document.querySelector('.real_name').innerHTML = userDet?.login;

    //uid
    document.querySelector('.user_name').innerHTML = '@'+userDet?.login;
    document.querySelector('.user_name').href = userDet?.html_url;

    //joining date
    let d = new Date(userDet?.created_at)
    d = d.toLocaleString('en-Us',{ day : 'numeric', month : 'long', year : 'numeric'});
    // 
    console.log(d);
    // 
    document.querySelector('.date').innerHTML = 'Joined '+ d;

    //following followers repos
    console.log(userDet?.public_repos);
    document.querySelector('.repos').innerHTML = userDet?.public_repos;
    document.querySelector('.Followers').innerHTML = userDet?.followers;
    document.querySelector('.Following').innerHTML = userDet?.following;

    //bio
    if(userDet?.bio!=null)
    document.querySelector('.bio p').innerHTML = userDet?.bio;
    else 
    document.querySelector('.bio p').innerHTML = 'The profile has no bio';

    //email company location twitter uname
    if(userDet?.email!=null)
    document.querySelector('.website_link a').href = 'https://gmail.com'
    else
    document.querySelector('.website_link a').href = 'mailto:' + userDet?.email;

    
    if(userDet?.location==null)
    document.querySelector('.location p').innerHTML = 'Location'
    else
    document.querySelector('.location p').innerHTML = userDet?.location;
    
    if(userDet?.company==null)
    document.querySelector('.company p').innerHTML = 'Company'
    else
    document.querySelector('.company p').innerHTML = userDet?.company;

    
    if(userDet?.twitter_username==null)
    document.querySelector('.twitter_link a').href = 'https://twitter.com/'
    else
    document.querySelector('.twitter_link a').href = `https://twitter.com/${userDet?.twitter_username}` ;


    

}