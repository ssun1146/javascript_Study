/** Question (?) 그냥.. 작업하면서 의문인 부분들
 * 1. vue.js에서 쓰는 ref 같은 역할을 하는 아이는 없는지..? querySelector쓸때 id 부여해줘야 하는지..!
 * 2. 
 */

// 모달입력값 
const $wordBtnCancel = document.querySelector('#wordBtnCancel')
const $wordBtnDone = document.querySelector('#wordBtnDone')
const $firstWord = document.querySelector('#firstWord') // input 첫제시어 입력값
const $countMem = document.querySelector('#countMem')		// input 에 입력한 참여자 수

// 게임 화면영역
const $wordTxt = document.querySelector('#wordTxt');
const $memNumber = document.querySelector('#memNumber');
const $wordCount = document.querySelector('#wordCount');

let firstWord; 

/** 
 * 게임 셋팅하기
 */

// 확인 클릭 시, 게임 설정하기 +_+
const onClickDone = () => {
	// 참여자 수가 있을 때, 그 숫자를 헤더의 참여자수 값에 입력하기
	if ( !$countMem.value ){
		alert('머여!')	// 참여자 수가 비어있으면, 게임 시작 안됨 
	} else if ($countMem.value < 2 || $countMem.value > 4) {	// 내맘대로 참여자 수는 2~4 사이의 숫자
		alert('2~4 사이의 숫자를 다시 입력해주세요.')
	} else {
		// 제시어가 빈칸일때 하이 가 제시어로, 아니면 제시어에 입력된 값이 첫 제시어로 들어간 후, 모달 종료
		if ( !$firstWord.value ) {
			firstWord = '하이';
			$wordTxt.textContent = firstWord; 
		} else {
			$wordTxt.textContent = $firstWord.value; 
		}
		$wordCount.textContent = parseInt($countMem.value, 10);
		document.querySelector('.g_modal').style.display = 'none';
	}	
}

// 취소 클릭 시, 화면 빈화면으로 +_+
const onClickCancel = () => {
	document.querySelector('.wordRelay__container').style.display = 'none';
	document.querySelector('.g_modal').style.display = 'none';
}

$wordBtnDone.addEventListener('click', onClickDone);
$wordBtnCancel.addEventListener('click', onClickCancel);

/** 
 * 게임 진행하기!
 */
const $nxtWord = document.querySelector('#nxtWord');
const $wordRelayBtnEnter = document.querySelector('#wordRelayBtnEnter')
const $suggestWord = document.querySelector('.suggestWord');

const $wordContainer = document.querySelector('.wordRelay__container');

// 값을 입력함 > 제시어가 맞는지 확인 > 맞으면 화면 띄우기 > 다음 참가자 번호를 저장함. 
// 값을 입력함 > 제시어가 틀리면 > 경고메시지 띄우기 > 다시 입력.

let suggestWord = $wordTxt.textContent;
let nxtWord;
let order;
const onInputTxt = ( txt ) => {   //todos: 여기만 고치면 되겠당!! (콘솔에서는 set함수 추가하랭)
	const leng = suggestWord.length;

	if ( suggestWord[leng - 1] == txt[0] ) {
		createList('Word');
		order = $countMem.value + 1;
		$memNumber.textContent = order; 
	} else {
		createList('Alert');
		order = $countMem.value;
		$memNumber.textContent = order;
	}
};

const createList = (type) => {
	// $wordContainer.innerHTML = null;

	var wordList = document.createElement('li');
	wordList.classList.add('wordRelay__list');

	var wordListP = document.createElement('p');
	var wordListMem = document.createElement('span');
	wordListMem.id = 'memNumber';
	var wordListSuggest = document.createElement('span');
	wordListSuggest.classList.add('suggestWord');
	var wordListAlert = document.createElement('span');
	wordListAlert.classList.add('wordRelay__alert');

	$wordContainer.appendChild(wordList)
	wordList.appendChild(wordListP)
	if ( type == 'Word' ){
		wordListP.appendChild(wordListMem)
		wordListP.textContent = '번 참가자 :'
		wordListP.appendChild(wordListSuggest)
	} else if ( type == 'Alert' ){
		wordListP.appendChild(wordListAlert)
		wordListAlert.textContent = '제시어 제대로 입력하셈';
		wordListAlert.style.display = 'block';
	}
}

// $nxtWord.addEventListener('input', onInputTxt);
$nxtWord.addEventListener('keypress', function(e){
	if (e.key == 'Enter' && $nxtWord.value == '' ){
		alert('내용입력')
		return;
	} else if (e.key == 'Enter' && $nxtWord.value != '' ) {
		nxtWord = $nxtWord.value;
		onInputTxt(nxtWord);
	}
})

$wordRelayBtnEnter.addEventListener('click', function(){
	if ($nxtWord.value == ''){
		alert('내용입력')
		return;
	} else {
		onInputTxt();
	}
})


/**
 * 게임 종료하기
 */

const $wordBtnCls = document.querySelector('#wordBtnCls')
const $wordRelaySystem = document.querySelector('.wordRelay__system')

const onClickCls = () => {
	$wordRelaySystem.style.display = 'block';
	$nxtWord.setAttribute('readonly', true);
	$wordRelayBtnEnter.setAttribute('disabled', true);
}

$wordBtnCls.addEventListener('click', onClickCls);