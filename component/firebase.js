// let btn1 = document.querySelector('.btn1');
// let listdata = document.querySelector('.listData');
// let input = document.querySelector('.input');
// let input2 = '';
let todoRef = database.ref('data1');
let month=document.querySelector('#month');
let btn1 = document.querySelector('input.submit');
let btnCancel = document.querySelector('input.cancel');
let sectionB = document.querySelector('.sectionB');
let sectionC = document.querySelector('.sectionC');
let addData = document.querySelector('.addData');
let pembayaran = document.querySelector('#pembayaran');
let tanggal = document.querySelector('#tanggal');
let harga = document.querySelector('#harga');
let deskripsi = document.querySelector('#deskripsi');
let wrapB1New='';
let wrapAP = document.querySelectorAll('.wrapA p');
let newDate=new Date();
let year=newDate.getFullYear();
let month2=String(newDate.getMonth()+1).padStart(2,'0');
let today=String(newDate.getDate()).padStart(2,'0');
month.value=year+'-'+month2;
tanggal.value=year+'-'+month2+'-'+today;
let month3=month.value+'-20';
let month3a=year+'-'+String(month.value.slice(5 , 7)-1).padStart(2,'0')+'-21';
// month.value=year+'-'+month2+'-'+today;
// console.log(tanggal.value);
let id;
month.addEventListener('input',function(){
	month3=month.value+'-20';
	month3a= year+'-'+String(parseInt(month.value.slice(5 , 7))-1).padStart(2,'0')+'-21';
	// console.log(new Date(month.value).getMonth());
	id='';
	bacaFirebase();
})

// create to firebase
let createTodo = () => {
	let todo = {
		pembayaran: pembayaran.value,
		tanggal: tanggal.value,
		harga: harga.value,
		deskripsi: deskripsi.value,
	};
	
	todoRef.push(todo);
	// database.ref('data1/001').push(todo);
	sectionC.classList.remove('show');
	// alert('username '+todo.pembayaran+' berhasil ditambahkan');
};
// btn1.addEventListener('click',()=>{
// 	if(lamaAngsuran>1){
// 		createAngsuran()
// 	}else if(lamaAngsuran==0){
// 		createTodo();
// 		console.log('cretodo')
// 	};
// });
// btn1.addEventListener('click',createTodo)

// /create to firebase

