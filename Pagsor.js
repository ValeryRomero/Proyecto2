

let abierta = false;

function abrirCaja() {
    if (abierta) return;
    
    abierta = true;
    const tapa = document.getElementById("tapa");
    const regalo = document.getElementById("regalo");
    const fondo = document.getElementById("fondo");
    const sonido = document.getElementById("sonido");

    tapa.classList.add("abierta");
    sonido.play();

    setTimeout(() => {
        fondo.style.display = "block";
        regalo.style.display = "block";
        lanzarConfeti();  // se activa cuando abre
    }, 500);
}

function cerrarCaja(e) {
    e.stopPropagation();  /* evita que el click suba a la caja */
    abierta = false;
    const tapa = document.getElementById("tapa");
    const regalo = document.getElementById("regalo");
    const fondo = document.getElementById("fondo");

    regalo.style.display = "none";
    fondo.style.display = "none";
    tapa.classList.remove("abierta");
}


function lanzarConfeti() {
    const canvas = document.getElementById("confeti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colores = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff6bff"];
    const particulas = [];

    for (let i = 0; i < 150; i++) {
        particulas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 5 + 3,
            color: colores[Math.floor(Math.random() * colores.length)],
            velocidad: Math.random() * 3 + 2,
            angulo: Math.random() * 360,
            rotacion: Math.random() * 4 - 2,
            vida: 255
        });
    }

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activas = false;

        particulas.forEach(p => {
            p.y += p.velocidad;
            p.angulo += p.rotacion;
            p.vida -= 1;

            if (p.y < canvas.height && p.vida > 0) activas = true;

            ctx.save();
            ctx.globalAlpha = p.vida / 255;
            ctx.translate(p.x, p.y);
            ctx.rotate((p.angulo * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });

        if (activas) requestAnimationFrame(animar);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    animar();
}

