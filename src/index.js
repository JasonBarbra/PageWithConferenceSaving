const zapis1 = document.getElementById("1");
const zapis2 = document.getElementById("2");
const  loginpart = document.querySelector(".mf-log");
const login = document.querySelector(".log");
const content = document.querySelector(".container");
const counter = document.querySelector(".personCounter");
const logout = document.getElementById("logout");
const logoutpart = document.querySelector(".sect-logout");
dataButton = document.getElementById('data1');
const error = document.querySelector('.error');
const span2 = document.getElementById("span2");
let jason=[];
let jason2=[];
let Jsonindex=0;
let Jsonindex2=0;
let personCounter=0;
let personCounter2=0;
auth.onAuthStateChanged(user =>{
    if(user){
        jason = [];
        jason2 = [];
        Jsonindex=0;
        Jsonindex2=0;
        loginpart.classList.add('d-none');
        logoutpart.classList.remove('d-none');
        counter.classList.remove('d-none');
        db.collection('event3').orderBy('send_at','desc').get().then((snapshot) =>{
            personCounter=snapshot.docs.length;
            counter.querySelector('span').textContent = `${personCounter}`;
            snapshot.docs.forEach(doc =>{
                jason.push(doc.data());
                const when = dateFns.format( jason[Jsonindex].send_at.toDate(), 'Do.MMMM.YYYY');
                jason[Jsonindex].send_at = when;
                Jsonindex+=1;
            });
         });
         db.collection('event2').orderBy('send_at','desc').get().then((snapshot) =>{
            personCounter2=snapshot.docs.length;
            span2.textContent = `${personCounter2}`;
            snapshot.docs.forEach(doc =>{
                jason2.push(doc.data());
                const when = dateFns.format( jason2[Jsonindex2].send_at.toDate(), 'Do.MMMM.YYYY');
                jason2[Jsonindex2].send_at = when;
                Jsonindex2+=1;
            });
         });
    }
    else{
        loginpart.reset();
        content.classList.remove('d-none');
        loginpart.classList.add('d-none');
        counter.classList.add('d-none');
        logoutpart.classList.add('d-none');
        jason=[];
        jason2=[];
    }
 })

zapis1.addEventListener('click', e => {
    window.location= "https://zapisy2.netlify.app/";
})

zapis2.addEventListener('click', e => {
    window.location= "https://zapisy1.netlify.app/";
})

login.addEventListener("click", e =>{
    content.classList.add('d-none');
    loginpart.classList.remove('d-none');
 })

loginpart.addEventListener("submit", e=>{
    e.preventDefault();
   const email = loginpart.login.value;
   const password = loginpart.password.value;
   auth.signInWithEmailAndPassword(email,password).then(cred =>{
   }).catch(err =>{
    error.innerHTML = 'Niepoprawne hasło lub login';
    setTimeout(() => {
      error.innerHTML='';
    },3000);
  })
  loginpart.reset();
 })


 logout.addEventListener('click', e=>{
    e.preventDefault;
    auth.signOut();
 })


 dataButton.addEventListener('click', e=>{
   const { Parser } = require('json2csv');
    const json2csvParser = new Parser();
     const csv = json2csvParser.parse(jason);
 
 let hiddenElement = document.createElement('a');
     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
     hiddenElement.target = '_blank';
     
     //provide the name for the CSV file to be downloaded
     hiddenElement.download = 'web1_Candidates.csv';
     hiddenElement.click();
 })