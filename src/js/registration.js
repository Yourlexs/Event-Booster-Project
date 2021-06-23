import onCloseRegistration from './openRegistration';

async function userRegistration(user,phone,email){
  const url = `https://vds2107942.my-ihor.ru/addUser?user=${user}&phone=${phone}&email=${email}`;

try {
      await fetch(url).then((response) => {
    
        response.json().then((data) => {
          var requestData = data;
          var status = requestData["status"];

          console.log('status ', status);

        if (response.status == 200) {
              alert('Зареганы успешно');
        }

        if (response.status == 400) {
          alert ('Такой пользователь уже существует');
        }

      });

    });
  } catch (error) {
    console.log('error ', error)
  }
}
  
  const form = document.getElementById('form')
  const button = document.getElementById ('button-submit')
  
  form.addEventListener('submit', onFormSubmit)
  button.addEventListener('click',checkForFilling)

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
  
  
