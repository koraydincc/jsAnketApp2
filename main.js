const newData = [];
let readData = document.getElementById('readData');
let counter = 0;
let ad = document.getElementById('name');
let soyad = document.getElementById('surname');
let tc = document.getElementById('tc');
let save = document.getElementById('save');
let result = document.getElementById('result');
let partiler = document.getElementById('secilenParti');
let tarih = document.getElementById('tarih')




zaman()

document.getElementById('save').addEventListener('click', function() {
    if (ad.value === '' || soyad.value === '' || tc.value === '') {
        alert('Lütfen bütün alanları doldurunuz!');
        return false;
    }

    if (newData.indexOf(tc.value) > -1) {
        alert('Sadece bir kez oy kullanabilirsiniz!');
        ad.value = '';
        soyad.value = '';
        tc.value = '';
        return false;
    }

    if (tc.value.length > 11) {
        alert('Geçersiz TC kimlik numarası');
        ad.value = '';
        soyad.value = '';
        tc.value = '';
        return false;
    }
    savePush();
    readList();
    console.log(newData);
  
});

document.getElementById('result').addEventListener('click', function(){
     anketSonuclari();
     
})

function readList() {
    let secilenParti = partiler.value;
    let temp = '';
    for (let i = 0; i < newData.length; i++) {
        temp += `<li>${i + 1}. Kayıt: Sayın ${newData[i].tc} kimlik numaralı ${newData[i].ad.toUpperCase()} ${newData[i].soyad.toUpperCase()}. Oyunuzu ${newData[i].secilenParti}'den yana kullandınız. <button type = "button"
        id = "removeBtn"
        onclick = "removeBtn()"
        class="btn btn-outline-success"
        >Sil</button></li>  
        <lo>Oyunuzu kullandığınız tarih : ${tarih.innerHTML} </lo>
      `;

         
    }
    readData.innerHTML = temp;
}

function savePush() {
    const veri = {
        ad: ad.value,
        soyad: soyad.value,
        tc: tc.value,
        secilenParti: partiler.value
    };
    newData.push(veri);
    ad.value = '';
    soyad.value = '';
    tc.value = '';
    counter = newData.length + 1; 
}

function removeBtn(index) {
    counter--;
    newData.splice(index,1)
    readList()

    
}

function zaman() {

    let suan = new Date()
    let gun = suan.getDate()
    let ay = suan.getMonth() + 1;
    let yil = suan.getFullYear()
    let formatTarih = `${gun}/${ay}/${yil}`

    tarih.innerHTML = formatTarih;

 }

function anketSonuclari() {

    let anket = {
        CHP: 0,
        AKP: 0,
        MHP: 0,
        HDP: 0,
        IYI_PARTİ: 0,
        DEVA: 0,
        GELECEK: 0,
        SAADET: 0,
        TIP: 0
    }
    
 const ctx = document.getElementById('myChart');

 for (let i = 0; i < newData.length; i++) 
 {
      anket[newData[i].secilenParti] = anket[newData[i].secilenParti] + 1   
    
 }

 if (newData.length == 0) {
    alert('Lütfen önce oy kullanın!')
    return false
    
 }
 
 if (typeof anketChart == 'object') {
    anketChart.destroy(); 
    
 }

 anketChart =  new Chart(ctx, {
    
   type: 'doughnut',
   data: {
     labels: ['CHP', 'AKP', 'MHP', 'HDP', 'İYİ PARTİ', 'DEVA PARTİSİ', 'GELECEK PARTİSİ', 'SAADET PARTİSİ', 'TIP'],
     datasets: [{
       label: 'Anket Sonuçları',
       data: [anket.CHP, anket.AKP, anket.MHP, anket.HDP, anket.IYI_PARTİ, anket.DEVA, anket.GELECEK, anket.SAADET, anket.TIP],
       borderWidth: 1
     }]
   },
   options: {
     scales: {
       y: {
         beginAtZero: true
       }
     }
   }
   

});
console.log(anketChart)
}


