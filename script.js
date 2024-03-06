let towers = [[5,4,3,2,1],[],[]]
let size = 5; // Tamanho padrão inicial



let positions = ['p1','p2','p3','p4','p5','p0',
                   't1','t2','t3',]
let movements = []

//--------AQUI----

//function setSize() {
   // size = parseInt(document.getElementById('size').value);
    // Limpa as torres e os discos existentes
   // towers = [[], [], []];
   // document.getElementById('disks-container').innerHTML = '';
    // Cria os discos com classes dinâmicas baseadas no tamanho escolhido
   // for (let i = 0; i < size; i++) {
    //    const disk = document.createElement('div');
    //    disk.classList.add('disk');
    //    disk.classList.add('d' + (i + 1));
    //    document.getElementById('disks-container').appendChild(disk);
     //   towers[0].push(i + 1);
  //  }
//}


 function render(){
    towers.forEach((tower,towerid) =>{
        tower.forEach((disk,position) => {
            let d = document.querySelector('.d'+disk)
           positions.forEach(position =>{
            d.classList.remove(position)
           })
         
            d.classList.add('t'+(towerid+1))
            d.classList.add('p'+(position+1))
        })
    })
 }      
 
 function move(fromtower, totower){
    if(!towers[fromtower].length) return
    let disk = towers[fromtower].pop()
    if(towers[totower].length){
        if(towers[totower][towers[totower].length-1]<disk){
            return towers[fromtower].push(disk)
        }
    }
    let d =document.querySelector('.d'+disk)
    d.classList.add('p0')
    towers[totower].push(disk)
    setTimeout(render,400)
 }

 function clicktower(n){
  if(movements.length  && movements[0].length==1){
    movements[0].push(n)
  }else{
    movements.unshift([n])
  }
 }

 setInterval(() =>{
    if(movements.length && movements[movements.length-1].length ==2){
        let m = movements.pop()
        move(m[0], m[1])
        
    }
 },600)
 render()

 function restart(){
    location.reload()
 }


 function solve(size, fromtower, totower){
    if(size==1){
        return movements.unshift([fromtower,totower])
    }
    let other = 3-fromtower-totower
    solve(size-1,fromtower,other)
    movements.unshift([fromtower,totower])
    solve(size-1,other,totower)
 }

 function solution() {
    let size = parseInt(document.getElementById('size').value);
    console.log(size)
   
    solve(size, 0, 1); // Resolve o problema com o tamanho escolhido
}
