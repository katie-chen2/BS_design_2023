
const elements = [...document.querySelector('.container').children];
elements.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i * 100);
})

//var device_datas = [3,2,1,1,1,1];

const updateBarChart = () =>{
    fetch('/showByType', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: sessionStorage.email,
            password: sessionStorage.password
        })
    })
        .then(res = res.json)
        .then(d => {
            if (d == 'You Are Not Logged In!')
                alertBox(d);
            
            data_with_id = data.map(item => {
                return {
                    'Device_id': house_id_type(item.h_type),
                    'Device Type': item.h_type,
                    'Device Name': item._count
                }
            })
            deviceData= d.map( item => item._count )
            
            //device_datas = data_with_id;
            //console.log('hello');
            console.log(deviceData);
            console.log([1,1,1,1,1,1]);
            //console.log(data);
        })
}


window.onload = () => {
    if (!sessionStorage.name) {
        location.href = '/';
    } else {
        updateBarChart();
    }
}