// read firebase
let bacaFirebase = function(){
	console.log('before on value');
todoRef.on('value',(e)=>{
	// console.log(e.val());
	console.log('inside on value');
	// listdata.innerHTML = '';
	let readAllData = e.val();
	console.log(readAllData);
	sectionB.innerHTML = '';
	let listDataonString = [];
	let listDataonString2 = [];
	let listDataonString3 = [];
	let totalBelanja = 0;
	let idForTotal= [];

	for(let id in readAllData){
		listDataonString3.push(id);
		listDataonString3.push(readAllData[id]);
		wrapB1New = document.createElement('div');
		wrapB1New.setAttribute('class','wrapB1');
		wrapB1New.setAttribute('id',id);
		let pB1A = document.createElement('p');
		pB1A.innerHTML = readAllData[id].pembayaran;
		let pB1B = document.createElement('p');
		pB1B.innerHTML = readAllData[id].tanggal;
		let pB1C = document.createElement('p');
		pB1C.innerHTML = 'Rp. '+ new Intl.NumberFormat().format(readAllData[id].harga);
		let pB1D = document.createElement('p');
		pB1D.innerHTML = readAllData[id].deskripsi;
		wrapB1New.append(pB1A);wrapB1New.append(pB1B);wrapB1New.append(pB1C);wrapB1New.append(pB1D);

		listDataonString.push(readAllData[id].tanggal);
		listDataonString2.push(id);
		listDataonString2.push(readAllData[id].tanggal);
		sectionB.append(wrapB1New);
		if(readAllData[id].tanggal >= month3a && readAllData[id].tanggal<=month3){
			totalBelanja += parseInt(readAllData[id].harga);
			idForTotal.push(id);
		};
		// console.log(readAllData[id].pembayaran);
	};
	clearInterval(interval);
	loadingPage.style.transform='translateX(100%)';

	wrapAP[1].innerText = 'Total: Rp. '+new Intl.NumberFormat().format(totalBelanja);

	wrapB1New = document.querySelectorAll('.wrapB1');
	let allP = document.querySelectorAll('.wrapB1 p');
	console.log(idForTotal);
	listDataonString.sort();
	// console.log(listDataonString);
	// console.log(listDataonString2);
	let indexWrapB1 = [];

	sectionB.innerHTML = '';

	listDataonString.forEach(function(e){
	// 	allP.forEach(function(el){
	// 		if(el.innerText == e ){
	// 			indexWrapB1 = el.parentElement.id;
	// 			console.log(indexWrapB1)
	// 		};
	// 	});

		listDataonString2.forEach(function(el,i){
			if(e == el && e >= month3a && e <= month3){
				indexWrapB1.push(listDataonString2[i-1]);
				listDataonString2[i] = 0;				
				// console.log(indexWrapB1);
			};
		});
	});
	
	indexWrapB1.forEach(function(ele){
		wrapB1New.forEach(function(elex){
			if(elex.id == ele){
					sectionB.append(elex);
			};
		});
	});
	
	let jumlahPCimb = 0;
	let jumlahPspaylatter = 0;
	let jumlahPmega = 0;
	let jumlahPgopaylatter = 0;
	let jumlahPOvo = 0;

	// console.log(wrapB1New[0].querySelectorAll('p')[0]);
	function wrapTotal(pembayaran,jumlah){
		let divPembayaran=document.querySelector('.'+pembayaran);	
		divPembayaran.innerHTML='';
		let newP = document.createElement('p');
		let newP2 = document.createElement('p');
		newP.innerText = 'Total '+ pembayaran;
		newP2.innerText = 'Rp. '+ new Intl.NumberFormat().format(jumlah);
		divPembayaran.append(newP);
		divPembayaran.append(newP2);
	}
	idForTotal.forEach((e)=>{
		let pembayaran2= document.getElementById(e).querySelectorAll('p')[0].innerText;
		// console.log(pembayaran2);
		if(pembayaran2=='cimb'){
			jumlahPCimb += parseInt(readAllData[e].harga);
		}
		if(pembayaran2=='mega'){
			jumlahPmega += parseInt(readAllData[e].harga);
		}
		if(pembayaran2=='gopayLatter'){
			jumlahPgopaylatter += parseInt(readAllData[e].harga);
		}
		if(pembayaran2=='sPaylatter'){
			jumlahPspaylatter += parseInt(readAllData[e].harga);
		}
		if(pembayaran2=='ovo'){
			jumlahPOvo += parseInt(readAllData[e].harga);
		}
	});
	wrapTotal('cimb',jumlahPCimb);
	wrapTotal('mega',jumlahPmega);
	wrapTotal('gopaylatter',jumlahPgopaylatter);
	wrapTotal('sPaylatter',jumlahPspaylatter);
	wrapTotal('ovo',jumlahPOvo);
	
	// listDataonString.forEach(function(e){
	// 	let h1Baru = document.createElement('h1');
	// 	console.log(e.title);
	// 	h1Baru.innerHTML = e.title;
	// 	h1Baru.setAttribute('id',id)
	// 	listdata.append(h1Baru);
	// });

// delete firebase
	let wrapB1=document.querySelectorAll('.wrapB1');
	let wrapB2=document.querySelector('.wrapB2');
	let wrapB2Button=document.querySelectorAll('.wrapB2 button');
	wrapB1.forEach(function(e){
		e.addEventListener('click',function(){
			console.log(e);
			console.log('inside wrapB1');
			wrapB2.classList.toggle('show');
			id=e.id;
			console.log(readAllData[id].tipe);
		});
	});
	
	wrapB2Button[0].addEventListener('click',function(){
		wrapB2.classList.remove('show');
	});
	
	console.log(id);
	wrapB2Button[2].addEventListener('click',function(){
		console.log('click tombol delete');
		console.log(id);
		if(id==''){
			return console.log('error')
		}else{
			let randomKey=Math.floor((Math.random() * 100000));
			let promtDelete = prompt('pass '+randomKey);
			if(promtDelete==randomKey){
				let idTipe=readAllData[id].tipe;
				if(idTipe==undefined){
					console.log('aaa');
					todoRef.child(id).remove();
					wrapB2.classList.remove('show');
					console.log('bbb');
				}else{
					for(let id in readAllData){
						console.log('ccc');
						if(readAllData[id].tipe==idTipe){
							console.log('ddd');
							console.log(readAllData[id].tipe);
							todoRef.child(id).remove();
							wrapB2.classList.remove('show');
							console.log('eee');
						};
						console.log('fff');
					};
					console.log('ggg');
				};
			}else{
				alert('wrong pass');
				wrapB2.classList.remove('show');
				console.log('hhh');
			};
		};
		console.log('111');
		id='';
		console.log('222');
	});

	
// edit firebase
let sectionE = document.querySelector('.sectionE');
let pembayaranEdit= document.querySelector('#pembayaranEdit');
let tanggalEdit= document.querySelector('#tanggalEdit');
let hargaEdit= document.querySelector('#hargaEdit');
let deskripsiEdit= document.querySelector('#deskripsiEdit');
// tombol save & cancel
let wrapE2= document.querySelectorAll('.wrapE2 input');
console.log('a');

wrapB2Button[1].addEventListener('click',function(){
	console.log('b');
	sectionE.classList.add('show');
	pembayaranEdit.value=readAllData[id].pembayaran;
	tanggalEdit.value=readAllData[id].tanggal;
	hargaEdit.value=readAllData[id].harga;
	deskripsiEdit.value=readAllData[id].deskripsi;
});
wrapE2[1].onclick = () => {
	console.log('c');
	todoRef.child(id).update({
		pembayaran: pembayaranEdit.value,
		tanggal: tanggalEdit.value,
		harga: hargaEdit.value,
		deskripsi: deskripsiEdit.value,
	});
	console.log('d');
};
wrapE2[0].onclick = ()=> { 
	console.log('e');
	sectionE.classList.remove('show');
};
console.log('f');
// / edit firebase


});
// /read firebase
};
bacaFirebase();

