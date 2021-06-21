
function userRegistration(user,phone,email){
    const url = `http://localhost:8080/addUser?user=${user}&phone=${phone}&email=${email}`;
  
  
  fetch(url).then((response) => {
   //console.log('text ' , response);
   if (response.status == 200) {
     console.log('ok');
   }
  
   if (response.status == 400) {
     console.log('BAD REQUEST');
     
   }
   response.json().then((data) => {
       console.log(data.value);
       
   });
  });
  }
  
  const form = document.getElementById('form')
  const button = document.getElementById ('button-submit')
  
  //form.addEventListener('', checkForFilling)
  button.addEventListener('click',buttonPrevent)
  
  //  функия для отправки формы
  function buttonPrevent (e){
    e.preventDefault();
    const user = document.getElementById('user').value
    const phone = document.getElementById('phone').value
    const email = document.getElementById('email').value

    if (checkForFilling(user,phone,email)) {
      userRegistration(user,phone,email)
    }
  
    console.log(e)
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
    //alert('Вы зарегистрированы')
    return true;
    
  }
  
   }