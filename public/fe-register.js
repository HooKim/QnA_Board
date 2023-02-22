const button = document.getElementById("register-button")
const canIUse = document.getElementById("valid-button");
const idInput = document.getElementById('newId');
const pwInput = document.getElementById('newPw');
let isIdValid = false; 
const idFormat = /\W/;
const pwWhiteSpace = /\s/;
const pwMinimunSize = /.{8,}/
const pwSpecialCharacter = /\W/;
const pwSamePattern = /(.)\1\1\1/;

button.addEventListener('click', e => {
  e.preventDefault()
  const userPw = pwInput.value.trimEnd();
  if(!isIdValid) 
    alert('ID 중복검사를 실시하십시오.');
  else if(userPw.match(pwWhiteSpace))
    alert('비밀번호에 공백문자를 사용 할 수 없습니다.');
  else if(userPw.match(pwSpecialCharacter) === null)
    alert('비밀번호에 최소 1개 이상의 특수문자를 추가해야 합니다.');
  else if(userPw.match(pwMinimunSize) === null)
    alert('비밀번호는 최소 8자리 이상이어야 합니다.');
  else if(userPw.match(pwSamePattern))
    alert('비밀번호에 연속으로 같은 문자가 4번 나올 수 없습니다.');
  else{
    axios.post('/register', 
    {userId : idInput.value, userPw : pwInput.value})
    .then((res) => {
      if(res.data){
        alert('회원가입에 성공했습니다!')
        location.assign('/login');
      }else
        throw new Error()
    })
    .catch(() => {
      alert('ERROR!');
    })
  }
})

canIUse.addEventListener('click', e => {
  e.preventDefault();
  // before sending the POST request check if the string is valid
  if(idInput.value.trim() === "") alert('ID를 입력하십시오.');
  else if(idInput.value.trimEnd().match(idFormat)) alert('ID는 영문또는 숫자만 가능합니다.');
  else{
    axios.post('/register/valid-test', {testId : idInput.value})
    .then((res) => {
      if(res.data){
        isIdValid = true;
        alert('사용 가능한 ID입니다.')
      }else{
        alert('이미 존재하는 ID입니다.')
      }
    })
    .catch(err => {
      alert(err);
    })
  }
})

idInput.addEventListener('change', () => {
  isIdValid = false;
})