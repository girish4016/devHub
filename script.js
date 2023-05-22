
let search_but = document.querySelector('.search_button');
let search_bar = document.querySelector('.search_bar');

search_but.addEventListener('click',search_user);
search_bar.addEventListener('keypress',function(e){if(e.key==='Enter')search_user();});


search_user();

async function search_user(){
    let search_bar = document.querySelector('.search_bar');
    let username = search_bar.value;
    if(username==="")username = 'github';
    let apcall;// = await fetch(`https://api.github.com/users/${username}`);
    try{
        apcall = await fetch(`https://api.github.com/users/${username}`);
    }catch(e){
        return;
    }
    let userDet = await apcall.json();
    // Test
    console.log(username)
    console.log(userDet);
    // 

    if(apcall?.ok)
    update_details(userDet);
    else{
        document.querySelector('.error_display').style.display = 'flex';
        setTimeout(function(){
            document.querySelector('.error_display').style.display = 'none';
        },2000)
    }
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


// dark mode :

let mode = 1;

let mode_selecter = document.querySelector('.dark_mode');
mode_selecter.addEventListener('click',invert_mode);

function invert_mode(){
    if(mode){
        mode = 0;
        document.querySelector('.wrapper').classList.add('dark_wrapper');
        document.querySelector('.search_space').classList.add('dark_content');
        document.querySelector('.search_bar').classList.add('dark_content');
        document.querySelector('.user_details').classList.add('dark_content');

        document.querySelector('.search_bar').classList.add('dark_sbdf');
        document.querySelector('.date').classList.add('dark_sbdf');
        document.querySelector('.f1').classList.add('dark_sbdf');
        document.querySelector('.f0').classList.add('dark_sbdf');
        document.querySelector('.f2').classList.add('dark_sbdf');
        document.querySelector('.name').classList.add('dark_name');
        document.querySelector('.dark_mode').classList.add('dark_name');

        document.querySelector('.real_name').classList.add('dark_namenum');
        document.querySelector('.repos').classList.add('dark_namenum');
        document.querySelector('.Followers').classList.add('dark_namenum');
        document.querySelector('.Following').classList.add('dark_namenum');
        document.querySelector('.user_name').classList.add('dark_uname');
        document.querySelector('.bio').classList.add('dark_bio');


        document.querySelector('.links').classList.add('dark_name');
        
        document.querySelector('.dark_mode p').innerHTML = 'LIGHT';
        document.querySelector('.moon').style.display = 'none';
        document.querySelector('.sun').style.display = 'flex';

        localStorage.setItem('mode','dark');
        
    }
    else{
        mode = 1;
        document.querySelector('.wrapper').classList.remove('dark_wrapper');
        document.querySelector('.search_space').classList.remove('dark_content');
        document.querySelector('.search_bar').classList.remove('dark_content');
        document.querySelector('.user_details').classList.remove('dark_content');

        document.querySelector('.search_bar').classList.remove('dark_sbdf');
        document.querySelector('.date').classList.remove('dark_sbdf');
        document.querySelector('.f1').classList.remove('dark_sbdf');
        document.querySelector('.f0').classList.remove('dark_sbdf');
        document.querySelector('.f2').classList.remove('dark_sbdf');
        document.querySelector('.name').classList.remove('dark_name');
        document.querySelector('.dark_mode').classList.remove('dark_name');

        document.querySelector('.real_name').classList.remove('dark_namenum');
        document.querySelector('.repos').classList.remove('dark_namenum');
        document.querySelector('.Followers').classList.remove('dark_namenum');
        document.querySelector('.Following').classList.remove('dark_namenum');
        document.querySelector('.user_name').classList.remove('dark_uname');
        document.querySelector('.bio').classList.remove('dark_bio');


        document.querySelector('.links').classList.remove('dark_name');
        
        document.querySelector('.dark_mode p').innerHTML = 'DARK';
        document.querySelector('.sun').style.display = 'none';
        document.querySelector('.moon').style.display = 'flex';
        
        localStorage.setItem('mode','light');
    }
}

// check weather device is on dark mode

if(((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)&&( localStorage.getItem('mode') != 'light' ))
         || localStorage.getItem('mode') === 'dark' )
{
    invert_mode();
}

