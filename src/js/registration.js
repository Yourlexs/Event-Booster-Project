import onCloseRegistration from './openRegistration';
import notify from './notify';

async function userRegistration(user,phone,email){
  const url = `https://vds2107942.my-ihor.ru/addUser?user=${user}&phone=${phone}&email=${email}`;

try {
      await fetch(url).then((response) => {
    
        response.json().then((data) => {
          var requestData = data;
          var status = requestData["status"];

          console.log('status ', status);

        if (response.status == 200) {
              // alert('Registered successfully');
          notify.good('Excellent!', 'Registered successfully')
        }

        if (response.status == 400) {
          // alert ('This user already exists');
          notify.good('Sorry', 'This user already exists')
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
    //  alert('Lead the name');
    notify.good('Please', 'Lead the name')
    return false;
  }

  if (phone === '') {
      // alert('Lead the phone');
    notify.good('Please', 'Lead the phone')
     return false;
  }
  
  if (email === '') {
      // alert('Lead the email');
    notify.good('Please', 'Lead the email')
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
  
  