// delete firebase
// function deleteFs(){
// 	todoRef.on('value',(e)=>{
// 		let readAllData = e.val();
		
// let wrapB2=document.querySelector('.wrapB2');
// let wrapB2Button=document.querySelectorAll('.wrapB2 button');
// let id3='';
// let id4='';
// wrapB1New.forEach(function(e){
// 	e.addEventListener('click',function(){
// 		wrapB2.classList.toggle('show');
// 		id2=e.id;
// 		// id3=e.querySelectorAll('p')[0].innerText;
// 		id4=readAllData[e.id].tipe;
// 		console.log(id2);
// 		console.log(id3);
// 		console.log(id4);
// 		console.log(readAllData[id2].deskripsi);
// 	});
// });
// wrapB2Button[2].addEventListener('click',function(){
// 	console.log(id2);
// 	let randomKeyDelete=Math.floor((Math.random() * 100000));
// 	if(id2!=''){
// 		promtDelete= prompt('pass '+randomKeyDelete+' --data: '+readAllData[id2].tanggal+' / '+readAllData[id2].harga+' / '+readAllData[id2].deskripsi);
// 	};
	
// 	if(randomKeyDelete == promtDelete){
// 		if(id4==undefined){
// 			id3=readAllData[id2].tanggal+' / '+readAllData[id2].harga+' / '+readAllData[id2].deskripsi;
// 			todoRef.child(id2).remove();
// 			id2='';
// 			wrapB2.classList.remove('show');
// 			location.reload();
// 			alert('deleted '+id3);
// 		}else if(id4!=undefined){
// 			id3=readAllData[id2].tanggal+' / '+readAllData[id2].harga+' / '+readAllData[id2].deskripsi;
// 			for(let id in readAllData){
// 				if(readAllData[id].tipe==id4){
// 					todoRef.child(id).remove();
// 					id2='';
// 				}
// 			};
// 			wrapB2.classList.remove('show');
// 			alert('deleted '+id3);
// 			location.reload()
// 		};
// 	}else if(randomKeyDelete != promtDelete){
// 		if(id2!=''){
// 		wrapB2.classList.remove('show');
// 		alert('wrong password');
// 		};
// 		console.log(id2);
// 		console.log(id3);
// 		console.log(id4);
// 		console.log(readAllData[id2].deskripsi);
// 		id2='';
// 	};
// });

// wrapB2Button[0].addEventListener('click',function(){
// 	wrapB2.classList.remove('show');
// });
// });
// }

// // /delete firebase

// // edit data
// 	// let wrapB2=document.querySelector('.wrapB2');
// 	// let wrapB2Button=document.querySelectorAll('.wrapB2 button');
// 	let hargaEdit=document.querySelector('#hargaEdit');
// 	let pembayaranEdit=document.querySelector('#pembayaranEdit');
// 	let tanggalEdit=document.querySelector('#tanggalEdit');
// 	let deskripsiEdit=document.querySelector('#deskripsiEdit');

// 	let sectionCEdit=document.querySelector('.sectionC.edit');
// 	let submitEdit=document.querySelector('.wrapC2.edit input.edit');
// 	let cancelEdit=document.querySelector('.wrapC2.edit .cancel');
	
