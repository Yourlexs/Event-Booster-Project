import onCloseRegistration from './openRegistration';

async function userRegistration(user,phone,email){
  const url = `http://185.238.137.46:8080/addUser?user=${user}&phone=${phone}&email=${email}`;

try {
  await fetch(url).then((response) => {
 //console.log('text ' , response);
 if (response.status == 200) {
   console.log('ok');
 }

 if (response.status == 400) {
   console.log('BAD REQUEST');
 }
 response.json().then((data) => {
     console.log(data);
 });
});
} catch (error) {
  alert('Такой пользователь уже есть');
}
}
  
  const form = document.getElementById('form')
  const button = document.getElementById ('button-submit')
  
  form.addEventListener('submit', checkForFilling)
  button.addEventListener('click',onFormSubmit)
  
  //  функия для отправки формы
  function onFormSubmit (e){
    e.preventDefault();
    const user = document.getElementById('user').value
    const phone = document.getElementById('phone').value
    const email = document.getElementById('email').value

    if (checkForFilling(user,phone,email)) {
      userRegistration(user,phone,email)
    }
  
    e.currentTarget.reset();
  }
  
  
   //функция для проверки правильности заполнения формы
function checkForFilling (user,phone,email) {
    
  if (user === '') {
     alert('Ведите имя');
    return false;
  }

  if (phone === '') {
      alert('Ведите телефон');
     return false;
  }
  
  if (email === '') {
      alert('Ведите email');
     return false;
  }

   else {
   onCloseRegistration();
    return true;
  }
}