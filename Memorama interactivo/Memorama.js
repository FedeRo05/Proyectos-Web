const cartas = document.querySelectorAll('.cartas');
let bloquearTablero = false;
let cartaVolteada = false;
let primeraCarta, segundaCarta;



function voltearCarta(){
  if(bloquearTablero) return;
  if(this === primeraCarta) return;
  this.classList.toggle('voltear');
  if(!cartaVolteada){
    //primer click
    cartaVolteada = true;
    primeraCarta = this;
    console.log({cartaVolteada, primeraCarta});
} else {
    //segundo click
    cartaVolteada = false;
    segundaCarta = this;
    //que coincidan
    if(primeraCarta.dataset.nombre === segundaCarta.dataset.nombre){
    primeraCarta.removeEventListener('click', voltearCarta);
    segundaCarta.removeEventListener('click', voltearCarta);
    } else {
      bloquearTablero = true;
      setTimeout(() => {
      primeraCarta.classList.remove('voltear');
      segundaCarta.classList.remove('voltear');
       bloquearTablero = false;
      }, 1000);
      
}}
}
(function mezclarCartas(){
  cartas.forEach(carta => {
  let posicionAleatoria = Math.floor(Math.random() * 8);
  carta.style.order = posicionAleatoria;
  });
}()
)
function reiniciarTablero(){
  cartas.forEach(carta => carta.classList.remove('voltear'));
  [bloquearTablero, cartaVolteada] = [false, false];
  [primeraCarta, segundaCarta] = [null, null];
}
  
document.querySelectorAll('[data-boton="reiniciar"]').forEach(resetBtn => {
  resetBtn.addEventListener('click', reiniciarTablero);
});
cartas.forEach(carta => carta.addEventListener('click', voltearCarta));