// 	wrapB2Button[1].addEventListener('click',function(){
// 		if(id4==undefined){
// 			sectionCEdit.classList.add('show');
// 			wrapB2.classList.remove('show');
// 			hargaEdit.value = readAllData[id2].harga;
// 			pembayaranEdit.value = readAllData[id2].pembayaran;
// 			tanggalEdit.value=readAllData[id2].tanggal;
// 			deskripsiEdit.value=readAllData[id2].deskripsi;
// 		}else if(id4!=undefined){
// 			sectionC.classList.toggle('show');
// 			wrapB2.classList.remove('show');
// 			pembayaran.value = readAllData[id2].pembayaran;
// 			tanggal.value = readAllData[id2].tanggal;
// 			harga.value = readAllData[id2].harga;
// 			lamaAngsuran.value = readAllData[id2].tenor;
// 			// deskripsi.value = readAllData[id2].deskripsi;

// 			let month=new Date(tanggal.value).getMonth();
// 			let date=new Date(tanggal.value).getDate();
// 			let year=new Date(tanggal.value).getFullYear();

// 			for(let id in readAllData){
// 				if(readAllData[id].tipe==id4){
// 					todoRef.child(id).update({
// 						pembayaran: pembayaran.value,
// 						tanggal: tanggal.value,
// 						harga: harga.value,
// 						deskripsi: deskripsi.value,
// 						tenor: lamaAngsuran.value
// 					});
// 				};
// 			}
// 			// alert('angsuran tdk bisa di edit, silahkan delete dan buat ulang');
// 		}
// 	});
	
// 	cancelEdit.addEventListener('click',function(e){
// 		sectionCEdit.classList.remove('show');
// 		e.preventDefault();
// 	});
// 	submitEdit.addEventListener('click', function(){
// 		todoRef.child(id2).update({
// 			pembayaran: pembayaranEdit.value,
// 			tanggal: tanggalEdit.value,
// 			harga: hargaEdit.value,
// 			deskripsi: deskripsiEdit.value,
// 		});
// 		alert(deskripsiEdit.value+' berhasil di update');
// 	})
	// / edit data

// addData on off
addData.addEventListener('click',function(){
	sectionC.classList.toggle('show');
});
btnCancel.addEventListener('click',(e)=>{
	sectionC.classList.remove('show');
	e.preventDefault()
});
// / addData on off

// angsuran
// let sectionF=document.querySelector('.sectionF');
// let wrapF1=document.querySelector('.wrapF1');
let lamaAngsuran=document.querySelector('#lamaAngsuran');

// tanggal.addEventListener('input',()=>{
// 	console.log(String(new Date(tanggal.value).getMonth()))
// });
let createAngsuran = () =>{
	let month=new Date(tanggal.value).getMonth();
	let date=new Date(tanggal.value).getDate();
	let year=new Date(tanggal.value).getFullYear();
	let random=Math.floor((Math.random() * 10000000));

	for(let i=1; i <= lamaAngsuran.value; i++){
		let todo2 = {
			tipe: 'angsuran'+random,
			pembayaran: pembayaran.value,
			tanggal: year+'-'+(String(month+=1)).padStart(2,'0')+'-'+String(date).padStart(2,'0'),
			harga: harga.value,
			deskripsi: deskripsi.value +' (angsuran ke '+ i +' / '+lamaAngsuran.value+')',
			tenor: lamaAngsuran.value
		};
		console.log(todo2);
		if(month==12){
			month=0;
			year+=1;	
		}
			todoRef.push(todo2);
	};
	sectionC.classList.remove('show');
	console.log('ok2')
};
btn1.addEventListener('click',()=>{
	if(lamaAngsuran.value==0){
		createTodo();
	}else if(lamaAngsuran.value>1){
		createAngsuran()
	};
})

// / angsuran

// loadingPAge
let loadingPage=document.querySelector('.loadingPage');
let p=document.querySelector('.loadingPage p');
let wrapLP1=document.querySelector('.wrapLP1');
let percent=0;
let percent2=0;
let timeInterval=50;

let int1= function(){
	p.innerHTML= (percent+=1) +'%';
	wrapLP1.style.width= (percent2+=.5) +'vw';
	if(percent==100){
		clearInterval(interval);
	}
} ;
let interval=setInterval( int1 , timeInterval);

loadingPage.addEventListener('transitionend',()=>{
	loadingPage.style.display='none';
});
// / loadingPAge

